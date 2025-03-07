import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  formData: {
    instrumentName: "",
    instrumentType: "",
    lender: "",
    issueDate: "",
    maturityDate: "",
    currency: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.activeStep < 4) state.activeStep += 1;
    },
    prevStep: (state) => {
      if (state.activeStep > 0) state.activeStep -= 1;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { nextStep, prevStep, updateFormData } = formSlice.actions;
export default formSlice.reducer;
