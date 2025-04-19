import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Button,
} from "@mui/material";
import { MdAssignmentAdd } from "react-icons/md";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { userState } from "../../redux/auth/authSlice";

const styles = {
  tableHead: { backgroundColor: "#3B82F6" },
  tableHeadRow: (width) => ({
    color: "white",
    fontWeight: "bold",
    width,
    padding: "10px",
  }),
  tableRow: {
    padding: "10px",
  },
};

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  handleAssignTicket,
  admin,
}) => {
  const { user } = useSelector(userState);
  return (
    <Paper sx={{ width: "100%", margin: "auto", mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead sx={styles.tableHead}>
            <TableRow>
              {columns.map((col, ind) => (
                <TableCell key={ind} sx={styles.tableHeadRow(col.width)}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((col, ind) =>
                  col.field === "actions" ? (
                    <TableCell key={ind} sx={styles.tableRow}>
                      <IconButton
                        aria-label="view"
                        color="primary"
                        onClick={() => onView(row)}
                      >
                        <VisibilityIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="warning"
                        onClick={() => onEdit(row)}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => onDelete(row)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  ) : user.role === "admin" &&
                    col.field === "engName" &&
                    row[col.field] === "Not Assigned" ? (
                    <TableCell key={ind} sx={styles.tableRow}>
                      {admin ? (
                        "Not Assigned"
                      ) : (
                        <IconButton
                          color="primary"
                          onClick={() => handleAssignTicket(row)}
                        >
                          <MdAssignmentAdd />
                        </IconButton>
                      )}
                    </TableCell>
                  ) : (
                    <TableCell key={ind} sx={styles.tableRow}>
                      {row[col.field]}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      {/* <TablePagination
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      count={totalRows} // Total number of rows from backend
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}
    </Paper>
  );
};

export default DataTable;
