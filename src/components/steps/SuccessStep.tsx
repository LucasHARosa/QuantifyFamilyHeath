import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessStepProps {
  onReset: () => void;
}

export const SuccessStep = ({ onReset }: SuccessStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6 py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center"
      >
        <CheckCircle className="w-12 h-12 text-success" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Cadastro Realizado com Sucesso!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Recebemos suas informações e entraremos em contato em breve para apresentar 
          as melhores opções de planos de saúde para você e sua família.
        </p>
      </div>

      <div className="form-card max-w-md mx-auto mt-8">
        <h3 className="font-semibold text-foreground mb-2">Próximos Passos</h3>
        <ul className="text-sm text-muted-foreground space-y-2 text-left">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
            <span>Um especialista analisará seu perfil de saúde</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
            <span>Entraremos em contato em até 48 horas úteis</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
            <span>Apresentaremos as opções mais adequadas ao seu perfil</span>
          </li>
        </ul>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="mt-6"
      >
        Fazer Novo Cadastro
      </Button>
    </motion.div>
  );
};
