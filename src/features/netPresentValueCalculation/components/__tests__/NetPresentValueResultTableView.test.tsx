import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NetPresentValueResultTableView } from '../NetPresentValueResultTableView';
import type { NetPresentValueCalculationResultModel } from '../../models/NetPresentValueCalculationResultModel';

describe('NetPresentValueResultTableView tests', () => {
  const mockResults: NetPresentValueCalculationResultModel[] = Array.from({ length: 30 }, (_, i) => ({
    discountRate: 0.01 + i * 0.01,
    netPresentValue: 1200 - i * 10,
  }));

  it('renders the table headers correctly', () => {
    render(<NetPresentValueResultTableView results={mockResults} />);
    expect(screen.getByText(/Discount Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Net Present Value/i)).toBeInTheDocument();
  });

  it('renders 25 rows on the first page (default)', () => {
    render(<NetPresentValueResultTableView results={mockResults} />);
    const dataRows = screen.getAllByRole('row').slice(1);
    expect(dataRows.length).toBe(25);
  });

  it('renders remaining rows when navigating to second page', () => {
    render(<NetPresentValueResultTableView results={mockResults} />);

    fireEvent.click(screen.getByLabelText('Go to next page'));

    const dataRows = screen.getAllByRole('row').slice(1);
    expect(dataRows.length).toBe(5); // 30 total - 25 on first page
  });

  it('shows formatted values on first row', () => {
    render(<NetPresentValueResultTableView results={mockResults} />);
    expect(screen.getByText('1.00%')).toBeInTheDocument();
    expect(screen.getByText('1200.00')).toBeInTheDocument();
  });

  it('renders no rows when results is empty', () => {
    render(<NetPresentValueResultTableView results={[]} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1);
  });

  it('does not offer 5 rows per page as an option', () => {
    render(<NetPresentValueResultTableView results={mockResults} />);
    const rowsPerPageSelector = screen.getByLabelText(/rows per page/i);
    fireEvent.mouseDown(rowsPerPageSelector); 

    const options = screen.queryAllByRole('option').map((opt) => opt.textContent);
    expect(options).not.toContain('5');
    expect(options).toContain('10');
    expect(options).toContain('25');
  });
});
