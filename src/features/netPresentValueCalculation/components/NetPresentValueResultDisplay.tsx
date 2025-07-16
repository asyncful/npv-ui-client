import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import type { NetPresentValueCalculationResultModel } from '../models/NetPresentValueCalculationResultModel';
import { NetPresentValueResultTableView } from './NetPresentValueResultTableView';
import { NetPresentValueResultChartView } from './NetPresentValueResultChartView';

interface Props {
  results: NetPresentValueCalculationResultModel[];
}

export const NetPresentValueResultDisplay: React.FC<Props> = ({ results }) => {
  const [view, setView] = useState<'table' | 'chart'>('table');

  if (!results || results.length === 0) return null;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Calculation Results</Typography>
        <Paper elevation={1} sx={{ p: 0.5 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, val) => val && setView(val)}
            size="small"
          >
            <ToggleButton value="table">Table</ToggleButton>
            <ToggleButton value="chart">Charts</ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>

      {view === 'table' ? (
        <NetPresentValueResultTableView results={results} />
      ) : (
        <NetPresentValueResultChartView results={results} />
      )}
    </Box>
  );
};
