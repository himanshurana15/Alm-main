import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../../../redux/Form/debtInstrumentSlice.js";

const ReviewConfirm = () => {
  const dispatch = useDispatch();
  const debtInstrument = useSelector((state) => state.debtInstrument);

  const handleSubmit = () => {
    dispatch(updateFormData());
    alert("Debt Instrument Successfully Submitted!");
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>

      {/* Instrument Basics */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <h3 className="font-semibold text-lg mb-2">Instrument Basics</h3>
        <p><strong>Name:</strong> {debtInstrument.instrumentName || "N/A"}</p>
        <p><strong>Type:</strong> {debtInstrument.instrumentType || "N/A"}</p>
        <p><strong>Lender:</strong> {debtInstrument.lender || "N/A"}</p>
        <p><strong>Issue Date:</strong> {debtInstrument.issueDate || "N/A"}</p>
        <p><strong>Maturity Date:</strong> {debtInstrument.maturityDate || "N/A"}</p>
        <p><strong>Currency:</strong> {debtInstrument.currency || "N/A"}</p>
      </div>

      {/* Principal & Interest */}
      <div className="border p-4 rounded-lg bg-gray-50 mt-4">
        <h3 className="font-semibold text-lg mb-2">Principal & Interest</h3>
        <p><strong>Principal Amount:</strong> {debtInstrument.principalAmount || "N/A"}</p>
        <p><strong>Interest Rate:</strong> {debtInstrument.interestRate ? `${debtInstrument.interestRate} %` : "N/A"}</p>
        <p><strong>Interest Rate Type:</strong> {debtInstrument.interestRateType || "N/A"}</p>
        {debtInstrument.interestRateBasis && <p><strong>Interest Rate Basis:</strong> {debtInstrument.interestRateBasis}</p>}
        {debtInstrument.interestPaymentFrequency && <p><strong>Payment Frequency:</strong> {debtInstrument.interestPaymentFrequency}</p>}
      </div>

      {/* Repayment Schedule */}
      <div className="border p-4 rounded-lg bg-gray-50 mt-4">
        <h3 className="font-semibold text-lg mb-2">Repayment Schedule</h3>
        {debtInstrument.repaymentSchedule && debtInstrument.repaymentSchedule.length > 0 ? (
          <ul>
            {debtInstrument.repaymentSchedule.map((installment, index) => (
              <li key={index}>
                <strong>Installment {index + 1}:</strong> {installment.dueDate} - Principal: {installment.principal} | Interest: {installment.interest}
              </li>
            ))}
          </ul>
        ) : <p>No repayment schedule provided.</p>}
      </div>

      {/* Covenants & Documents */}
      <div className="border p-4 rounded-lg bg-gray-50 mt-4">
        <h3 className="font-semibold text-lg mb-2">Covenants & Documents</h3>
        
        <p><strong>Covenants:</strong></p>
        {debtInstrument.covenants && debtInstrument.covenants.length > 0 ? (
          <ul>
            {debtInstrument.covenants.map((covenant, index) => (
              <li key={index}>{covenant.name}: {covenant.description}</li>
            ))}
          </ul>
        ) : <p>No covenants provided.</p>}
        
        <p className="mt-2"><strong>Uploaded Documents:</strong></p>
        {debtInstrument.documents && debtInstrument.documents.length > 0 ? (
          <ul>
            {debtInstrument.documents.map((doc, index) => (
              <li key={index}>{doc.fileName}</li>
            ))}
          </ul>
        ) : <p>No documents uploaded.</p>}
      </div>

      {/* Navigation Buttons */}
      
    </div>
  );
};

export default ReviewConfirm;
