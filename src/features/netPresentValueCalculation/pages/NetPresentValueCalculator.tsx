import { NetPresentValueCalculationForm } from "../components/NetPresentValueCalculationForm";
import {
  Box,
  Container,
  CssBaseline,
  Paper,
} from '@mui/material';

const NetPresentValueCalculator = () => {

  return (
 <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          py: 4,
          px: 2,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Container maxWidth="md">
          <NetPresentValueCalculationForm />
        </Container>
      </Paper>
    </Box>
  );
};

export default NetPresentValueCalculator;


