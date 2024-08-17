import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import Paper from '@mui/material/Paper';


const TableComponent = ({title, rows, tableName}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const headers = () => {
        switch (tableName) {
            case "sekolah" :
                return [
                    { id: 'nama', label: 'Nama', minWidth: 170 },
                    { id: 'alamat', label: 'Alamat', minWidth: 100 },
                ];
                break;
            case "pengguna" :
                return [
                    { id: 'nama', label: 'Nama', minWidth: 170 },
                    { id: 'alamat', label: 'Alamat', minWidth: 100 },
                    { id: 'kategori', label: 'Kategori', minWidth: 100 },
                ];
                break;
            default:
                return [
                    { id: 'nama', label: 'Nama', minWidth: 170 },
                    { id: 'alamat', label: 'Alamat Pengguna', minWidth: 100 },
                    { id: 'kategori', label: 'Kategori', minWidth: 100 },
                    { id: 'namaSekolah', label: 'Nama Sekolah', minWidth: 100 }
                ];
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = headers()
    return (
        <div>
            <h2>{title}</h2>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    );
};

export default TableComponent;