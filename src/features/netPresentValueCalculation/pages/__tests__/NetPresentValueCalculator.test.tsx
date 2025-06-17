import { render, screen } from '@testing-library/react';
import NetPresentValueCalculator from '../NetPresentValueCalculator';

jest.mock('../../components/NetPresentValueCalculationForm', () => ({
  NetPresentValueCalculationForm: jest.fn(() => <div data-testid="mock-form">Mock Form</div>),
}));

describe('NetPresentValueCalculator Page', () => {
  it('renders the layout with CssBaseline, Paper, and the form', () => {
    render(<NetPresentValueCalculator />);

    // Check that the form is rendered
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();

    // Check that the page has the layout components
    const paper = screen.getByRole('presentation'); // Paper renders as 'presentation'
    expect(paper).toBeInTheDocument();
  });
});
