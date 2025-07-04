import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useNetPresentValueCalculationForm } from '../hooks/form/useNetPresentValueCalculationForm';
import { NetPresentValueResultDisplay } from './NetPresentValueResultDisplay';

export const NetPresentValueCalculationForm: React.FC = () => {
  const {
    form,
    handleChange,
    handleSubmit,
    result,
    loading,
    error,
  } = useNetPresentValueCalculationForm();

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Net Present Value Calculator
        </Typography>

        <Grid container spacing={2}>
          {/* Cash Flows */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cash Flows (comma-separated)"
              variant="outlined"
              value={form.cashFlows}
              onChange={(e) => handleChange('cashFlows', e.target.value)}
              placeholder="100, 200, 300"
            />
          </Grid>

          {/* Discount Range Inputs */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Lower Bound Rate"
              variant="outlined"
              value={form.lower}
              onChange={(e) => handleChange('lower', e.target.value)}
              inputProps={{ step: '0.01' }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Upper Bound Rate"
              variant="outlined"
              value={form.upper}
              onChange={(e) => handleChange('upper', e.target.value)}
              inputProps={{ step: '0.01' }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Increment"
              variant="outlined"
              value={form.increment}
              onChange={(e) => handleChange('increment', e.target.value)}
              inputProps={{ step: '0.01' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Calculate NPV'}
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      <NetPresentValueResultDisplay results={result ?? []} />
    </Box>
  );
};


