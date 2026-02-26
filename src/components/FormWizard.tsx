import { AnimatePresence } from 'framer-motion';
import { useFormWizard } from '@/hooks/useFormWizard';
import { StepIndicator } from './StepIndicator';
import { LGPDBanner } from './LGPDBanner';
import { PlanTypeStep } from './steps/PlanTypeStep';
import { ProfessionMEIStep } from './steps/ProfessionMEIStep';
import { FamilySizeStep } from './steps/FamilySizeStep';
import { PersonDataStep } from './steps/PersonDataStep';
import { ConsentStep } from './steps/ConsentStep';
import { SuccessStep } from './steps/SuccessStep';

export const FormWizard = () => {
  const {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    isSubmitted,
    setPlanType,
    setFamilySize,
    setHasMEI,
    setPrimaryProfession,
    updatePerson,
    setContactPreference,
    updateConsent,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetForm,
    submitForm,
    validateCurrentStep,
  } = useFormWizard();

  if (isSubmitted) {
    return <SuccessStep onReset={resetForm} />;
  }

  const getStepLabels = () => {
    if (formData.planType === 'individual') {
      return ['Tipo', 'Perfil', 'Dados', 'Confirmar'];
    }
    // family or mei
    return ['Tipo', 'Perfil', 'Família', 'Dados', 'Confirmar'];
  };

  const renderCurrentStep = () => {
    // Step 0: Plan Type selection
    if (currentStep === 0) {
      return <PlanTypeStep onSelect={setPlanType} />;
    }

    // Step 1: Profession/MEI - all types have this
    if (currentStep === 1) {
      return (
        <ProfessionMEIStep
          profession={formData.primaryProfession || null}
          hasMEI={formData.hasMEI || false}
          onSelectProfession={setPrimaryProfession}
          onSetMEI={setHasMEI}
          onContinue={goToNextStep}
          onBack={goToPreviousStep}
        />
      );
    }

    // Individual flow: skip family size step
    if (formData.planType === 'individual') {
      switch (currentStep) {
        case 2:
          // PersonData (maps to visual step 2)
          return (
            <PersonDataStep
              people={formData.people}
              onUpdatePerson={updatePerson}
              onContinue={goToNextStep}
              onBack={goToPreviousStep}
              isValid={validateCurrentStep()}
            />
          );
        case 3:
          // Consent (maps to visual step 3)
          return (
            <ConsentStep
              consentLGPD={formData.consentLGPD}
              consentPartnerAndContact={formData.consentPartnerAndContact}
              contactPreference={formData.contactPreference}
              onUpdateConsent={updateConsent}
              onUpdateContactPreference={setContactPreference}
              onSubmit={submitForm}
              onBack={goToPreviousStep}
              isSubmitting={isSubmitting}
              isValid={validateCurrentStep()}
            />
          );
        default:
          return <PlanTypeStep onSelect={setPlanType} />;
      }
    }

    // Family and MEI flow: include family size step
    switch (currentStep) {
      case 2:
        // FamilySize
        return (
          <FamilySizeStep
            familySize={formData.familySize}
            onSizeChange={(size) => {
              // Update form data without advancing step
              setFamilySize(size);
              goToStep(2); // Stay on current step
            }}
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 3:
        // PersonData
        return (
          <PersonDataStep
            people={formData.people}
            onUpdatePerson={updatePerson}
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
            isValid={validateCurrentStep()}
          />
        );
      case 4:
        // Consent
        return (
          <ConsentStep
            consentLGPD={formData.consentLGPD}
            consentPartnerAndContact={formData.consentPartnerAndContact}
            contactPreference={formData.contactPreference}
            onUpdateConsent={updateConsent}
            onUpdateContactPreference={setContactPreference}
            onSubmit={submitForm}
            onBack={goToPreviousStep}
            isSubmitting={isSubmitting}
            isValid={validateCurrentStep()}
          />
        );
      default:
        return <PlanTypeStep onSelect={setPlanType} />;
    }
  };

  // Calculate visual step for indicator
  const getVisualStep = () => {
    if (formData.planType === 'individual') {
      // Map internal steps to visual steps for individual flow
      // 0=PlanType -> 0, 1=Profession -> 1, 2=PersonData -> 2, 3=Consent -> 3
      return currentStep;
    }
    // Family/MEI: steps are 0, 1, 2, 3, 4
    return currentStep;
  };

  // Calculate visual total steps
  const visualTotalSteps = formData.planType === 'individual' ? 4 : 5;

  return (
    <section className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* LGPD Banner */}
        {currentStep === 0 && <LGPDBanner />}
        
        {/* Step Indicator */}
        {formData.planType && (
          <StepIndicator
            currentStep={getVisualStep()}
            totalSteps={visualTotalSteps}
            labels={getStepLabels().slice(0, visualTotalSteps)}
          />
        )}

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>
      </div>
    </section>
  );
};
