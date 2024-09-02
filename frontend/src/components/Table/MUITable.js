import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import { formatDate } from "../../util/dateUtil";

function MUITable({
  list,
  colNames,
  pageNum = 0,
  pageSize = 5,
  onSelect = null,
  onDelete = null,
}) {
  const [page, setPage] = useState(pageNum);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {colNames.map((headerItem, index) => (
                <TableCell key={index}>{headerItem.toUpperCase()}</TableCell>
              ))}
              {onDelete && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover onClick={() => onSelect(row)}>
                  {Object.values(row).map((value, index2) => (
                    <TableCell key={index2}> {typeof value === 'string' && Date.parse(value) ? formatDate(new Date(value)) : value}</TableCell>
                  ))}
                  {onDelete && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={list.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, { value: -1, label: 'All' }]}
      />
    </Paper>
  );
}

export default MUITable;
