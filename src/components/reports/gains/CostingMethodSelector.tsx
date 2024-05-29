import { Dispatch, SetStateAction } from "react";
import { CostingMethod } from "@/services/reports/gains";


interface Props {
  selectedMethod: CostingMethod;
  setSelectedMethod: Dispatch<SetStateAction<CostingMethod>>;
}

export const CostingMethodSelector = ({ selectedMethod, setSelectedMethod }: Props): JSX.Element => {
  return (
    <div className="flex items-center space-x-2 mx-6">
      <span>Costing method:</span>
      {Object.values(CostingMethod).map((method) => (
        <div key={method}>
          <input
            type="radio"
            name="method"
            id={method}
            value={method}
            checked={selectedMethod === method}
            onChange={(): void => setSelectedMethod(method)}
          />
          <label htmlFor={method}>{method.toUpperCase()}</label>
        </div>
      ))}
    </div>
  )
};
