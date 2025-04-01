import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  formData: {
    // Step 1: Instrument Basics
    instrumentName: "",
    instrumentType: "",
    lender: "",
    issueDate: "",
    maturityDate: "",
    currency: "",
    
    // Step 2: Principal & Interest
    principalAmount: "",
    interestRateType: "",
    interestRate: "",
    interestRateBasis: "",
    interestPaymentFrequency: "",
    dayCountConvention: "",
    firstInterestPaymentDate: "",

    // Step 3: Repayment Schedule
    repaymentScheduleType: "", // 'Manual', 'Upload', 'Generate'
    repaymentSchedule: [], // Stores table rows

    // Step 4: Covenants & Documents
    covenants: [],
    documents: [],

    // Step 5: Review & Confirm (No input fields, just data review)
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => {
      if (state.currentStep < 5) state.currentStep += 1;
    },
    previousStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    resetForm: () => initialState,
  },
});

export const { updateFormData, nextStep, previousStep, resetForm } = formSlice.actions;
export default formSlice.reducer;
