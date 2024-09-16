import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { formatDate } from "../../util/dateUtil";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import MuiForm from "../ticketForm/MuiForm";  // Ticket formu

const priorityStyles = {
  LOW: { color: 'green', fontWeight: 'medium' },
  MID: { color: 'blue', fontWeight: 'medium' },
  HIGH: { color: 'orange', fontWeight: 'medium' },
  EXTREME: { color: 'red', fontWeight: 'medium' }
};

const priorityOrder = {
  LOW: 1,
  MID: 2,
  HIGH: 3,
  EXTREME: 4
};

function MUITable({
  list,
  colNames,
  pageNum = 0,
  pageSize = 5,
  onDelete = null,
  onSubmitFromPage = null,
}) {
  const [page, setPage] = useState(pageNum);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleChangePage = (event, newPage) => { // sayfa değiştir
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => { // sayfada kaç row olacağını belirle
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (ticket) => { // editleme sayfasını aç
    setSelectedTicket(ticket);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedTicket(null);
  };

  const handleDeleteClick = (row) => { // silme onayını aç 
    setSelectedTicket(row);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => { // silme onayını kapa
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = () => {
    if (onDelete && selectedTicket) {
      onDelete(selectedTicket); // onDelete fonksiyonunu çağır
    }
    setOpenDeleteDialog(false); // Dialog'u kapat
    setSelectedTicket(null); // Seçilen ticket'ı temizle
  };

  const handleEditConfirm = (id, tSummary ,tPriority, tStatus ,createDate, updateDate) => {
    
    onSubmitFromPage(id, tSummary ,tPriority, tStatus ,createDate, updateDate);
    setOpenEditDialog(false);
  }

  //sort başlangıç

  const [sortDirection, setSortDirection] = useState(null); // null (varsayılan), 'asc' (artan), 'desc' (azalan)

  const sortList = () => {
    if (sortDirection === 'asc') {
      return [...list].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);  // Artan sıralama
    }
    if (sortDirection === 'desc') {
      return [...list].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);  // Azalan sıralama
    }
    return list; // Varsayılan: sıralama yok
  };

  const handlePriorityHeaderClick = () => {
    if (sortDirection === null) {
      setSortDirection('asc');  // İlk tıklama: artan
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');  // İkinci tıklama: azalan
    } else {
      setSortDirection(null);  // Üçüncü tıklama: varsayılan
    }
  };

  const renderSortIcon = () => {
    if (sortDirection === 'asc') {
      return <ArrowUpwardIcon />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDownwardIcon />;
    }
    return <UnfoldMoreIcon />;
  };


  //sort bitiş

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {colNames.map((headerItem, index) => (
                <TableCell key={index}>
                {headerItem.toUpperCase()}
                {headerItem === "Priority" && (
                    <IconButton  onClick={headerItem === "Priority" ? handlePriorityHeaderClick : undefined}>
                      {renderSortIcon()}
                    </IconButton>
                  )}
              </TableCell>
              ))}
              {onDelete && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortList()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, index2) => (
                    index2 === colNames.indexOf("Priority") ? (<TableCell key={index2} sx={priorityStyles[value]}> {value}</TableCell>) :
                    (<TableCell key={index2}> {typeof value === 'string' && Date.parse(value) ? formatDate(new Date(value)) : value}</TableCell>)
                  ))}
                  {onDelete && (
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(row);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                      <IconButton
                        color="info"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(row);  // Edit işlemi için dialog aç
                        }}
                      >
                        <EditIcon />
                      </IconButton>
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

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        {selectedTicket && (
          <MuiForm
            id={selectedTicket.id}
            summary={selectedTicket.summary}
            priority={selectedTicket.priority}
            status={selectedTicket.status}
            createDate={new Date(selectedTicket.create_date)}
            updateDate={new Date(selectedTicket.update_date)}
            readonly={false}
            onSubmit={(id, tSummary ,tPriority, tStatus ,createDate, updateDate) => {
              handleCloseEditDialog();
              handleEditConfirm(id, tSummary ,tPriority, tStatus ,createDate, updateDate);// formdan verilerim bu şekilde geliyor
            }}
            onClear={handleCloseEditDialog}
          />
        )}
      </Dialog>

      {/* bu kısımda silmek isterken yapılacak işlem penceresi tutuluyor yukarı kısımda use stateler ile kontrolleri sağlanıyor */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Uyarı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu ticket'ı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            İptal
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default MUITable;
