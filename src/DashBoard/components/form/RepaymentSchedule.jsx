// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, prevStep } from "../../../redux/Form/debtInstrumentSlice.js";

const RepaymentSchedule = () => {
  const dispatch = useDispatch();
  const { repaymentSchedule, additionalDetails } = useSelector((state) => state.debtInstrument);

  const [scheduleType, setScheduleType] = useState(repaymentSchedule?.type || "manual");
  const [manualEntries, setManualEntries] = useState(repaymentSchedule?.entries || []);
  const [comments, setComments] = useState(additionalDetails?.comments || "");
  const [attachments, setAttachments] = useState(additionalDetails?.attachments || []);

  const addRow = () => {
    setManualEntries([
      ...manualEntries,
      { installmentNumber: manualEntries.length + 1, dueDate: "", principal: "", interest: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...manualEntries];
    updatedEntries[index][field] = value;
    setManualEntries(updatedEntries);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAttachments([...attachments, file]);
  };

  const handleSubmit = () => {
    dispatch(updateFormData({
      repaymentSchedule: { type: scheduleType, entries: manualEntries },
      additionalDetails: { comments, attachments }
    }));
    dispatch(nextStep());
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Repayment Schedule</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Select Schedule Type</label>
        <select
          value={scheduleType}
          onChange={(e) => setScheduleType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="manual">Manual Schedule Input</option>
          <option value="upload">Upload Schedule from Template</option>
          <option value="generate">Generate Schedule Automatically</option>
        </select>
      </div>

      {scheduleType === "manual" && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Manual Schedule Input</h3>
          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">#</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Principal</th>
                <th className="p-2">Interest</th>
              </tr>
            </thead>
            <tbody>
              {manualEntries.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{row.installmentNumber}</td>
                  <td className="p-2">
                    <input
                      type="date"
                      value={row.dueDate}
                      onChange={(e) => handleInputChange(index, "dueDate", e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.principal}
                      onChange={(e) => handleInputChange(index, "principal", e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.interest}
                      onChange={(e) => handleInputChange(index, "interest", e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addRow}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Row
          </button>
        </div>
      )}

      {scheduleType === "upload" && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Upload Schedule</h3>
          <input type="file" onChange={handleFileUpload} className="w-full p-2 border rounded" />
        </div>
      )}

      {scheduleType === "generate" && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Generate Schedule</h3>
          <p className="text-gray-600">Automatic schedule generation logic will be implemented here.</p>
        </div>
      )}

      {/* Step 4: Additional Details */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Additional Details</h2>

        <label className="block text-gray-700">Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter any additional comments"
        ></textarea>

        <label className="block text-gray-700 mt-4">Attachments</label>
        <input type="file" multiple onChange={handleFileUpload} className="w-full p-2 border rounded" />
        <ul className="mt-2 text-sm text-gray-600">
          {attachments.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => dispatch(prevStep())}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RepaymentSchedule;
