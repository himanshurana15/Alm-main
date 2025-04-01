// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../../redux/Form/debtInstrumentSlice.js";
import InstrumentBasics from "./InstrumentBasics.jsx";
import PrincipalInterest from "./PrincipalInterest.jsx";
import RepaymentSchedule from "./RepaymentSchedule.jsx";
import CovenantsDocuments from "./CovenantsDocuments.jsx";
import ReviewConfirm from "./ReviewConfirm.jsx";
import { CheckIcon } from "@heroicons/react/24/solid";
import { InfoIcon } from "lucide-react";

const steps = [
  "Instrument Basics",
  "Principal & Interest",
  "Repayment Schedule",
  "Covenants & Documents",
  "Review & Confirm",
];

const MultiStepForm = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.debtInstrument.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InstrumentBasics />;
      case 2:
        return <PrincipalInterest />;
      case 3:
        return <RepaymentSchedule />;
      case 4:
        return <CovenantsDocuments />;
      case 5:
        return <ReviewConfirm />;
      default:
        return <InstrumentBasics />;
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-4">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Debt Instrument
          </h1>
          <p className="text-gray-600">Debt Management Module</p>
        </div>

        {/* Step Indicator - Now Fully Responsive */}
        <div className="px-6 py-4 border-b border-gray-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-max w-full whitespace-nowrap">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center flex-1">
                {/* Connecting Line (Behind Circles) */}
                {index > 0 && (
                  <div
                    className={`absolute top-5 left-[-50%] h-1 ${
                      currentStep > index + 0 ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    style={{
                      width: "100%",
                    }}
                  />
                )}

                {/* Step Circle */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold z-10 ${
                    currentStep > index + 1
                      ? "bg-blue-500"
                      : currentStep === index + 1
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`mt-2 text-sm text-center ${
                    currentStep === index + 1
                      ? "text-blue-500 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="p-6">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="p-6 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={() => dispatch(prevStep())}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Previous
            </button>
          )}
          {currentStep < steps.length && (
            <button
              onClick={() => dispatch(nextStep())}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Help Information */}
      <div className="max-w-4xl mx-auto mt-4 p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-start">
          <InfoIcon className="text-blue-500 w-5 h-5 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Help Information
            </h3>
            <p className="text-sm text-blue-600">
              This form allows ALM Analysts and Managers to create new debt
              instruments in the system. All required fields are marked with an
              asterisk (*). For assistance, please contact the ALM support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
