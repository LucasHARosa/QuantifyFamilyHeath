import { motion } from 'framer-motion';
import { Shield, Users, Loader2, MessageCircle, Send, Phone } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ContactPreference } from '@/types/form';

interface ConsentStepProps {
  consentLGPD: boolean;
  consentPartnerAndContact: boolean;
  contactPreference: ContactPreference;
  onUpdateConsent: (field: 'consentLGPD' | 'consentPartnerAndContact', value: boolean) => void;
  onUpdateContactPreference: (preference: ContactPreference) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

const contactOptions = [
  { id: 'whatsapp' as const, label: 'WhatsApp', icon: MessageCircle },
  { id: 'telegram' as const, label: 'Telegram', icon: Send },
  { id: 'phone' as const, label: 'Ligação', icon: Phone },
];

export const ConsentStep = ({
  consentLGPD,
  consentPartnerAndContact,
  contactPreference,
  onUpdateConsent,
  onUpdateContactPreference,
  onSubmit,
  onBack,
  isSubmitting,
  isValid,
}: ConsentStepProps) => {
  const consentItems = [
    {
      id: 'consentLGPD' as const,
      checked: consentLGPD,
      icon: Shield,
      label: 'Autorização LGPD',
      description: 'Autorizo a Quantify a tratar meus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD), exclusivamente para fins de análise de perfil de saúde e contato.',
      required: true,
    },
    {
      id: 'consentPartnerAndContact' as const,
      checked: consentPartnerAndContact,
      icon: Users,
      label: 'Compartilhamento e Contato',
      description: 'Autorizo a Quantify a transmitir meus dados a uma empresa parceira para fins de adesão ao plano de saúde e desejo receber contato direto de um especialista da Quantify.',
      required: true,
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
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Termos e Consentimentos
        </h2>
        <p className="text-muted-foreground">
          Por favor, leia e aceite os termos para finalizar seu cadastro
        </p>
      </div>

      {/* Contact Preference Question */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="form-card"
      >
        <h3 className="font-semibold text-foreground mb-3">
          Qual a melhor forma de contato? <span className="text-destructive">*</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {contactOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onUpdateContactPreference(option.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200",
                contactPreference === option.id
                  ? "border-accent bg-accent/10 text-accent font-semibold"
                  : "border-border bg-background text-muted-foreground hover:border-accent/50"
              )}
            >
              <option.icon className="w-4 h-4" />
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        {consentItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            className={cn(
              "form-card cursor-pointer transition-all duration-200",
              item.checked && "border-success/50 bg-success/5"
            )}
            onClick={() => onUpdateConsent(item.id, !item.checked)}
          >
            <div className="flex items-start gap-4">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={(checked) => onUpdateConsent(item.id, checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="w-4 h-4 text-accent" />
                  <Label htmlFor={item.id} className="font-semibold cursor-pointer">
                    {item.label}
                    {item.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        <span className="text-destructive">*</span> Campos obrigatórios
      </p>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 touch-input"
        >
          Voltar
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className="flex-1 touch-input bg-accent hover:bg-accent/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar Cadastro'
          )}
        </Button>
      </div>
    </motion.div>
  );
};
