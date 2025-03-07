
import React, { useState } from 'react';
import { Check, ChevronsUpDown, FileBox, DollarSign, Calendar, Briefcase, Info } from 'lucide-react';

const CreateDebtInstrument = () => {
  // Current active step
  const [activeStep, setActiveStep] = useState(0);
  
  // Form data state
  const [formData, setFormData] = useState({
    instrumentName: '',
    instrumentType: '',
    lender: '',
    issueDate: '',
    maturityDate: '',
    currency: '',
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form data for current step
  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    if (activeStep === 0) {
      if (!formData.instrumentName.trim()) {
        newErrors.instrumentName = 'Instrument Name is required';
        isValid = false;
      }
      
      if (!formData.instrumentType) {
        newErrors.instrumentType = 'Instrument Type is required';
        isValid = false;
      }
      
      if (!formData.lender) {
        newErrors.lender = 'Lender is required';
        isValid = false;
      }
      
      if (!formData.issueDate) {
        newErrors.issueDate = 'Issue Date is required';
        isValid = false;
      }
      
      if (!formData.maturityDate) {
        newErrors.maturityDate = 'Maturity Date is required';
        isValid = false;
      }
      
      if (!formData.currency) {
        newErrors.currency = 'Currency is required';
        isValid = false;
      }
      
      // Additional validation: maturity date must be after issue date
      if (formData.issueDate && formData.maturityDate) {
        const issueDate = new Date(formData.issueDate);
        const maturityDate = new Date(formData.maturityDate);
        
        if (maturityDate <= issueDate) {
          newErrors.maturityDate = 'Maturity Date must be after Issue Date';
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Next step handler
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  // Previous step handler
  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  // Step titles
  const steps = [
    'Instrument Basics',
    'Principal & Interest',
    'Repayment Schedule',
    'Covenants & Documents',
    'Review & Confirm'
  ];

  // Mock data for dropdowns
  const instrumentTypes = ['Term Loan', 'Revolving Credit', 'Bond', 'Note', 'Commercial Paper', 'Line of Credit'];
  const lenders = ['Bank of America', 'JPMorgan Chase', 'Wells Fargo', 'Citibank', 'Goldman Sachs', 'Morgan Stanley'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 border-b">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Create New Debt Instrument</h1>
          <p className="text-gray-500">Debt Management Module</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium
                    ${index < activeStep ? 'bg-blue-600 text-white' : 
                      index === activeStep ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' : 
                      'bg-gray-100 text-gray-500'}`}
                >
                  {index < activeStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`mt-2 text-sm ${index === activeStep ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block h-0.5 w-32 bg-gray-200 -mt-5 ml-32"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Step 1: Instrument Basics */}
          {activeStep === 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <FileBox className="mr-2 text-blue-600" />
                Instrument Basics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Instrument Name */}
                <div className="col-span-2">
                  <label htmlFor="instrumentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Instrument Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="instrumentName"
                    name="instrumentName"
                    value={formData.instrumentName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md ${errors.instrumentName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter instrument name"
                  />
                  {errors.instrumentName && (
                    <p className="mt-1 text-sm text-red-500">{errors.instrumentName}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Provide a unique, descriptive name for this debt instrument
                  </p>
                </div>

                {/* Instrument Type */}
                <div>
                  <label htmlFor="instrumentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Instrument Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="instrumentType"
                      name="instrumentType"
                      value={formData.instrumentType}
                      onChange={handleChange}
                      className={`w-full p-3 pr-10 border rounded-md appearance-none bg-white ${errors.instrumentType ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select an instrument type</option>
                      {instrumentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronsUpDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  {errors.instrumentType && (
                    <p className="mt-1 text-sm text-red-500">{errors.instrumentType}</p>
                  )}
                </div>

                {/* Lender */}
                <div>
                  <label htmlFor="lender" className="block text-sm font-medium text-gray-700 mb-1">
                    Lender <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="lender"
                      name="lender"
                      value={formData.lender}
                      onChange={handleChange}
                      className={`w-full p-3 pr-10 border rounded-md appearance-none bg-white ${errors.lender ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select a lender</option>
                      {lenders.map((lender) => (
                        <option key={lender} value={lender}>{lender}</option>
                      ))}
                    </select>
                    <Briefcase className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  {errors.lender && (
                    <p className="mt-1 text-sm text-red-500">{errors.lender}</p>
                  )}
                </div>

                {/* Issue Date */}
                <div>
                  <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="issueDate"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md ${errors.issueDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  {errors.issueDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.issueDate}</p>
                  )}
                </div>

                {/* Maturity Date */}
                <div>
                  <label htmlFor="maturityDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Maturity Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="maturityDate"
                      name="maturityDate"
                      value={formData.maturityDate}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md ${errors.maturityDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  {errors.maturityDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.maturityDate}</p>
                  )}
                </div>

                {/* Currency */}
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className={`w-full p-3 pr-10 border rounded-md appearance-none bg-white ${errors.currency ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select a currency</option>
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                    <DollarSign className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  {errors.currency && (
                    <p className="mt-1 text-sm text-red-500">{errors.currency}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other steps */}
          {activeStep === 1 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Principal & Interest</h2>
              <p className="text-gray-500">This step would contain fields for principal amount, interest rate type, interest rate, etc.</p>
            </div>
          )}
          
          {activeStep === 2 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Repayment Schedule</h2>
              <p className="text-gray-500">This step would contain fields for repayment frequency, payment terms, etc.</p>
            </div>
          )}
          
          {activeStep === 3 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Covenants & Documents</h2>
              <p className="text-gray-500">This step would contain fields for covenants, document uploads, etc.</p>
            </div>
          )}
          
          {activeStep === 4 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Review & Confirm</h2>
              <p className="text-gray-500">This step would show a summary of all entered information for review.</p>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Info className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-700">ALM Analyst Guidance</h3>
              <p className="text-sm text-blue-600">
                {activeStep === 0 && "Complete all required fields in the Instrument Basics step. The instrument name should be unique and descriptive. All fields marked with * are mandatory."}
                {activeStep === 1 && "Provide accurate principal and interest information. For variable rate instruments, specify the reference rate and spread."}
                {activeStep === 2 && "Define the repayment schedule including frequency and specific terms."}
                {activeStep === 3 && "Upload all relevant documentation and specify any covenants or conditions."}
                {activeStep === 4 && "Carefully review all entered information before final submission."}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={activeStep === 0}
            className={`px-6 py-2 rounded-md ${activeStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateDebtInstrument;


