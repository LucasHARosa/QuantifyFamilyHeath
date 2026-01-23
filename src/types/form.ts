export type PlanType = 'individual' | 'family' | null;

export type ContactPreference = 'whatsapp' | 'telegram' | 'phone' | null;

export type SelectedPlan = 'medsenior_rj1' | 'medsenior_essencial' | 'hapvida' | 'prevent_senior' | 'other_options' | null;

export type RelationshipType = 
  | 'titular'
  | 'conjuge'
  | 'filho'
  | 'pai_mae'
  | 'neto'
  | 'enteado'
  | 'irmao'
  | 'primo'
  | 'sobrinho'
  | 'nora_genro'
  | 'cunhado'
  | 'outros';

export interface PersonData {
  id: string;
  isHolder: boolean;
  relationship: RelationshipType;
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  emailConfirmation: string;
  state: string;
  city: string;
}

export interface FormData {
  planType: PlanType;
  familySize: number;
  people: PersonData[];
  contactPreference: ContactPreference;
  consentLGPD: boolean;
  consentPartnerAndContact: boolean;
  selectedPlan: SelectedPlan;
}

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  titular: 'Titular/Responsável',
  conjuge: 'Cônjuge',
  filho: 'Filho(a)',
  pai_mae: 'Pai/Mãe',
  neto: 'Neto(a)',
  enteado: 'Enteado(a)',
  irmao: 'Irmão/Irmã',
  primo: 'Primo(a)',
  sobrinho: 'Sobrinho(a)',
  nora_genro: 'Nora/Genro',
  cunhado: 'Cunhado(a)',
  outros: 'Outros (até 4º grau)',
};

export const CONTACT_PREFERENCE_LABELS: Record<Exclude<ContactPreference, null>, { label: string; icon: string }> = {
  whatsapp: { label: 'WhatsApp', icon: 'MessageCircle' },
  telegram: { label: 'Telegram', icon: 'Send' },
  phone: { label: 'Ligação Telefônica', icon: 'Phone' },
};

export const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export interface PlanOption {
  id: SelectedPlan;
  name: string;
  subtitle: string;
  description: string;
  highlight: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
}

export const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'medsenior_rj1',
    name: 'MedSênior RJ1',
    subtitle: 'Rede Completa e Segura',
    description: 'Rede própria forte + hospitais de grande porte.',
    highlight: 'Foco em quem busca equilíbrio e segurança assistencial com custo intermediário.',
    colorClass: 'text-white',
    borderClass: 'border-blue-700',
    bgClass: 'bg-blue-700',
  },
  {
    id: 'medsenior_essencial',
    name: 'MedSênior Essencial',
    subtitle: 'Economia com Qualidade',
    description: 'Acesso a hospitais relevantes e pronto-socorro com menor custo.',
    highlight: 'Foco em redução de mensalidade sem perder o essencial.',
    colorClass: 'text-white',
    borderClass: 'border-sky-500',
    bgClass: 'bg-sky-500',
  },
  {
    id: 'hapvida',
    name: 'Hapvida (Notrelife)',
    subtitle: 'Preço e Acesso Funcional',
    description: 'Rede própria verticalizada.',
    highlight: 'Foco em quem prioriza o menor preço e aceita utilizar majoritariamente a rede da operadora.',
    colorClass: 'text-white',
    borderClass: 'border-orange-500',
    bgClass: 'bg-orange-500',
  },
  {
    id: 'prevent_senior',
    name: 'Prevent Senior MA+S',
    subtitle: 'Foco em Ambulatorial',
    description: 'Ampla rede de clínicas e exames.',
    highlight: 'Foco em quem utiliza muitas consultas, mas tem menor dependência de pronto-socorro.',
    colorClass: 'text-white',
    borderClass: 'border-red-600',
    bgClass: 'bg-red-600',
  },
];

export const PRICE_TABLE = [
  { faixa: '0 a 18', hapvida: 252.04, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 883.53 },
  { faixa: '19 a 23', hapvida: 276.54, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 883.53 },
  { faixa: '24 a 28', hapvida: 284.21, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 883.53 },
  { faixa: '29 a 33', hapvida: 315.78, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 883.53 },
  { faixa: '34 a 38', hapvida: 326.33, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 883.53 },
  { faixa: '39 a 43', hapvida: 358.98, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 883.53 },
  { faixa: '44 a 48', hapvida: 511.09, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 1162.60 },
  { faixa: '49 a 53', hapvida: 518.69, medsenior_essencial: 753.23, medsenior_rj1: 900.82, prevent_senior: 1162.60 },
  { faixa: '54 a 58', hapvida: 657.53, medsenior_essencial: 903.88, medsenior_rj1: 1080.98, prevent_senior: 1162.60 },
  { faixa: '59 ou +', hapvida: 1012.61, medsenior_essencial: 1184.08, medsenior_rj1: 1416.08, prevent_senior: 1529.75, highlighted: true },
];
