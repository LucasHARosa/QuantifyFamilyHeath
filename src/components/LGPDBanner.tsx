import { Shield, Lock } from 'lucide-react';

export const LGPDBanner = () => {
  return (
    <div className="lgpd-banner flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm text-primary">Proteção de Dados (LGPD)</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Seus dados estão seguros conosco. Utilizamos criptografia de ponta e seguimos rigorosamente 
          a Lei Geral de Proteção de Dados. Suas informações serão usadas exclusivamente para 
          análise de perfil de saúde e contato sobre planos de autogestão.
        </p>
      </div>
    </div>
  );
};
