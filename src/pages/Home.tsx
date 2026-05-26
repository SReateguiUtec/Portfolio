import HeroAscii from '../components/ui/hero-ascii';
import GithubIntro from '../components/ui/github-intro';
import ProjectsSection from '../components/ui/projects-section';
import EducationSection from '../components/ui/education-section';
import LogoCloudMarquee from '../components/ui/logo-cloud';
import ContactSection from '../components/ui/contact-section';
import MorphPanel from '../components/ui/ai-input';

export default function Home() {

    return (
        <div className="bg-black min-h-screen">
            <HeroAscii />
            <GithubIntro />
            <ProjectsSection />
            <EducationSection />

            <div id="Skills">
                <LogoCloudMarquee />
            </div>

            <ContactSection />

            {/* Floating AI Input */}
            <MorphPanel />
        </div>
    );
}
