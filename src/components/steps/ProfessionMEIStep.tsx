import { motion } from 'framer-motion';
import { Briefcase, Building2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Profession, PROFESSION_LABELS } from '@/types/form';
import { cn } from '@/lib/utils';

interface ProfessionMEIStepProps {
  profession: Profession;
  hasMEI: boolean;
  onSelectProfession: (profession: Profession) => void;
  onSetMEI: (hasMEI: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
}

const professions: Array<Profession> = [
  'employee',
  'entrepreneur',
  'autonomous',
  'liberal',
  'retired',
  'student',
  'other',
];

export const ProfessionMEIStep = ({
  profession,
  hasMEI,
  onSelectProfession,
  onSetMEI,
  onContinue,
  onBack,
}: ProfessionMEIStepProps) => {
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
          Sua Profissão e Situação
        </h2>
        <p className="text-muted-foreground">
          Isso nos ajuda a encontrar as melhores opções de plano para você
        </p>
      </div>

      {/* Profession Selection */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Qual sua profissão/ocupação? <span className="text-destructive">*</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {professions.map((prof) => (
            <button
              key={prof}
              type="button"
              onClick={() => onSelectProfession(prof)}
              className={cn(
                'p-4 rounded-lg border-2 transition-all duration-200 text-left',
                profession === prof
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-background hover:border-accent/50'
              )}
            >
              <div className="font-semibold text-sm mb-1">
                {PROFESSION_LABELS[prof].label}
              </div>
              {PROFESSION_LABELS[prof].hint && (
                <div className="text-xs text-muted-foreground">
                  {PROFESSION_LABELS[prof].hint}
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* MEI Question */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="form-card space-y-3"
      >
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-accent" />
          <Label className="font-semibold cursor-pointer">
            Você possui CNPJ ou é MEI?
          </Label>
        </div>
        
        <button
          type="button"
          onClick={() => onSetMEI(!hasMEI)}
          className={cn(
            'w-full p-4 rounded-lg border-2 transition-all duration-200 text-left',
            hasMEI
              ? 'border-accent bg-accent/10'
              : 'border-border bg-background hover:border-accent/50'
          )}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              checked={hasMEI}
              onCheckedChange={(checked) => onSetMEI(checked as boolean)}
              className="mt-1"
            />
            <div>
              <div className="font-semibold text-sm">Sim, sou MEI/Autônomo com CNPJ</div>
              <div className="text-xs text-muted-foreground mt-1">
                Você pode ter acesso a planos empresariais com custos otimizados
              </div>
            </div>
          </div>
        </button>
      </motion.div>

      {/* MEI Warning */}
      {hasMEI && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200"
        >
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <strong>Importante:</strong> Para planos empresariais/MEI, é necessário incluir ao menos <strong>2 vidas</strong> (você e um dependente ou sócio).
          </div>
        </motion.div>
      )}

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
          disabled={!profession}
          className="flex-1 touch-input bg-accent hover:bg-accent/90 disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
};
