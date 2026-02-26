import { motion } from 'framer-motion';
import { User, Users, Building2 } from 'lucide-react';
import { PlanType } from '@/types/form';
import { cn } from '@/lib/utils';

interface PlanTypeStepProps {
  onSelect: (type: PlanType) => void;
}

export const PlanTypeStep = ({ onSelect }: PlanTypeStepProps) => {
  const options = [
    {
      type: 'individual' as PlanType,
      icon: User,
      title: 'Individual',
      description: 'O plano será apenas para você',
    },
    {
      type: 'family' as PlanType,
      icon: Users,
      title: 'Família',
      description: 'Inclui você e seus dependentes',
    },
    {
      type: 'mei' as PlanType,
      icon: Building2,
      title: 'MEI/Empresarial',
      description: 'Plano para sócios e empresa',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Qual tipo de plano você busca?
        </h2>
        <p className="text-muted-foreground">
          Selecione a opção que melhor se aplica ao seu caso
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
        {options.map((option, index) => (
          <motion.button
            key={option.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onSelect(option.type)}
            className={cn(
              "group relative flex flex-col items-center p-8 rounded-xl border-2 border-border",
              "bg-card hover:border-accent hover:shadow-card transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            )}
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <option.icon className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {option.title}
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              {option.description}
            </p>
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-accent/50 transition-colors pointer-events-none" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
