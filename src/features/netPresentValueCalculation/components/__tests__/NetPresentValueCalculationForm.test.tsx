import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NetPresentValueCalculationForm } from '../NetPresentValueCalculationForm';
import * as hook from '../../hooks/form/useNetPresentValueCalculationForm';

describe('NetPresentValueCalculationForm tests', () => {
  const setForm = vi.fn();
  const mockHandleChange = vi.fn();
  const mockHandleSubmit = vi.fn();

  const defaultHookReturn = {
    form: {
      cashFlows: '100,200',
      lower: 0.01,
      upper: 0.05,
      increment: 0.01,
    },
    setForm,
    handleChange: mockHandleChange,
    handleSubmit: mockHandleSubmit,
    result: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    vi.spyOn(hook, 'useNetPresentValueCalculationForm').mockReturnValue({ ...defaultHookReturn });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all input fields with initial values', () => {
    render(<NetPresentValueCalculationForm />);

    expect(screen.getByLabelText(/cash flows/i)).toHaveValue('100,200');
    expect(screen.getByLabelText(/lower bound/i)).toHaveValue(0.01);
    expect(screen.getByLabelText(/upper bound/i)).toHaveValue(0.05);
    expect(screen.getByLabelText(/increment/i)).toHaveValue(0.01);
  });

  it('calls handleChange on user input', () => {
    render(<NetPresentValueCalculationForm />);

    fireEvent.change(screen.getByLabelText(/cash flows/i), { target: { value: '300,400' } });
    expect(mockHandleChange).toHaveBeenCalledWith('cashFlows', '300,400');

    fireEvent.change(screen.getByLabelText(/lower bound/i), { target: { value: '0.02' } });
    expect(mockHandleChange).toHaveBeenCalledWith('lower', '0.02');
  });

  it('calls handleSubmit on button click', () => {
    render(<NetPresentValueCalculationForm />);

    fireEvent.click(screen.getByRole('button', { name: /calculate npv/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('displays loading spinner when loading is true', () => {
    vi.spyOn(hook, 'useNetPresentValueCalculationForm').mockReturnValue({
      ...defaultHookReturn,
      loading: true,
    });

    render(<NetPresentValueCalculationForm />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message if error is present', () => {
    vi.spyOn(hook, 'useNetPresentValueCalculationForm').mockReturnValue({
      ...defaultHookReturn,
      error: 'Something went wrong',
    });

    render(<NetPresentValueCalculationForm />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('displays results when available', () => {
    const results = [
      { discountRate: 0.01, netPresentValue: 123.45 },
      { discountRate: 0.02, netPresentValue: 110.5 },
    ];

    vi.spyOn(hook, 'useNetPresentValueCalculationForm').mockReturnValue({
      ...defaultHookReturn,
      result: results,
    });

    render(<NetPresentValueCalculationForm />);

    expect(screen.getByText(/calculation results/i)).toBeInTheDocument();
    expect(screen.getByText('1.00%')).toBeInTheDocument();
    expect(screen.getByText('123.45')).toBeInTheDocument();
    expect(screen.getByText('2.00%')).toBeInTheDocument();
    expect(screen.getByText('110.50')).toBeInTheDocument();
  });
});
