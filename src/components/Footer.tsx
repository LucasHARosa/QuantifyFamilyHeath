import { Shield, Mail, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-auto">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-2">Quantify Consultoria</h3>
            <p className="text-sm text-primary-foreground/70">
              Especialistas em operadoras de planos de saúde.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Contato</h3>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <a 
                href="mailto:contato@quantifyco.com.br" 
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                contato@quantifyco.com.br
              </a>
              <a 
                href="https://wa.me/551121105944" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors font-semibold text-primary-foreground"
              >
                <MessageCircle className="w-4 h-4" />
                (11) 2110-5944
                <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">WhatsApp</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Segurança
            </h3>
            <p className="text-sm text-primary-foreground/70">
              Seus dados estão protegidos conforme a LGPD e utilizamos criptografia de ponta.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Quantify Consultoria. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
