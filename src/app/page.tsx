import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/features';
import { UseCasesSection } from '@/components/sections/use-cases';
import { FrameworksSection } from '@/components/sections/frameworks';
import { CTASection } from '@/components/sections/cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <FrameworksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
