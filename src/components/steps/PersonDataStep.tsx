import { motion } from 'framer-motion';
import { PersonData } from '@/types/form';
import { PersonCard } from './PersonCard';
import { Button } from '@/components/ui/button';

interface PersonDataStepProps {
  people: PersonData[];
  onUpdatePerson: (personId: string, updates: Partial<PersonData>) => void;
  onContinue: () => void;
  onBack: () => void;
  isValid: boolean;
}

export const PersonDataStep = ({
  people,
  onUpdatePerson,
  onContinue,
  onBack,
  isValid,
}: PersonDataStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Dados dos Beneficiários
        </h2>
        <p className="text-muted-foreground">
          Preencha as informações de {people.length === 1 ? 'cadastro' : 'cada pessoa'}
        </p>
      </div>

      <div className="space-y-4">
        {people.map((person, index) => (
          <PersonCard
            key={person.id}
            person={person}
            index={index}
            onUpdate={onUpdatePerson}
            isExpanded={index === 0}
          />
        ))}
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
          disabled={!isValid}
          className="flex-1 touch-input bg-accent hover:bg-accent/90 disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};
