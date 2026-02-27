import { useState, useCallback } from 'react';
import { FormData, PersonData, PlanType, ContactPreference, SelectedPlan, Profession } from '@/types/form';

const createEmptyPerson = (id: string, isHolder: boolean): PersonData => ({
  id,
  isHolder,
  relationship: isHolder ? 'titular' : 'conjuge',
  fullName: '',
  birthDate: '',
  phone: '',
  email: '',
  emailConfirmation: '',
  state: '',
  city: '',
  profession: null,
});

const initialFormData: FormData = {
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

// helper exported for testing or external validation
export const validateStep = (formData: FormData, currentStep: number): boolean => {
  switch (currentStep) {
    case 0:
      return formData.planType !== null;
    case 1:
      // Profissão/MEI - sempre válido
      return true;
    case 2:
      // Individual plans skip the family-size step and show the person-data step
      if (formData.planType === 'individual') {
        return formData.people.every(person => {
          const isValid = 
            person.fullName.trim().length >= 3 &&
            person.birthDate.length === 10 &&
            person.phone.replace(/\D/g, '').length >= 10 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email) &&
            person.email === person.emailConfirmation &&
            person.state !== '' &&
            person.city.trim().length >= 2;
          return isValid;
        });
      }
      // Family/MEI flow: validate family size
      return formData.familySize >= 2;
    case 3:
      if (formData.planType === 'individual') {
        // this is the consent step for individual flow
        return (
          formData.consentLGPD &&
          formData.consentPartnerAndContact &&
          formData.contactPreference !== null
        );
      }
      // in family/MEI flow currentStep 3 is still the person-data step
      return formData.people.every(person => {
        const isValid = 
          person.fullName.trim().length >= 3 &&
          person.birthDate.length === 10 &&
          person.phone.replace(/\D/g, '').length >= 10 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email) &&
          person.email === person.emailConfirmation &&
          person.state !== '' &&
          person.city.trim().length >= 2;
        return isValid;
      });
    case 4:
      // Only reachable in family/MEI flow and corresponds to consent
      return (
        formData.consentLGPD &&
        formData.consentPartnerAndContact &&
        formData.contactPreference !== null
      );
    default:
      return false;
  }
};

export const useFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wantsOtherOptions, setWantsOtherOptions] = useState(false);

  // Steps: 0=PlanType, 1=Profissão/MEI (all types), 2=FamilySize(family/MEI only), 3=PersonData, 4=Consent
  const totalSteps = formData.planType === 'individual' ? 4 : 5;

  const setPlanType = useCallback((type: PlanType) => {
    setFormData(prev => ({
      ...prev,
      planType: type,
      familySize: type === 'individual' ? 1 : (type === 'mei' ? 2 : 2),
      people: type === 'individual' 
        ? [createEmptyPerson('person-1', true)]
        : [createEmptyPerson('person-1', true), createEmptyPerson('person-2', false)],
      hasMEI: type === 'mei' ? true : false,
    }));
    setCurrentStep(1); // Next step: Profissão/MEI
  }, []);

  const setFamilySize = useCallback((size: number) => {
    setFormData(prev => {
      const currentPeople = [...prev.people];
      const newPeople: PersonData[] = [];
      
      for (let i = 0; i < size; i++) {
        if (currentPeople[i]) {
          newPeople.push(currentPeople[i]);
        } else {
          newPeople.push(createEmptyPerson(`person-${i + 1}`, i === 0));
        }
      }
      
      return {
        ...prev,
        familySize: size,
        people: newPeople,
      };
    });
    setCurrentStep(3); // Next: PersonData
  }, []);

  const setHasMEI = useCallback((hasMEI: boolean) => {
    setFormData(prev => ({
      ...prev,
      hasMEI,
      // Se MEI precisa de pelo menos 2 vidas
      familySize: hasMEI ? Math.max(prev.familySize, 2) : prev.familySize,
    }));
  }, []);

  const setPrimaryProfession = useCallback((profession: Profession) => {
    setFormData(prev => ({
      ...prev,
      primaryProfession: profession,
      // Também atualizar a profissão do titular
      people: prev.people.map(person =>
        person.isHolder ? { ...person, profession } : person
      ),
    }));
  }, []);

  const updatePerson = useCallback((personId: string, updates: Partial<PersonData>) => {
    setFormData(prev => ({
      ...prev,
      people: prev.people.map(person =>
        person.id === personId ? { ...person, ...updates } : person
      ),
    }));
  }, []);

  const setContactPreference = useCallback((preference: ContactPreference) => {
    setFormData(prev => ({
      ...prev,
      contactPreference: preference,
    }));
    // Continue to submit
  }, []);

  const updateConsent = useCallback((field: 'consentLGPD' | 'consentPartnerAndContact', value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const setSelectedPlan = useCallback((plan: SelectedPlan) => {
    setFormData(prev => ({
      ...prev,
      selectedPlan: plan,
    }));
  }, []);

  const goToNextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsSubmitted(false);
    setWantsOtherOptions(false);
  }, []);

  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Email API error:', result.message);
        // Continue to success even if email fails (data is logged)
      }
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success to user, log error for debugging
      console.log('Form data (email failed):', formData);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const validateCurrentStep = useCallback((): boolean => {
    return validateStep(formData, currentStep);
  }, [currentStep, formData]);

  return {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    isSubmitted,
    wantsOtherOptions,
    setPlanType,
    setFamilySize,
    setHasMEI,
    setPrimaryProfession,
    updatePerson,
    setContactPreference,
    updateConsent,
    setSelectedPlan,
    setWantsOtherOptions,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetForm,
    submitForm,
    validateCurrentStep,
  };
};
