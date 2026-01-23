import { AnimatePresence } from 'framer-motion';
import { useFormWizard } from '@/hooks/useFormWizard';
import { StepIndicator } from './StepIndicator';
import { LGPDBanner } from './LGPDBanner';
import { PlanTypeStep } from './steps/PlanTypeStep';
import { FamilySizeStep } from './steps/FamilySizeStep';
import { PersonDataStep } from './steps/PersonDataStep';
import { ConsentStep } from './steps/ConsentStep';
import { PlanSelectionStep } from './steps/PlanSelectionStep';
import { SuccessStep } from './steps/SuccessStep';

export const FormWizard = () => {
  const {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    isSubmitted,
    wantsOtherOptions,
    setPlanType,
    setFamilySize,
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
  } = useFormWizard();

  if (isSubmitted) {
    return <SuccessStep onReset={resetForm} />;
  }

  const getStepLabels = () => {
    if (formData.planType === 'family') {
      return ['Tipo', 'Família', 'Dados', 'Confirmar', 'Plano'];
    }
    return ['Tipo', 'Dados', 'Confirmar', 'Plano'];
  };

  const renderCurrentStep = () => {
    // Individual flow: skip family size step
    if (formData.planType === 'individual') {
      switch (currentStep) {
        case 0:
          return <PlanTypeStep onSelect={setPlanType} />;
        case 2:
          return (
            <PersonDataStep
              people={formData.people}
              onUpdatePerson={updatePerson}
              onContinue={goToNextStep}
              onBack={() => goToStep(0)}
              isValid={validateCurrentStep()}
            />
          );
        case 3:
          return (
            <ConsentStep
              consentLGPD={formData.consentLGPD}
              consentPartnerAndContact={formData.consentPartnerAndContact}
              contactPreference={formData.contactPreference}
              onUpdateConsent={updateConsent}
              onUpdateContactPreference={setContactPreference}
              onSubmit={goToNextStep}
              onBack={goToPreviousStep}
              isSubmitting={false}
              isValid={validateCurrentStep()}
            />
          );
        case 4:
          return (
            <PlanSelectionStep
              selectedPlan={formData.selectedPlan}
              wantsOtherOptions={wantsOtherOptions}
              onSelectPlan={setSelectedPlan}
              onToggleOtherOptions={setWantsOtherOptions}
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

    // Family flow: include family size step
    switch (currentStep) {
      case 0:
        return <PlanTypeStep onSelect={setPlanType} />;
      case 1:
        return (
          <FamilySizeStep
            familySize={formData.familySize}
            onSizeChange={(size) => {
              // Update form data without advancing step
              setFamilySize(size);
              goToStep(1); // Stay on current step
            }}
            onContinue={goToNextStep}
            onBack={() => goToStep(0)}
          />
        );
      case 2:
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
        return (
          <ConsentStep
            consentLGPD={formData.consentLGPD}
            consentPartnerAndContact={formData.consentPartnerAndContact}
            contactPreference={formData.contactPreference}
            onUpdateConsent={updateConsent}
            onUpdateContactPreference={setContactPreference}
            onSubmit={goToNextStep}
            onBack={goToPreviousStep}
            isSubmitting={false}
            isValid={validateCurrentStep()}
          />
        );
      case 4:
        return (
          <PlanSelectionStep
            selectedPlan={formData.selectedPlan}
            wantsOtherOptions={wantsOtherOptions}
            onSelectPlan={setSelectedPlan}
            onToggleOtherOptions={setWantsOtherOptions}
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
      if (currentStep === 0) return 0;
      if (currentStep === 2) return 1;
      if (currentStep === 3) return 2;
      if (currentStep === 4) return 3;
      return 0;
    }
    return currentStep;
  };

  return (
    <section className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* LGPD Banner */}
        {currentStep === 0 && <LGPDBanner />}
        
        {/* Step Indicator */}
        {formData.planType && (
          <StepIndicator
            currentStep={getVisualStep()}
            totalSteps={formData.planType === 'family' ? 5 : 4}
            labels={getStepLabels()}
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
