import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NetPresentValueCalculator from '../NetPresentValueCalculator';
import * as formModule from '../../components/NetPresentValueCalculationForm';

describe('NetPresentValueCalculator page', () => {
  beforeEach(() => {
    vi.spyOn(formModule, 'NetPresentValueCalculationForm').mockImplementation(() => (
      <div data-testid="mock-npv-form">Mocked NPV Form</div>
    ));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the NPV form inside the layout', () => {
    render(<NetPresentValueCalculator />);

    expect(screen.getByTestId('mock-npv-form')).toBeInTheDocument();

    const container = screen.getByText(/Mocked NPV Form/i).closest('div');
    expect(container).not.toBeNull();
  });

  it('renders CssBaseline and structured layout', () => {
    const { container } = render(<NetPresentValueCalculator />);

    expect(container.firstChild).toHaveStyle('display: flex');
    expect(container.firstChild).toHaveStyle('flex-direction: column');
  });
});
