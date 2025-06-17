import { renderHook, act } from '@testing-library/react';
import { useNetPresentValueCalculationForm } from '../useNetPresentValueCalculationForm';

jest.mock('../../service/useNetPresentValueCalculation');

describe('useNetPresentValueCalculationForm', () => {
  const mockResult = [
    { rate: 0.01, npv: 250 },
    { rate: 0.02, npv: 240 },
  ];

  const mockCalculate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (serviceHook.useNetPresentValueCalculation as jest.Mock).mockReturnValue({
      calculate: mockCalculate,
    });
  });

  it('should initialize with default form values', () => {
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

  it('should update form fields using handleChange', () => {
    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    act(() => {
      result.current.handleChange('cashFlows', '100,200,300');
      result.current.handleChange('lower', '0.02');
      result.current.handleChange('upper', '0.06');
      result.current.handleChange('increment', '0.01');
    });

    expect(result.current.form).toEqual({
      cashFlows: '100,200,300',
      lower: 0.02,
      upper: 0.06,
      increment: 0.01,
    });
  });

  it('should submit the form and update result on success', async () => {
    mockCalculate.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    act(() => {
      result.current.handleChange('cashFlows', '100,200,300');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockCalculate).toHaveBeenCalledWith({
      cashFlows: [100, 200, 300],
      discountRateRange: {
        lower: 0.01,
        upper: 0.05,
        increment: 0.01,
      },
    });

    expect(result.current.result).toEqual(mockResult);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should set error on failed submission', async () => {
    mockCalculate.mockRejectedValue(new Error('API failure'));

    const { result } = renderHook(() => useNetPresentValueCalculationForm());

    act(() => {
      result.current.handleChange('cashFlows', '100,200,300');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBe('API failure');
    expect(result.current.loading).toBe(false);
  });
});
