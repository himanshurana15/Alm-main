

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  totalSteps: 5,
  formData: {
    instrumentBasics: {
      instrumentName: "",
      instrumentType: "",
      lender: "",
      issueDate: "",
      maturityDate: "",
      currency: "",
    },
    principalInterest: {
      principalAmount: "",
      interestRateType: "",
      interestRate: "",
      interestRateBasis: "",
      interestPaymentFrequency: "",
      dayCountConvention: "",
      firstInterestPaymentDate: "",
    },
    repaymentSchedule: [],
    covenantsDocuments: {
      covenants: [],
      documents: [],
    },
  },
};

const debtInstrumentSlice = createSlice({
  name: "debtInstrument",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
  },
});

export const { updateFormData, nextStep, prevStep } = debtInstrumentSlice.actions;
export default debtInstrumentSlice.reducer;
