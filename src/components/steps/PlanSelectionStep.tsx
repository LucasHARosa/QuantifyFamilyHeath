import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CheckCircle2, HelpCircle, Info } from 'lucide-react';
import { SelectedPlan, PLAN_OPTIONS, PRICE_TABLE } from '@/types/form';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PlanSelectionStepProps {
  selectedPlan: SelectedPlan;
  wantsOtherOptions: boolean;
  onSelectPlan: (plan: SelectedPlan) => void;
  onToggleOtherOptions: (value: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export const PlanSelectionStep = ({
  selectedPlan,
  wantsOtherOptions,
  onSelectPlan,
  onToggleOtherOptions,
  onSubmit,
  onBack,
  isSubmitting,
  isValid,
}: PlanSelectionStepProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary">Diagnóstico e Seleção</h2>
        <p className="text-muted-foreground">
          Confira os valores por faixa etária e escolha o plano mais adequado para você
        </p>
      </div>

      {/* Price Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Tabela de Preços por Faixa Etária</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Valores mensais em R$ - Enfermaria com ou sem coparticipação
        </p>
        
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold text-foreground min-w-[80px]">Faixa</TableHead>
                  <TableHead className="font-bold text-center bg-orange-500 text-white min-w-[120px]">
                    <div className="text-xs">Hapvida</div>
                    <div className="text-[10px] font-normal">Enfermaria C/ Copart</div>
                  </TableHead>
                  <TableHead className="font-bold text-center bg-sky-500 text-white min-w-[120px]">
                    <div className="text-xs">MedSênior</div>
                    <div className="text-[10px] font-normal">Essencial S/ Copart</div>
                  </TableHead>
                  <TableHead className="font-bold text-center bg-blue-700 text-white min-w-[120px]">
                    <div className="text-xs">MedSênior RJ1</div>
                    <div className="text-[10px] font-normal">Enfermaria S/ Copart</div>
                  </TableHead>
                  <TableHead className="font-bold text-center bg-red-600 text-white min-w-[120px]">
                    <div className="text-xs">Prevent Sênior</div>
                    <div className="text-[10px] font-normal">Enfermaria S/ Copart</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PRICE_TABLE.map((row) => (
                  <TableRow 
                    key={row.faixa}
                    className={cn(
                      row.highlighted && "bg-primary/10 font-semibold"
                    )}
                  >
                    <TableCell className={cn(
                      "font-medium",
                      row.highlighted && "text-primary font-bold"
                    )}>
                      {row.faixa}
                    </TableCell>
                    <TableCell className="text-center">{formatCurrency(row.hapvida)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(row.medsenior_essencial)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(row.medsenior_rj1)}</TableCell>
                    <TableCell className="text-center">{formatCurrency(row.prevent_senior)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Escolha seu plano</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {PLAN_OPTIONS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onSelectPlan(plan.id);
                if (wantsOtherOptions) onToggleOtherOptions(false);
              }}
              className={cn(
                "cursor-pointer rounded-xl border-2 p-4 transition-all",
                selectedPlan === plan.id && !wantsOtherOptions
                  ? `${plan.borderClass} ring-2 ring-offset-2 ring-offset-background`
                  : "border-border hover:border-muted-foreground/50"
              )}
            >
              <div className={cn(
                "rounded-lg p-3 mb-3",
                plan.bgClass
              )}>
                <div className="flex items-center justify-between">
                  <h4 className={cn("font-bold text-lg", plan.colorClass)}>
                    {plan.name}
                  </h4>
                  {selectedPlan === plan.id && !wantsOtherOptions && (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  )}
                </div>
                <p className={cn("text-sm font-medium opacity-90", plan.colorClass)}>
                  {plan.subtitle}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground">{plan.description}</p>
                <p className="text-xs text-muted-foreground italic">{plan.highlight}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Other Options Checkbox */}
      <div 
        className={cn(
          "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
          wantsOtherOptions 
            ? "border-primary bg-primary/5 ring-2 ring-offset-2 ring-primary ring-offset-background" 
            : "border-border hover:border-muted-foreground/50"
        )}
        onClick={() => {
          onToggleOtherOptions(!wantsOtherOptions);
          if (!wantsOtherOptions) onSelectPlan('other_options');
        }}
      >
        <Checkbox 
          id="other-options"
          checked={wantsOtherOptions}
          onCheckedChange={(checked) => {
            onToggleOtherOptions(checked as boolean);
            if (checked) onSelectPlan('other_options');
          }}
          className="mt-0.5"
        />
        <div className="flex-1">
          <label 
            htmlFor="other-options" 
            className="text-sm font-medium cursor-pointer flex items-center gap-2"
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            Não encontrei o que buscava
          </label>
          <p className="text-xs text-muted-foreground mt-1">
            Quero que a Quantify avalie outras opções para o meu perfil.
          </p>
        </div>
      </div>

      {/* Closing Text */}
      <div className="bg-muted/50 rounded-lg p-4 border">
        <p className="text-sm text-muted-foreground text-center">
          Nossa equipe realizará uma <span className="font-semibold text-foreground">análise individualizada</span> baseada 
          na sua pré-escolha, avaliando rede de atendimento e localização geográfica antes de finalizar a adesão.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          className="flex-1"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              />
              Finalizando...
            </>
          ) : (
            'Finalizar'
          )}
        </Button>
      </div>
    </motion.div>
  );
};
