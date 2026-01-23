import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FormWizard } from '@/components/FormWizard';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <HeroSection />
      <main className="flex-1">
        <FormWizard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
