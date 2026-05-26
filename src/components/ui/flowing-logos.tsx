import { cn } from "../../lib/utils";

interface Logo {
  name: string;
  image: string;
}

interface FlowingLogosProps {
  data: Logo[];
  className?: string;
  reverse?: boolean;
}

export function FlowingLogos({ data, className, reverse = false }: FlowingLogosProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:4rem] gap-(--gap)",
        className
      )}
    >
      {[0, 1].map((index) => (
        <div
          key={index}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) min-w-full flex-row items-center",
            reverse ? "animate-[marquee-reverse_var(--duration,30s)_linear_infinite]" : "animate-[marquee_var(--duration,30s)_linear_infinite]"
          )}
        >
          {data.map((logo, i) => (
            <div key={i} className="flex items-center justify-center shrink-0">
              <img
                src={logo.image}
                alt={logo.name}
                className="h-10 w-auto object-contain opacity-40 transition-all duration-300 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
