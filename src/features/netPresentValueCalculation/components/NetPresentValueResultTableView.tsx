import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import type { NetPresentValueCalculationResultModel } from '../models/NetPresentValueCalculationResultModel';

interface Props {
  results: NetPresentValueCalculationResultModel[];
}

export const NetPresentValueResultTableView: React.FC<Props> = ({ results }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedResults = results.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table aria-label="npv results table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Discount Rate</strong></TableCell>
              <TableCell align="right"><strong>Net Present Value</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResults.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: (page * rowsPerPage + idx) % 2 === 0
                    ? 'background.default'
                    : 'action.hover',
                }}
              >
                <TableCell>{(item.discountRate * 100).toFixed(2)}%</TableCell>
                <TableCell align="right">{item.netPresentValue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={results.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  );
};
