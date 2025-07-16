import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { NetPresentValueResultChartView } from '../NetPresentValueResultChartView';
import type { NetPresentValueCalculationResultModel } from '../../models/NetPresentValueCalculationResultModel';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('NetPresentValueResultChartView', () => {
  const mockResults: NetPresentValueCalculationResultModel[] = [
    { discountRate: 0.01, netPresentValue: 1200 },
    { discountRate: 0.02, netPresentValue: 1150 },
    { discountRate: 0.03, netPresentValue: 1100 },
  ];

  it('renders chart titles correctly', () => {
    render(<NetPresentValueResultChartView results={mockResults} />);
    expect(screen.getByText(/NPV vs Discount Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/% Change in NPV between Discount Steps/i)).toBeInTheDocument();
  });

    it('renders both chart containers (two Paper blocks)', () => {
    const { container } = render(<NetPresentValueResultChartView results={mockResults} />);
    const papers = container.querySelectorAll('.MuiPaper-root');
    expect(papers.length).toBe(2);
    });

    it('renders both chart containers with titles', () => {
    render(<NetPresentValueResultChartView results={mockResults} />);

    expect(screen.getByText('NPV vs Discount Rate')).toBeInTheDocument();
    expect(screen.getByText('% Change in NPV between Discount Steps')).toBeInTheDocument();

    expect(document.querySelectorAll('.recharts-responsive-container').length).toBe(2);
    });

  it('does not crash on empty result array', () => {
    const { container } = render(<NetPresentValueResultChartView results={[]} />);
    expect(container.querySelectorAll('.recharts-responsive-container').length).toBe(2);
  });
});
