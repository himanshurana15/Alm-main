import React, { useState } from 'react';
import { CalendarIcon, InfoIcon, CheckIcon } from 'lucide-react';

const CreateDebtInstrumentForm = () => {
  // State for current step
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for form data
  const [formData, setFormData] = useState({
    // Step 1: Instrument Basics
    instrumentName: '',
    instrumentType: '',
    lender: '',
    issueDate: '',
    maturityDate: '',
    currency: '',
    
    // Placeholders for other steps
    // To be expanded based on requirements
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      const updatedErrors = {...errors};
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.instrumentName) newErrors.instrumentName = 'Instrument Name is required';
      if (!formData.instrumentType) newErrors.instrumentType = 'Instrument Type is required';
      if (!formData.lender) newErrors.lender = 'Lender is required';
      if (!formData.issueDate) newErrors.issueDate = 'Issue Date is required';
      if (!formData.maturityDate) newErrors.maturityDate = 'Maturity Date is required';
      if (!formData.currency) newErrors.currency = 'Currency is required';
      
      // Additional validation
      if (formData.maturityDate && formData.issueDate && 
          new Date(formData.maturityDate) <= new Date(formData.issueDate)) {
        newErrors.maturityDate = 'Maturity Date must be after Issue Date';
      }
    }
    
    // Add validation for other steps as needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Submit form data to backend
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData({
        instrumentName: '',
        instrumentType: '',
        lender: '',
        issueDate: '',
        maturityDate: '',
        currency: ''
      });
      setCurrentStep(1);
    }
  };

  // Sample data for dropdowns
  const instrumentTypes = [
    'Term Loan', 'Revolving Credit Facility', 'Bond', 'Commercial Paper', 
    'Private Placement', 'Syndicated Loan', 'Bilateral Loan'
  ];
  
  const currencies = [
    'USD - US Dollar', 'EUR - Euro', 'GBP - British Pound', 'JPY - Japanese Yen', 
    'CHF - Swiss Franc', 'CAD - Canadian Dollar', 'AUD - Australian Dollar'
  ];
  
  const lenders = [
    'ABC Bank', 'XYZ Financial Services', 'Global Investment Ltd.', 
    'International Finance Group', 'Regional Bank Corp.', 'National Funding LLC'
  ];

  // Step titles
  const steps = [
    'Instrument Basics',
    'Principal & Interest',
    'Repayment Schedule',
    'Covenants & Documents',
    'Review & Confirm'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Create New Debt Instrument</h1>
          <p className="text-gray-600">Debt Management Module</p>
        </div>
        
        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep > index + 1 ? 'bg-green-500' : 
                  currentStep === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
                } text-white font-bold`}>
                  {currentStep > index + 1 ? <CheckIcon className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`mt-2 text-sm ${
                  currentStep === index + 1 ? 'text-blue-500 font-medium' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-full h-1 bg-gray-200 absolute" 
                      style={{top: '37px', left: `calc(${(index + 1) * 100 / steps.length}% - 40px)`, 
                      width: `calc(100% / ${steps.length})`}} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* Step 1: Instrument Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Instrument Basics</h2>
              <p className="text-gray-600">Enter the fundamental details of the debt instrument.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Instrument Name */}
                <div>
                  <label htmlFor="instrumentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Instrument Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="instrumentName"
                    name="instrumentName"
                    value={formData.instrumentName}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.instrumentName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter instrument name"
                  />
                  {errors.instrumentName && (
                    <p className="mt-1 text-sm text-red-500">{errors.instrumentName}</p>
                  )}
                </div>

                {/* Instrument Type */}
                <div>
                  <label htmlFor="instrumentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Instrument Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="instrumentType"
                    name="instrumentType"
                    value={formData.instrumentType}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.instrumentType ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select instrument type</option>
                    {instrumentTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.instrumentType && (
                    <p className="mt-1 text-sm text-red-500">{errors.instrumentType}</p>
                  )}
                </div>

                {/* Lender */}
                <div>
                  <label htmlFor="lender" className="block text-sm font-medium text-gray-700 mb-1">
                    Lender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="lender"
                    name="lender"
                    value={formData.lender}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.lender ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select lender</option>
                    {lenders.map((lender, index) => (
                      <option key={index} value={lender}>{lender}</option>
                    ))}
                  </select>
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
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.issueDate ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.maturityDate ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.currency ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select currency</option>
                    {currencies.map((currency, index) => (
                      <option key={index} value={currency}>{currency}</option>
                    ))}
                  </select>
                  {errors.currency && (
                    <p className="mt-1 text-sm text-red-500">{errors.currency}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Principal & Interest (Placeholder) */}
          {currentStep === 2 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Principal & Interest</h2>
              <p className="text-gray-500">This step would include fields for principal amount, interest rate type, base rate, margin, etc.</p>
            </div>
          )}

          {/* Step 3: Repayment Schedule (Placeholder) */}
          {currentStep === 3 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Repayment Schedule</h2>
              <p className="text-gray-500">This step would include fields for repayment frequency, amortization schedule, balloon payments, etc.</p>
            </div>
          )}

          {/* Step 4: Covenants & Documents (Placeholder) */}
          {currentStep === 4 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Covenants & Documents</h2>
              <p className="text-gray-500">This step would include fields for financial covenants, document uploads, etc.</p>
            </div>
          )}

          {/* Step 5: Review & Confirm (Placeholder) */}
          {currentStep === 5 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Review & Confirm</h2>
              <p className="text-gray-500">This step would show a summary of all entered information for final review.</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="mt-8 flex justify-between border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-md ${
                currentStep === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'
              } text-gray-700 font-medium`}
            >
              Previous
            </button>
            
            <div>
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      
      {/* Help Information */}
      <div className="max-w-5xl mx-auto mt-4 p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-start">
          <InfoIcon className="text-blue-500 w-5 h-5 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Help Information</h3>
            <p className="text-sm text-blue-600">
              This form allows ALM Analysts and Managers to create new debt instruments in the system. 
              All required fields are marked with an asterisk (*). For assistance, please contact the ALM support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateDebtInstrumentForm;





