import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumb from './BreadCrum';
import DynamicTable from '../Table';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { Delete, Edit } from "@mui/icons-material";

export default function Page({ title = "Title", children, ...props }) {
    const theme = useTheme(); // 🎯 Get the current theme

    const routeSegments = [
        { name: 'Dashboard', path: '/dashboard', iconName: 'Home', color: '#1e90ff' },
        { name: 'Profile', path: '/profile', iconName: 'AccountCircle', color: '#ff6347' },
        { name: 'Settings', path: '/settings', iconName: 'Settings', color: '#32cd32' },
        { name: 'Reports', path: '/reports', iconName: 'Assessment', color: '#ffa500' },
        { name: 'Help', path: '/help', iconName: 'HelpOutline', color: '#ff69b4' },
    ];

    const localData = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
    ];

    const headers = [
        { key: "id", label: "ID", filterable: false },
        { key: "name", label: "Name", filterable: true },
        { key: "email", label: "Email", filterable: true },
        { key: "email", label: "Email" },
        {
            key: "edit",
            label: "Edit",
            type: "button",
            buttonText: "Edit",
            icon: Edit,
            buttonAction: (row) => console.log("Editing:", row),
        },
        {
            key: "delete",
            label: "Delete",
            type: "button",
            buttonText: "Delete",
            icon: Delete,
            buttonAction: (row) => console.log("Deleting:", row),
        },
    ];

    return (
        <>
            <Grid container
                sx={{
                    height: '100vh',
                    background: theme.palette.mode === 'dark' ? '#333' : '#e8edfa',
                    margin: { xs: "5px", md: "10px" } // ✅ Responsive margin
                }}
            >
                {/* ✅ Header Section */}
                <Grid
                    size={12} // ✅ Changed from size={12} to xs={12}
                    sx={{
                        height: { xs: "auto", md: "auto" }, // ✅ Responsive height
                        borderRadius: '12px',
                        margin: { xs: "5px", md: "10px" }, // ✅ Responsive margin
                        background: 'white',
                        color: 'white',
                        padding: { xs: 1, md: 2 } // ✅ Responsive padding
                    }}
                >
                    <Grid>
                        <Typography
                            variant="h7"
                            sx={{ margin: '5px', color: theme.palette.text.primary }}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Breadcrumb routeSegments={routeSegments} />
                    </Grid>
                </Grid>

                {/* ✅ Content Section */}
                <Grid
                    size={12} // ✅ Changed from size={12} to xs={12}
                    sx={{
                        marginTop: { xs: "10px", md: "30px" }, // ✅ Responsive spacing
                        backgroundColor: theme.palette.background.paper,
                        height: { xs: "auto", md: "calc(100vh - 200px)" }, // ✅ Responsive height
                        borderRadius: '6px',
                        padding: { xs: 2, md: 3 }, // ✅ Responsive padding
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        margin: { xs: "5px", md: "10px" }, // ✅ Responsive margin

                    }}
                >
                    <DynamicTable data={localData} headers={headers} />
                    {children}
                </Grid>
            </Grid>
        </>
    );
}
