import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNetPresentValueCalculationForm } from '../useNetPresentValueCalculationForm';
import * as serviceHook from '../../service/useNetPresentValueCalculation';
import type { NetPresentValueCalculationResultModel } from '../../../models/NetPresentValueCalculationResultModel';

const mockResults: NetPresentValueCalculationResultModel[] = [
  { discountRate: 0.01, netPresentValue: 250 },
  { discountRate: 0.02, netPresentValue: 245 },
];

describe('useNetPresentValueCalculationForm tests', () => {
  const mockCalculate = vi.fn();

  beforeEach(() => {
    vi.spyOn(serviceHook, 'useNetPresentValueCalculation').mockReturnValue({
      calculate: mockCalculate,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default form values', () => {
    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    expect(result.current.form).toEqual({
      cashFlows: '',
      lower: 0.01,
      upper: 0.05,
      increment: 0.01,
    });

    expect(result.current.result).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('updates form state with handleChange', () => {
    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    act(() => {
      result.current.handleChange('cashFlows', '100,200');
      result.current.handleChange('lower', '0.02');
    });

    expect(result.current.form.cashFlows).toBe('100,200');
    expect(result.current.form.lower).toBe(0.02);
  });

  it('submits data and stores result on success', async () => {
    mockCalculate.mockResolvedValueOnce(mockResults);

    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    act(() => {
      result.current.setForm({
        cashFlows: '100, 200, 300',
        lower: 0.01,
        upper: 0.03,
        increment: 0.01,
      });
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockCalculate).toHaveBeenCalledWith({
      cashFlows: [100, 200, 300],
      discountRate: { lower: 0.01, upper: 0.03, increment: 0.01 },
    });

    expect(result.current.result).toEqual(mockResults);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error state when calculation throws', async () => {
    mockCalculate.mockRejectedValueOnce(new Error('Calculation failed'));

    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    act(() => {
      result.current.setForm({
        cashFlows: 'invalid, 100',
        lower: 0.01,
        upper: 0.03,
        increment: 0.01,
      });
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.error).toBe('Calculation failed');
    expect(result.current.loading).toBe(false);
    expect(result.current.result).toBeNull();
  });

  it('filters out invalid cashflow entries', async () => {
    mockCalculate.mockResolvedValueOnce(mockResults);

    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    act(() => {
      result.current.setForm({
        cashFlows: '100, abc, 300, , 400.5',
        lower: 0.01,
        upper: 0.02,
        increment: 0.01,
      });
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockCalculate).toHaveBeenCalledWith({
      cashFlows: [100, 300, 400.5],
      discountRate: { lower: 0.01, upper: 0.02, increment: 0.01 },
    });
  });
});
