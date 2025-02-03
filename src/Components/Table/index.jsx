import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const DynamicTable = ({
    url = null,
    data = null,
    headers,
    allowFilters = true,
    advancedQuery = {},
    AdvanceSearchComponent = null,
}) => {
    const [tableData, setTableData] = useState(data || []);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (!data && url) {
            fetchData();
        } else if (data) {
            setTableData(data);
        }
    }, [data, url, filters, page, rowsPerPage, advancedQuery]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = { ...filters, page: page + 1, pageSize: rowsPerPage, ...advancedQuery };
            const response = await fetch(url + "?" + new URLSearchParams(params));
            const result = await response.json();
            setTableData(result.results || result);
        } catch (error) {
            console.error("Error fetching table data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(0);
    };

    const paginatedData = () => (!url && data ? tableData.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : tableData);

    return (
        <div style={{ width: "100%", padding: "16px" }}>
            {AdvanceSearchComponent && <div style={{ marginBottom: "16px" }}>{AdvanceSearchComponent}</div>}
            {allowFilters && (
                <div style={{ marginBottom: "12px" }}>
                    {headers.map(
                        (header) =>
                            header.filterable && (
                                <input
                                    key={header.key}
                                    type="text"
                                    placeholder={`Filter by ${header.label}`}
                                    onChange={(e) => handleFilterChange(header.key, e.target.value)}
                                    style={{ padding: "8px", marginRight: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                                />
                            )
                    )}
                    {!data && (
                        <button onClick={fetchData} disabled={loading} style={{ padding: "8px 12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            {loading ? "Loading..." : "Apply Filters"}
                        </button>
                    )}
                </div>
            )}

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: theme.palette.background.paper }}>
                    <thead>
                        <tr style={{ backgroundColor: theme.palette.mode === "dark" ? "#444" : "#007bff", color: "white" }}>
                            {headers.map((header) => (
                                <th key={header.key} style={{ padding: "5px", border: "1px solid #ddd", textAlign: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                        {header.icon && React.createElement(header.icon, { sx: { fontSize: '20px' } })}
                                        {header.label}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData().map((row, rowIndex) => (
                            <tr key={rowIndex} style={{ borderBottom: "1px solid #ddd" }}>
                                {headers.map((header) => (
                                    <td key={header.key} style={{ padding: "5px", border: "1px solid #ddd", textAlign: "center" }}>
                                        {header.type === "button" ? (
                                            <Button variant="contained" color="primary" size="small" startIcon={header.icon && React.createElement(header.icon)} onClick={() => header.buttonAction && header.buttonAction(row)}>
                                                {header.buttonText}
                                            </Button>
                                        ) : header.render ? (
                                            header.render(row[header.key], row)
                                        ) : (
                                            row[header.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <IconButton onClick={() => handleChangePage(page - 1)} disabled={page === 0} sx={{ color: page === 0 ? theme.palette.grey[500] : theme.palette.primary.main }}>
                    <ArrowBack />
                </IconButton>
                <span style={{ fontSize: "12px", fontWeight: "bold", background: theme.palette.mode === "dark" ? "#333" : "#f1f1f1", padding: "6px 12px", borderRadius: "6px", color: theme.palette.mode === "dark" ? "#fff" : "#000" }}>
                    Page {page + 1}
                </span>
                <IconButton onClick={() => handleChangePage(page + 1)} disabled={tableData.length < rowsPerPage} sx={{ color: tableData.length < rowsPerPage ? theme.palette.grey[500] : theme.palette.primary.main }}>
                    <ArrowForward />
                </IconButton>
            </div>
        </div>
    );
};

export default DynamicTable;