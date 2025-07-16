import React from 'react';
import {
  Paper,
  Typography,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from 'recharts';
import type { NetPresentValueCalculationResultModel } from '../models/NetPresentValueCalculationResultModel';

interface Props {
  results: NetPresentValueCalculationResultModel[];
}

export const NetPresentValueResultChartView: React.FC<Props> = ({ results }) => {
  const chartData = results.map((r, idx) => ({
    discountRateLabel: (r.discountRate * 100).toFixed(2) + '%',
    discountRate: r.discountRate,
    npv: r.netPresentValue,
    npvChangePct:
      idx === 0
        ? 0
        : ((r.netPresentValue - results[idx - 1].netPresentValue) /
            Math.abs(results[idx - 1].netPresentValue || 1)) *
          100,
  }));

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, mb: 3, height: 440 }}>
        <Typography variant="subtitle1" gutterBottom>
          NPV vs Discount Rate
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, bottom: 60, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="discountRateLabel">
              <Label value="Discount Rate (%)" offset={-25} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label
                value="Net Present Value"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip formatter={(value: number) => value.toFixed(2)} />
            <Line type="monotone" dataKey="npv" stroke="#1976d2" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, height: 440 }}>
        <Typography variant="subtitle1" gutterBottom>
          % Change in NPV between Discount Steps
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, bottom: 60, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="discountRateLabel">
              <Label value="Discount Rate (%)" offset={-25} position="insideBottom" />
            </XAxis>
            <YAxis domain={['auto', 'auto']}>
              <Label
                value="% Change"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
            <Line type="monotone" dataKey="npvChangePct" stroke="#d32f2f" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};
