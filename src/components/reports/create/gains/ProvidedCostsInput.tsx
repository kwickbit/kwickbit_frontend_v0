import { useState } from "react";
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { type CreateGainsReportAPIProps, CostingMethod } from "@/services/reports/gains";


interface Props {
  errors: FieldErrors<CreateGainsReportAPIProps>;
  getValues: UseFormGetValues<CreateGainsReportAPIProps>;
  index: number;
  register: UseFormRegister<CreateGainsReportAPIProps>;
  setValue: UseFormSetValue<CreateGainsReportAPIProps>;
  watch: UseFormWatch<CreateGainsReportAPIProps>;
}

export const ProvidedCostsInput = ({
  errors,
  getValues,
  index,
  register,
  setValue,
  watch,
}: Props): JSX.Element => {
  const isNative = watch(`providedCosts.${index}.asset.isNative`);
  const [previousCode, setPreviousCode] = useState("");
  const [previousIssuer, setPreviousIssuer] = useState("");

  const handleNativeToggle = (): void => {
    if (!isNative) {
      setPreviousCode(watch(`providedCosts.${index}.asset.assetMetadata.code`));
      setPreviousIssuer(watch(`providedCosts.${index}.asset.assetMetadata.issuer`));
    }

    const costItem = getValues(`providedCosts.${index}`);

    setValue(`providedCosts.${index}`, {
      ...costItem,
      asset: {
        ...costItem.asset,
        assetType: isNative ? "stablecoin" : "native",
        assetMetadata: {
          code: isNative ? previousCode : "XLM",
          issuer: isNative ? previousIssuer : "Stellar",
        }
      }
    });
  };

  const assetErrors = errors.providedCosts?.[index];
  const assetCode = watch(`providedCosts.${index}.asset.assetMetadata.code`);

  return (
    <>
      <div className="col-span-3">
        <label htmlFor={`xlm-${index}`} className="block">
          <input
            type="checkbox"
            id={`isNative-${index}`}
            checked={isNative}
            disabled={!isNative && watch('providedCosts').some(cost => cost.asset.isNative)}
            {...register(`providedCosts.${index}.asset.isNative`, { onChange: handleNativeToggle })}
          />
          {' '}Is Native Asset
        </label>
      </div>
      <div className="col-span-3">
        <label htmlFor={`code-${index}`} className="block">Asset Code</label>
        <input
          className="w-full border-2 rounded-md p-2"
          id={`code-${index}`}
          disabled={isNative}
          defaultValue={isNative ? "XLM" : previousCode}
          {...register(`providedCosts.${index}.asset.assetMetadata.code`)}
        />
      </div>
      <div className="col-span-3">
        <label htmlFor={`issuer-${index}`} className="block">Asset Issuer</label>
        <input
          className="w-full border-2 rounded-md p-2"
          id={`issuer-${index}`}
          disabled={isNative}
          defaultValue={isNative ? "Stellar" : previousIssuer}
          {...register(`providedCosts.${index}.asset.assetMetadata.issuer`)}
        />
      </div>
      <div className="col-span-3">
        <label htmlFor={`tokenBalance-${index}`} className="block">
          Token balance
        </label>
        <input
          className="w-full border-2 rounded-md p-2"
          type="number"
          step="0.00000001"
          id={`tokenBalance-${index}`}
          {...register(
            `providedCosts.${index}.tokenBalance`,
            { validate: x => x >= 0, valueAsNumber: true, required: true }
          )}
        />
      </div>
      {Object.values(CostingMethod).map((method) => (
        <div key={method} className="col-span-2">
          <label htmlFor={`${method}-${index}`} className="block mb-2">{method.toUpperCase()} costs</label>
          <input
            className="w-full border-2 rounded-md p-2"
            type="number"
            step="0.0001"
            id={`${method}-${index}`}
            {...register(
              `providedCosts.${index}.${(method as CostingMethod)}` as const,
              { validate: x => x >= 0, valueAsNumber: true, required: true }
            )}
          />
        </div>
      ))}
      {(assetErrors?.tokenBalance || assetErrors?.fifo || assetErrors?.lifo || assetErrors?.hifo) && (
        <p role="alert" className="col-span-6 text-red-500 text-sm">
          Token balance and costs for asset {assetCode} must be greater than zero.
        </p>
      )}
    </>
  );
};
