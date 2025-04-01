import { configureStore } from '@reduxjs/toolkit';
import debtInstrumentReducer from './Form/debtInstrumentSlice';


export const store = configureStore({
  reducer: {
    debtInstrument: debtInstrumentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serialization check (not recommended)
    }),
});
