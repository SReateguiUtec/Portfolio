import TopBanner from '../components/ui/top-banner';
import HeroAscii from '../components/ui/hero-ascii';
import GithubIntro from '../components/ui/github-intro';
import ProjectsSection from '../components/ui/projects-section';
import EducationSection from '../components/ui/education-section';
import LogoCloudMarquee from '../components/ui/logo-cloud';
import ContactSection from '../components/ui/contact-section';
import LazyMorphPanel from '../components/ui/lazy-morph-panel';
import Footer from '../components/ui/footer';
import { ScrollReveal } from '../components/ui/scroll-reveal';
import PageLoader from '../components/ui/page-loader';

export default function Home() {

    return (
        <>
            <PageLoader>
                <div className="bg-black min-h-screen">
                    <TopBanner />
                    <HeroAscii />
                    <ScrollReveal>
                        <GithubIntro />
                    </ScrollReveal>
                    <ScrollReveal>
                        <ProjectsSection />
                    </ScrollReveal>
                    <ScrollReveal>
                        <EducationSection />
                    </ScrollReveal>

                    <ScrollReveal id="Skills">
                        <LogoCloudMarquee />
                    </ScrollReveal>

                    <ScrollReveal>
                        <ContactSection />
                    </ScrollReveal>
                    <ScrollReveal>
                        <Footer />
                    </ScrollReveal>
                </div>
            </PageLoader>

            {/* Floating AI Input — outside PageLoader so its fixed positioning
                is relative to the viewport, not the animated motion.div wrapper */}
            <LazyMorphPanel />
        </>
    );
}
