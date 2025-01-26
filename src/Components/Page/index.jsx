import React from 'react';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Breadcrumb from './BreadCrum';
import DynamicTable from '../Table';


export default function Page({ title = "default", children, ...props }) {

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
        <Grid2
            {...size}
            sx={{
                backgroundColor: 'whirw ',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            {...props}
        >
            <Grid2
                // {...size}
                sx={{
                    backgroundColor: '#e8edfa',
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
                        color: '#374151',
                    }}
                >
                    {title}
                </Typography>
                <Breadcrumb routeSegments={routeSegments} />
                <Grid2
                    sx={{
                        marginTop: '30px',
                        backgroundColor: 'white',
                        height: 'calc(100vh - 200px)',
                        borderRadius: '20px',
                        padding: '16px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >

                    <DynamicTable data={localData} headers={headers} />;
                    {children}
                </Grid2>
            </Grid2>
        </Grid2 >
    );
}
