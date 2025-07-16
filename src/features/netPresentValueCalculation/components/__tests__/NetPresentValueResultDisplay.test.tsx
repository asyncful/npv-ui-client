import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NetPresentValueResultDisplay } from '../NetPresentValueResultDisplay';
import type { NetPresentValueCalculationResultModel } from '../../models/NetPresentValueCalculationResultModel';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

vi.mock('../NetPresentValueResultTableView', () => ({
  NetPresentValueResultTableView: () => <div data-testid="table-view">Table View</div>,
}));

vi.mock('../NetPresentValueResultChartView', () => ({
  NetPresentValueResultChartView: () => <div data-testid="chart-view">Chart View</div>,
}));

describe('NetPresentValueResultDisplay', () => {
  const mockResults: NetPresentValueCalculationResultModel[] = [
    { discountRate: 0.01, netPresentValue: 1200 },
    { discountRate: 0.02, netPresentValue: 1100 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when results are empty', () => {
    const { container } = render(<NetPresentValueResultDisplay results={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title and default table view', () => {
    render(<NetPresentValueResultDisplay results={mockResults} />);

    expect(screen.getByText(/calculation results/i)).toBeInTheDocument();
    expect(screen.getByTestId('table-view')).toBeInTheDocument();
    expect(screen.queryByTestId('chart-view')).not.toBeInTheDocument();
  });

  it('switches to chart view when toggle is clicked', () => {
    render(<NetPresentValueResultDisplay results={mockResults} />);

    const chartToggle = screen.getByRole('button', { name: /charts/i });
    fireEvent.click(chartToggle);

    expect(screen.getByTestId('chart-view')).toBeInTheDocument();
    expect(screen.queryByTestId('table-view')).not.toBeInTheDocument();
  });

  it('switches back to table view after chart view', () => {
    render(<NetPresentValueResultDisplay results={mockResults} />);

    const chartToggle = screen.getByRole('button', { name: /charts/i });
    fireEvent.click(chartToggle);

    const tableToggle = screen.getByRole('button', { name: /table/i });
    fireEvent.click(tableToggle);

    expect(screen.getByTestId('table-view')).toBeInTheDocument();
  });
});
