import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    Button,
} from "@mui/material";

const DynamicTable = ({
    url = null,
    data = null,
    headers,
    allowFilters = true,
    advancedQuery = {},
}) => {
    const [tableData, setTableData] = useState(data || []);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!data && url) {
            fetchData();
        } else if (data) {
            setTableData(data);
        }
    }, [data, url, filters, page, rowsPerPage, advancedQuery]);

    // Fetch data from the URL if no data is passed
    const fetchData = async () => {
        try {
            setLoading(true);
            const params = {
                ...filters,
                page: page + 1,
                pageSize: rowsPerPage,
                ...advancedQuery,
            };
            const response = await fetch(url + "?" + new URLSearchParams(params));
            const result = await response.json();
            setTableData(result.results || result);
        } catch (error) {
            console.error("Error fetching table data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle filter changes
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(0);
    };

    // Paginate the data when data is provided directly
    const paginatedData = () => {
        if (!url && data) {
            const startIndex = page * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            return tableData.slice(startIndex, endIndex);
        }
        return tableData;
    };

    return (
        <div>
            {allowFilters && (
                <div style={{ marginBottom: "16px" }}>
                    {headers.map(
                        (header) =>
                            header.filterable && (
                                <TextField
                                    key={header.key}
                                    label={`Filter by ${header.label}`}
                                    variant="outlined"
                                    size="small"
                                    style={{ marginRight: "8px" }}
                                    onChange={(e) =>
                                        handleFilterChange(header.key, e.target.value)
                                    }
                                />
                            )
                    )}
                    {!data && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => fetchData()}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Apply Filters"}
                        </Button>
                    )}
                </div>
            )}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell key={header.key}>{header.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData().map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {headers.map((header) => (
                                    <TableCell key={header.key}>
                                        {header.render
                                            ? header.render(row[header.key], row)
                                            : row[header.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data ? data.length : tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default DynamicTable;
