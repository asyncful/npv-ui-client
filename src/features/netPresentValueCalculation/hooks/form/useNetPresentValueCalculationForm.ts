import { useState } from 'react';
import { useNetPresentValueCalculation } from '../service/useNetPresentValueCalculation';
import type { NetPresentValueCalculationResultModel } from '../../models/NetPresentValueCalculationResultModel';
import type { NetPresentValueCalculationModel } from '../../models/NetPresentValueCalculationModel';

type FormState = {
  cashFlows: string; // comma-separated string from input field
  lower: number;
  upper: number;
  increment: number;
};

export const useNetPresentValueCalculationForm = () => {
  const { calculate } = useNetPresentValueCalculation();

  const [form, setForm] = useState<FormState>({
    cashFlows: '',
    lower: 0.01,
    upper: 0.05,
    increment: 0.01,
  });

  const [result, setResult] = useState<NetPresentValueCalculationResultModel[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: typeof value === 'string' && field !== 'cashFlows' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const cashFlowsArray = form.cashFlows
        .split(',')
        .map((val) => parseFloat(val.trim()))
        .filter((val) => !isNaN(val));

      const model: NetPresentValueCalculationModel = {
        cashFlows: cashFlowsArray,
        discountRate: {
          lower: form.lower,
          upper: form.upper,
          increment: form.increment,
        },
      };

      const resultData = await calculate(model);
      setResult(resultData);
    } catch (err: any) {
      setError(err.message ?? 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    result,
    loading,
    error,
  };
};
