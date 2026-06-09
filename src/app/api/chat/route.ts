import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  let parsedBody: any = {};
  try {
    parsedBody = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const { prompt, systemInstruction, history } = parsedBody;

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Missing prompt" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    if (!API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    // Pass systemInstruction to the model configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction || undefined
    });

    let text = "";

    // If history is provided, use startChat
    if (history && Array.isArray(history)) {
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(prompt);
      text = result.response.text();
    } else {
      // Otherwise, just a single prompt
      const result = await model.generateContent(prompt);
      text = result.response.text();
    }

    return new Response(JSON.stringify({ text }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Gemini API Error, attempting OpenRouter fallback...", error);

    // FALLBACK TO OPENROUTER
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (OPENROUTER_API_KEY) {
      try {
        const messages: any[] = [];
        if (systemInstruction) {
          messages.push({ role: "system", content: systemInstruction });
        }
        if (history && Array.isArray(history)) {
          history.forEach((msg: any) => {
            messages.push({
              role: msg.role === "model" ? "assistant" : "user",
              content: msg.parts?.[0]?.text || ""
            });
          });
        }
        messages.push({ role: "user", content: prompt });

        const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openrouter/free", // Fallback model
            messages: messages,
          })
        });

        if (openRouterRes.ok) {
          const data = await openRouterRes.json();
          const fallbackText = data.choices[0]?.message?.content;
          if (fallbackText) {
            console.log("OpenRouter fallback successful!");
            return new Response(JSON.stringify({ text: fallbackText }), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
        } else {
          console.error("OpenRouter API Error:", await openRouterRes.text());
        }
      } catch (fallbackError) {
        console.error("OpenRouter Fallback Exception:", fallbackError);
      }
    }

    return new Response(JSON.stringify({ error: "Error communicating with AI Copilot (and fallback failed)" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
