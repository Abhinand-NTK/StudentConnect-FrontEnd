import React from 'react';
import Grid2 from '@mui/material/Grid2';
import HomeIcon from '@mui/icons-material/Home';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Page({ children, ...props }) {
    const navigate = useNavigate();

    const routeSegments = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Profile', path: '/profile' },
        { name: 'Settings', path: '/settings' },
        { name: 'Reports', path: '/reports' },
        { name: 'Help', path: '/help' },
    ];

    const size = { md: 12, lg: 12 };

    return (
        <Grid2
            // item
            // xs={12} // Ensures it spans full width on all screens
            // sm={12}
            // md={12}
            // lg={12}
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
                    Title
                </Typography>

                <Grid2 container spacing={2}>
                    {routeSegments.map((item, index) => (
                        <Grid2
                            key={index}
                            // xs="auto"
                            onClick={() => navigate(item.path)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 16px',
                                borderRadius: '12px',
                                backgroundColor: 'linear-gradient(to right, #f3f4f6, #e0e7ff)',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    backgroundColor: 'linear-gradient(to right, #e0e7ff, #c7d2fe)',
                                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <HomeIcon
                                fontSize="small"
                                sx={{ color: pink[500], marginRight: '8px' }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    color: '#374151',
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Grid2>
                    ))}
                </Grid2>

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
                    {children}
                </Grid2>
            </Grid2>
        </Grid2 >
    );
}
