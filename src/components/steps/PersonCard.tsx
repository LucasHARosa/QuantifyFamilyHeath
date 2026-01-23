import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, User, Crown } from 'lucide-react';
import InputMask from 'react-input-mask';
import { PersonData, RELATIONSHIP_LABELS, RelationshipType, BRAZILIAN_STATES } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface PersonCardProps {
  person: PersonData;
  index: number;
  onUpdate: (personId: string, updates: Partial<PersonData>) => void;
  isExpanded?: boolean;
}

export const PersonCard = ({ person, index, onUpdate, isExpanded = true }: PersonCardProps) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const isComplete = 
    person.fullName.trim().length >= 3 &&
    person.birthDate.length === 10 &&
    person.phone.replace(/\D/g, '').length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email) &&
    person.email === person.emailConfirmation &&
    person.state !== '' &&
    person.city.trim().length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "form-card overflow-visible",
        isComplete && "border-success/50"
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-0 mb-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            person.isHolder ? "bg-accent/10" : "bg-muted"
          )}>
            {person.isHolder ? (
              <Crown className="w-5 h-5 text-accent" />
            ) : (
              <User className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {person.isHolder ? 'Titular / Responsável' : `Dependente ${index}`}
            </h3>
            {person.fullName && (
              <p className="text-sm text-muted-foreground">{person.fullName}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="text-xs text-success font-medium">Completo</span>
          )}
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Form Fields */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-visible"
        style={{ overflow: expanded ? 'visible' : 'hidden' }}
      >
        <div className="space-y-4">
          {/* Relationship (only for non-holders) */}
          {!person.isHolder && (
            <div className="space-y-2">
              <Label htmlFor={`${person.id}-relationship`}>
                Grau de Parentesco <span className="text-destructive">*</span>
              </Label>
              <Select
                value={person.relationship}
                onValueChange={(value) => onUpdate(person.id, { relationship: value as RelationshipType })}
              >
                <SelectTrigger id={`${person.id}-relationship`} className="touch-input">
                  <SelectValue placeholder="Selecione o parentesco" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {Object.entries(RELATIONSHIP_LABELS)
                    .filter(([key]) => key !== 'titular')
                    .map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor={`${person.id}-name`}>
              Nome Completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id={`${person.id}-name`}
              type="text"
              value={person.fullName}
              onChange={(e) => onUpdate(person.id, { fullName: e.target.value })}
              placeholder="Digite o nome completo"
              className="touch-input"
            />
          </div>

          {/* Birth Date */}
          <div className="space-y-2">
            <Label htmlFor={`${person.id}-birthdate`}>
              Data de Nascimento <span className="text-destructive">*</span>
            </Label>
            <InputMask
              mask="99/99/9999"
              value={person.birthDate}
              onChange={(e) => onUpdate(person.id, { birthDate: e.target.value })}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <Input
                  {...inputProps}
                  id={`${person.id}-birthdate`}
                  type="text"
                  inputMode="numeric"
                  placeholder="DD/MM/AAAA"
                  className="touch-input"
                />
              )}
            </InputMask>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor={`${person.id}-phone`}>
              Celular <span className="text-destructive">*</span>
            </Label>
            <InputMask
              mask="(99) 99999-9999"
              value={person.phone}
              onChange={(e) => onUpdate(person.id, { phone: e.target.value })}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <Input
                  {...inputProps}
                  id={`${person.id}-phone`}
                  type="text"
                  inputMode="tel"
                  placeholder="(00) 00000-0000"
                  className="touch-input"
                />
              )}
            </InputMask>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor={`${person.id}-email`}>
              E-mail <span className="text-destructive">*</span>
            </Label>
            <Input
              id={`${person.id}-email`}
              type="email"
              inputMode="email"
              value={person.email}
              onChange={(e) => onUpdate(person.id, { email: e.target.value.toLowerCase() })}
              placeholder="seu@email.com"
              className="touch-input"
            />
          </div>

          {/* Email Confirmation */}
          <div className="space-y-2">
            <Label htmlFor={`${person.id}-email-confirm`}>
              Confirmar E-mail <span className="text-destructive">*</span>
            </Label>
            <Input
              id={`${person.id}-email-confirm`}
              type="email"
              inputMode="email"
              value={person.emailConfirmation}
              onChange={(e) => onUpdate(person.id, { emailConfirmation: e.target.value.toLowerCase() })}
              placeholder="Confirme seu e-mail"
              className={cn(
                "touch-input",
                person.emailConfirmation && person.email !== person.emailConfirmation && "border-destructive"
              )}
            />
            {person.emailConfirmation && person.email !== person.emailConfirmation && (
              <p className="text-xs text-destructive">Os e-mails não coincidem</p>
            )}
          </div>

          {/* State and City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${person.id}-state`}>
                Estado <span className="text-destructive">*</span>
              </Label>
              <Select
                value={person.state}
                onValueChange={(value) => onUpdate(person.id, { state: value })}
              >
                <SelectTrigger id={`${person.id}-state`} className="touch-input">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-card max-h-60">
                  {BRAZILIAN_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${person.id}-city`}>
                Município <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${person.id}-city`}
                type="text"
                value={person.city}
                onChange={(e) => onUpdate(person.id, { city: e.target.value })}
                placeholder="Digite a cidade"
                className="touch-input"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
