import { motion } from 'framer-motion';
import { Minus, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FamilySizeStepProps {
  familySize: number;
  onSizeChange: (size: number) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const FamilySizeStep = ({ 
  familySize, 
  onSizeChange, 
  onContinue, 
  onBack 
}: FamilySizeStepProps) => {
  const minSize = 2;
  const maxSize = 10;

  const handleDecrement = () => {
    if (familySize > minSize) {
      onSizeChange(familySize - 1);
    }
  };

  const handleIncrement = () => {
    if (familySize < maxSize) {
      onSizeChange(familySize + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Quantas pessoas no total?
        </h2>
        <p className="text-muted-foreground">
          Incluindo você, quantos beneficiários terão no plano?
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {/* Counter */}
        <div className="flex items-center gap-6">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full"
            onClick={handleDecrement}
            disabled={familySize <= minSize}
          >
            <Minus className="h-6 w-6" />
          </Button>

          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold text-primary tabular-nums">
              {familySize}
            </div>
            <span className="text-sm text-muted-foreground mt-1">
              {familySize === 1 ? 'pessoa' : 'pessoas'}
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full"
            onClick={handleIncrement}
            disabled={familySize >= maxSize}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {/* Visual representation */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {Array.from({ length: familySize }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"
            >
              <Users className="w-5 h-5 text-accent" />
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center">
          1 titular + {familySize - 1} {familySize - 1 === 1 ? 'dependente' : 'dependentes'}
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 touch-input"
        >
          Voltar
        </Button>
        <Button
          type="button"
          onClick={onContinue}
          className="flex-1 touch-input bg-accent hover:bg-accent/90"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};
