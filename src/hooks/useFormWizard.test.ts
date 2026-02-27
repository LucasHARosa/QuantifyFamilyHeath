import { validateStep } from './useFormWizard';
import { FormData, PersonData } from '@/types/form';

describe('useFormWizard.validateStep', () => {
  const emptyPerson: PersonData = {
    id: 'person-1',
    isHolder: true,
    relationship: 'titular',
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    emailConfirmation: '',
    state: '',
    city: '',
    profession: null,
  };

  const validPerson: PersonData = {
    ...emptyPerson,
    fullName: 'John Doe',
    birthDate: '01/01/1980',
    phone: '(11) 99999-0000',
    email: 'john@example.com',
    emailConfirmation: 'john@example.com',
    state: 'SP',
    city: 'São Paulo',
  };

  const baseData: FormData = {
    planType: null,
    familySize: 1,
    people: [],
    contactPreference: null,
    consentLGPD: false,
    consentPartnerAndContact: false,
    selectedPlan: null,
    hasMEI: false,
    primaryProfession: null,
  };

  it('returns false for individual at step 2 if people are invalid', () => {
    const formData = {
      ...baseData,
      planType: 'individual',
      people: [emptyPerson],
    } as FormData;

    expect(validateStep(formData, 2)).toBe(false);
  });

  it('returns true for individual at step 2 when person data is complete', () => {
    const formData = {
      ...baseData,
      planType: 'individual',
      people: [validPerson],
    } as FormData;

    expect(validateStep(formData, 2)).toBe(true);
  });

  it('returns false for family at step 2 when familySize &lt; 2', () => {
    const formData = {
      ...baseData,
      planType: 'family',
      familySize: 1,
    } as FormData;

    expect(validateStep(formData, 2)).toBe(false);
  });

  it('returns true for family at step 2 when familySize &gt;= 2', () => {
    const formData = {
      ...baseData,
      planType: 'family',
      familySize: 2,
    } as FormData;

    expect(validateStep(formData, 2)).toBe(true);
  });

  it('validates consent on appropriate steps', () => {
    const consentData = {
      ...baseData,
      planType: 'individual',
      consentLGPD: true,
      consentPartnerAndContact: true,
      contactPreference: 'email',
    } as FormData;

    expect(validateStep(consentData, 3)).toBe(true);
    const familyConsentData = { ...consentData, planType: "family" } as FormData; expect(validateStep(familyConsentData, 4)).toBe(true);
  });
});