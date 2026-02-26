import quantifyLogo from '@/assets/quantify-logo.png';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img 
            src={quantifyLogo} 
            alt="Quantify Logo" 
            className="h-10 w-auto"
          />
          <div>
            <h1 className="font-bold text-lg text-foreground leading-tight">Quantify</h1>
            <p className="text-xs text-muted-foreground">Consultoria em Saúde</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">Consultoria em Inteligência em Saúde</span>
      </div>
    </header>
  );
};
