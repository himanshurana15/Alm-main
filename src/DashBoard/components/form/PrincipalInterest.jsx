// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
 
} from "../../../redux/Form/debtInstrumentSlice.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  principalAmount: yup
    .number()
    .typeError("Principal Amount must be a number")
    .positive("Must be a positive value")
    .required("Principal Amount is required"),
  interestRateType: yup.string().required("Interest Rate Type is required"),
  interestRate: yup
    .number()
    .typeError("Interest Rate must be a number")
    .positive("Must be a positive value")
    .required("Interest Rate is required"),
  interestRateBasis: yup.string().when("interestRateType", {
    is: "Floating",
    then: (schema) => schema.required("Interest Rate Basis is required"),
  }),
  interestPaymentFrequency: yup
    .string()
    .required("Payment Frequency is required"),
  dayCountConvention: yup.string().required("Day Count Convention is required"),
  firstInterestPaymentDate: yup
    .date()
    .required("First Payment Date is required"),
});

const PrincipalInterest = () => {
  const dispatch = useDispatch();
  const { principalInterest } = useSelector((state) => state.debtInstrument);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: principalInterest,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(updateFormData(data));
  };

  const interestRateType = watch("interestRateType");

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        Principal & Interest
      </h2>
      <p className="text-gray-600">
        Enter details about the principal amount and interest terms.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Principal Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Principal Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("principalAmount")}
            className={`w-full text-gray-600 p-2 border rounded-md ${
              errors.principalAmount ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="$ 0.00"
          />
          <p className="text-gray-600 text-[13px]">
            The initial amount of the debt{" "}
          </p>
          {errors.principalAmount && (
            <p className="mt-1 text-sm text-red-500">
              {errors.principalAmount.message}
            </p>
          )}
        </div>

        {/* Interest Rate Type */}
        <div className="flex items-center gap-4">
          {/* Interest Rate Type */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("interestRateType")}
              className="w-full text-gray-600 p-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="Fixed">Fixed Rate</option>
              <option value="Floating">Floating Rate</option>
            </select>
            <p className="text-gray-600 text-[13px]">
              Determines if the interest rate is fixed or variable
            </p>

            {errors.interestRateType && (
              <p className="text-red-500 text-sm">
                {errors.interestRateType.message}
              </p>
            )}
          </div>

          {/* In  terest Rate */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("interestRate")}
              className={`w-full p-2 text-gray-600 border rounded-md ${
                errors.interestRate ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter interest rate"
            />
            <p className="text-gray-600 text-[13px]">
              The annual interest rate to be applied
            </p>

            {errors.interestRate && (
              <p className="text-red-500 text-sm">
                {errors.interestRate.message}
              </p>
            )}
          </div>
        </div>

        {/* Interest Rate Basis (Conditional) */}
        {interestRateType === "Floating" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate Basis <span className="text-red-500">*</span>
            </label>
            <select
              {...register("interestRateBasis")}
              className="w-full text-gray-600 p-2 border rounded"
            >
              <option value="">Select Basis</option>
              <option value="LIBOR">LIBOR</option>
              <option value="SOFR">SOFR</option>
              <option value="EURIBOR">EURIBOR</option>
            </select>
            <p className="text-gray-600 text-[13px]">
              The annual interest rate to be applied{" "}
            </p>

            {errors.interestRateBasis && (
              <p className="text-red-500 text-sm">
                {errors.interestRateBasis.message}
              </p>
            )}
          </div>
        )}

        {/* Interest Payment Frequency */}
        <div className="flex items-center gap-4">
          {/* Interest Payment Frequency */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Payment Frequency <span className="text-red-500">*</span>
            </label>
            <select
              {...register("interestPaymentFrequency")}
              className="w-full p-2 text-gray-600 border rounded"
            >
              <option value="">Select Frequency</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Semi-Annually">Semi-Annually</option>
              <option value="Annually">Annually</option>
              <option value="At Maturity">At-Maturity</option>
            </select>
            <p className="text-gray-600 text-[13px]">
              How often interest payments are made
            </p>
            {errors.interestPaymentFrequency && (
              <p className="text-red-500 text-sm">
                {errors.interestPaymentFrequency.message}
              </p>
            )}
          </div>

          {/* Day Count Convention */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Day Count Convention <span className="text-red-500">*</span>
            </label>
            <select
              {...register("dayCountConvention")}
              className="w-full p-2 text-gray-600 border rounded"
            >
              <option value="">Select Convention</option>
              <option value="Actual/360">Actual/360</option>
              <option value="Actual/365">Actual/365</option>
              <option value="30/360">30/360</option>
              <option value="30/360">Actual/Actual</option>
            </select>
            <p className="text-gray-600 text-[13px]">
              Method used to calculate interest accrual
            </p>
            {errors.dayCountConvention && (
              <p className="text-red-500 text-sm">
                {errors.dayCountConvention.message}
              </p>
            )}
          </div>
        </div>

        {/* First Interest Payment Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Interest Payment Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("firstInterestPaymentDate")}
            className={`w-full p-2 border text-gray-600 rounded-md ${
              errors.firstInterestPaymentDate
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <p className="text-gray-600 text-[13px]">
            The date of the first interest payment
          </p>

          {errors.firstInterestPaymentDate && (
            <p className="text-red-500 text-sm">
              {errors.firstInterestPaymentDate.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PrincipalInterest;
