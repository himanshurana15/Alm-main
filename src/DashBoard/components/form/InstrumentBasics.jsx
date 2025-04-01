// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
  // nextStep,
} from "../../../redux/Form/debtInstrumentSlice.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  instrumentName: yup.string().required("Instrument Name is required"),
  instrumentType: yup.string().required("Instrument Type is required"),
  lender: yup.string().required("Lender is required"),
  issueDate: yup.date().required("Issue Date is required"),
  maturityDate: yup.date().required("Maturity Date is required"),
  currency: yup.string().required("Currency is required"),
});

const InstrumentBasics = () => {
  const dispatch = useDispatch();
  const { instrumentBasics } = useSelector((state) => state.debtInstrument);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: instrumentBasics,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(updateFormData(data));
    // dispatch(nextStep());
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Instrument Basics</h2>
      <p className="text-gray-600 mb-10">
        Enter the fundamental details of the debt instrument.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Instrument Name */}
        <div>
          <label
            htmlFor="instrumentName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Instrument Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("instrumentName")}
            type="text"
            id="instrumentName"
            name="instrumentName"
            className={`w-full p-2 border rounded-md ${
              errors.instrumentName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter instrument name"
          />
          <p className="text-gray-600 text-[13px]">
            A unique name to identify this debt instrument
          </p>

          {errors.instrumentName && (
            <p className="mt-1 text-sm text-red-500">{errors.instrumentName}</p>
          )}
        </div>

        {/* Instrument Type (Dropdown) */}
        <div>
          <label
            htmlFor="instrumentType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Instrument Type <span className="text-red-500">*</span>
          </label>{" "}
          <select
            {...register("instrumentType")}
            className="w-full p-2 border rounded text-gray-600"
          >
            <option  value="">Select Type</option>
            <option value="Bond">Bond</option>
            <option value="Loan">Loan</option>
            <option value="Term Loan">Term Loan</option>
            <option value="Revolving Credit Facility">
              Revolving Credit Facility
            </option>
            <option value="Commercial Paper">Commercial Paper</option>
            <option value="Private Placement">Private Placement</option>
            <option value="Syndicated Loan">Syndicated Loan</option>
            <option value="Bilateral Loan">Bilateral Loan</option>
          </select>
          <p className="text-gray-600 text-[13px]">
            The type of debt instrument you are creating
          </p>
          {errors.instrumentType && (
            <p className="text-red-500 text-sm">
              {errors.instrumentType.message}
            </p>
          )}
        </div>

        {/* Lender (Autocomplete Placeholder) */}
        <div>
          <label
            htmlFor="lender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lender <span className="text-red-500">*</span>
          </label>{" "}
          <input
            {...register("lender")}
            list="lenders"
            className="w-full p-2 border rounded"
            placeholder="Search lender..."
          />
          <datalist id="lenders">
            <option value="JP Morgan Chase" />
            <option value="Bank of America" />
            <option value="Citibank" />
            <option value="Wells Fargo" />
            <option value="Goldman Sachs" />
            <option value="Morgan Stanley" />
            <option value="Deutsche Bank" />
            <option value="Institution C" />
            <option value="HSBC" />
            <option value="Barclays" />
          </datalist>
          <p className="text-gray-600 text-[13px]">
            Select the financial institution providing the debt
          </p>
          {errors.lender && (
            <p className="text-red-500 text-sm">{errors.lender.message}</p>
          )}
        </div>

        {/* Issue Date & Maturity Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="issueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Issue Date <span className="text-red-500">*</span>
            </label>{" "}
            <input
              type="date"
              {...register("issueDate")}
              id="issueDate"
              name="issueDate"
              className={`w-full text-gray-600 p-2 border rounded-md ${
                errors.maturityDate ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            />
            <p className="text-gray-600 text-[13px]">
              The date when the debt instrument is issued
            </p>
            {/* <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
            {errors.issueDate && (
              <p className="text-red-500 text-sm">{errors.issueDate.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="maturityDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Maturity Date <span className="text-red-500">*</span>
            </label>{" "}
            <input
              id="maturityDate"
              name="maturityDate"
              type="date"
              {...register("maturityDate")}
              className={`w-full p-2 text-gray-600 border rounded-md ${
                errors.maturityDate ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            />
            <p className="text-gray-600 text-[13px]">
              The date when the debt instrument matures
            </p>
            {/* <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
            {errors.maturityDate && (
              <p className="text-red-500 text-sm">
                {errors.maturityDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Currency (Dropdown) */}
        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Currency <span className="text-red-500">*</span>
          </label>{" "}
          <input
            {...register("currency")}
            list="currency"
            className="w-full p-2 border rounded"
            placeholder="Search currency..."
          />
          <datalist id="currency">
            <option value="US Dollar" />
            <option value="Euro" />
            <option value="British Pound" />
            <option value="Japanese Yen" />
            <option value="Swiss Franc" />
            <option value="Canadian Dollar" />
            <option value="Australian Dollar" />
            <option value="Rupee" />
          </datalist>
          <p className="text-gray-600 text-[13px]">
            The currency of the debt instrument
          </p>
          {errors.currency && (
            <p className="text-red-500 text-sm">{errors.currency.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default InstrumentBasics;
