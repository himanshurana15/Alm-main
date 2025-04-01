// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData ,nextStep, prevStep } from "../../../redux/Form/debtInstrumentSlice.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  covenants: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Covenant name is required"),
      description: yup.string().required("Description is required"),
    })
  ),
  documents: yup.array().nullable(),
});

const CovenantsDocuments = () => {
  const dispatch = useDispatch();
  const { covenants, documents } = useSelector((state) => state.debtInstrument);
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: { covenants: covenants || [], documents: documents || [] },
    resolver: yupResolver(schema),
  });

  const addCovenant = () => {
    const updatedCovenants = [...getValues("covenants"), { name: "", description: "" }];
    setValue("covenants", updatedCovenants);
  };

  const removeCovenant = (index) => {
    const updatedCovenants = getValues("covenants").filter((_, i) => i !== index);
    setValue("covenants", updatedCovenants);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("documents", [...getValues("documents"), file]);
    }
  };

  const removeDocument = (index) => {
    const updatedDocs = getValues("documents").filter((_, i) => i !== index);
    setValue("documents", updatedDocs);
  };

  const onSubmit = (data) => {
    dispatch(updateFormData(data));
    nextStep();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Covenants & Documents</h2>
      <p className="text-gray-600">Provide covenant details and upload necessary documents.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Covenants Section */}
        <div>
          <h3 className="font-semibold mb-2">Covenants</h3>
          {getValues("covenants").map((covenant, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                {...register(`covenants.${index}.name`)}
                className="w-1/3 p-2 border rounded"
                placeholder="Covenant Name"
              />
              <input
                type="text"
                {...register(`covenants.${index}.description`)}
                className="w-2/3 p-2 border rounded"
                placeholder="Description"
              />
              <button type="button" onClick={() => removeCovenant(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addCovenant} className="px-4 py-2 bg-green-500 text-white rounded">Add Covenant</button>
        </div>

        {/* Documents Upload Section */}
        <div>
          <h3 className="font-semibold mb-2">Upload Documents</h3>
          <input type="file" onChange={handleFileUpload} className="w-full p-2 border rounded" />
          {getValues("documents").length > 0 && (
            <ul className="mt-2">
              {getValues("documents").map((doc, index) => (
                <li key={index} className="flex justify-between bg-gray-100 p-2 rounded">
                  <span>{doc.name}</span>
                  <button type="button" onClick={() => removeDocument(index)} className="text-red-500">Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-500 text-white rounded">Back</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        </div>
      </form>
    </div>
  );
};

export default CovenantsDocuments;