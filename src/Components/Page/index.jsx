import React from 'react';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Breadcrumb from './BreadCrum';
import DynamicTable from '../Table';
import { useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

export default function Page({ title = "default", children, ...props }) {
    const theme = useTheme(); // 🎯 Get the current theme

    const routeSegments = [
        { name: 'Dashboard', path: '/dashboard', iconName: 'Home', color: '#1e90ff' },
        { name: 'Profile', path: '/profile', iconName: 'AccountCircle', color: '#ff6347' },
        { name: 'Settings', path: '/settings', iconName: 'Settings', color: '#32cd32' },
        { name: 'Reports', path: '/reports', iconName: 'Assessment', color: '#ffa500' },
        { name: 'Help', path: '/help', iconName: 'HelpOutline', color: '#ff69b4' },
    ];

    const size = { md: 12, lg: 12 };

    const localData = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
    ];

    const headers = [
        { key: "id", label: "ID", filterable: false },
        { key: "name", label: "Name", filterable: true },
        { key: "email", label: "Email", filterable: true },
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                height: '100vh',
                backgroundColor: theme.palette.background.default, // ✅ Dynamic background
                color: theme.palette.text.primary, // ✅ Dynamic text color
                borderRadius: '12px',
                padding: '16px',
                transition: 'all 0.3s ease-in-out',
            }}
            {...props}
        >
            <Paper
                sx={{
                    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e8edfa', // ✅ Adjusted for theme
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '16px',
                        color: theme.palette.text.primary, // ✅ Dynamic text color
                    }}
                >
                    {title}
                </Typography>
                <Breadcrumb routeSegments={routeSegments} />
                <Paper
                    sx={{
                        marginTop: '30px',
                        backgroundColor: theme.palette.background.paper, // ✅ Dynamic background
                        height: 'calc(100vh - 200px)',
                        borderRadius: '20px',
                        padding: '16px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <DynamicTable data={localData} headers={headers} />
                    {children}
                </Paper>
            </Paper>
        </Paper>
    );
}
