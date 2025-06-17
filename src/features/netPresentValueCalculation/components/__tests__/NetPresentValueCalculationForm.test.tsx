import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NetPresentValueCalculationForm } from '../NetPresentValueCalculationForm';
import * as formHook from '../../hooks/form/useNetPresentValueCalculationForm';

jest.mock('../../hooks/form/useNetPresentValueCalculationForm');

describe('NetPresentValueCalculationForm', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  const defaultFormState = {
    form: {
      cashFlows: '',
      lower: 0.01,
      upper: 0.05,
      increment: 0.01,
    },
    handleChange: mockHandleChange,
    handleSubmit: mockHandleSubmit,
    result: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (formHook.useNetPresentValueCalculationForm as jest.Mock).mockReturnValue({ ...defaultFormState });
  });

  it('renders all form fields and the submit button', () => {
    render(<NetPresentValueCalculationForm />);

    expect(screen.getByLabelText(/cash flows/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lower bound rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upper bound rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/increment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate npv/i })).toBeInTheDocument();
  });

  it('calls handleChange when inputs are updated', () => {
    render(<NetPresentValueCalculationForm />);

    fireEvent.change(screen.getByLabelText(/cash flows/i), { target: { value: '100,200' } });
    expect(mockHandleChange).toHaveBeenCalledWith('cashFlows', '100,200');
  });

  it('calls handleSubmit when submit button is clicked', () => {
    render(<NetPresentValueCalculationForm />);
    fireEvent.click(screen.getByRole('button', { name: /calculate npv/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('disables submit button and shows spinner when loading', () => {
    (formHook.useNetPresentValueCalculationForm as jest.Mock).mockReturnValue({
      ...defaultFormState,
      loading: true,
    });

    render(<NetPresentValueCalculationForm />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when error is present', () => {
    (formHook.useNetPresentValueCalculationForm as jest.Mock).mockReturnValue({
      ...defaultFormState,
      error: 'Something went wrong',
    });

    render(<NetPresentValueCalculationForm />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('displays result cards when result data is returned', () => {
    (formHook.useNetPresentValueCalculationForm as jest.Mock).mockReturnValue({
      ...defaultFormState,
      result: [
        { rate: 0.01, npv: 1200.123 },
        { rate: 0.02, npv: 1150.456 },
      ],
    });

    render(<NetPresentValueCalculationForm />);

    expect(screen.getByText(/discount rate: 1.00%/i)).toBeInTheDocument();
    expect(screen.getByText(/npv: 1200.12/i)).toBeInTheDocument();
    expect(screen.getByText(/discount rate: 2.00%/i)).toBeInTheDocument();
    expect(screen.getByText(/npv: 1150.46/i)).toBeInTheDocument();
  });
});
