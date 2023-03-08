import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { TableHeadCell } from "../../Models/DataTable";
import { DBConnector } from "../../../Connectors/MainDBConnector";
import { Option } from "../../Models/Option";
import ThreeDotsDropdown from "./ThreeDotsDropdown";

export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

type Order = "asc" | "desc";

const EnhancedHead: React.FC<{ headCells: TableHeadCell[] }> = ({
  headCells,
}) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.name}
            padding={
              headCell.name == "id"
                ? "checkbox"
                : headCell.disablePadding
                ? "none"
                : "normal"
            }
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar: React.FC<{ tableName: string }> = ({
  tableName,
}) => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableName}
      </Typography>
    </Toolbar>
  );
};

const TableComponent: React.FC<{
  headCells: TableHeadCell[];
  dataUrl: string;
  queryParams?: string;
  tableName: string;
  searchValue: string | null;
  onActionButtonClickList?: Option[];
  reload?: number;
}> = ({
  headCells,
  dataUrl,
  tableName,
  reload = 0,
  searchValue,
  onActionButtonClickList,
}) => {
  const [rows, setRows] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalRowsCount, setTotalRowsCount] = React.useState(0);

  const queryString = React.useMemo(() => {
    //I will return here later when we define backend pagination -- Zvonimir task
    let query = `?limit=${rowsPerPage}&page=${page + 1}`;
    if (searchValue) {
      query += `&search=${searchValue}`;
    }
    return query;
  }, [page, rowsPerPage, searchValue]);

  React.useEffect(() => {
    DBConnector.get(dataUrl + queryString)
      .then(({ data }) => {
        setRows(data.data);
        if (totalRowsCount === 0) setTotalRowsCount(data.pagination.total);
      })
      .catch(console.error);
  }, [dataUrl, queryString, reload]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar tableName={tableName} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedHead headCells={headCells} />
            <TableBody>
              {rows.map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {headCells.map((cell: TableHeadCell) => {
                      return (
                        <TableCell
                          key={`${cell.name}-${index}`}
                          padding={cell.name == "id" ? "checkbox" : "normal"}
                        >
                          {cell.formatter
                            ? cell.formatter(row[cell.name]) || (cell.optional && cell.optional(row))
                            : row[cell.name]}
                        </TableCell>
                      );
                    })}
                    {onActionButtonClickList && (
                      <TableCell key={`${"button"}-${index}`} padding="normal">
                        <ThreeDotsDropdown
                          id={row["id"]}
                          values={row}
                          options={onActionButtonClickList}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TableComponent;
