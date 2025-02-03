import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout as OriginalDashboardLayout } from '@toolpad/core/DashboardLayout';
import Page from '../../Components/Page';

// Custom Sidebar Styling
const DashboardLayout = styled(OriginalDashboardLayout)(({ theme }) => ({
    '& .MuiDrawer-root': {
        width: 50, // Set Sidebar Width
        flexShrink: 0,
    },
    '& .MuiDrawer-paper': {
        width: 50, // Ensure content matches sidebar width
    },
    '& .MuiListItem-root': {
        fontSize: '12px', // Adjust Sidebar Text Size
    },
}));

// Sidebar Navigation Items
const NAVIGATION = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: '18px' }} /> },
    { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon sx={{ fontSize: '18px' }} /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Analytics' },
    {
        segment: 'reports', title: 'Reports', icon: <BarChartIcon sx={{ fontSize: '18px' }} />,
        children: [
            { segment: 'sales', title: 'Sales', icon: <DescriptionIcon sx={{ fontSize: '18px' }} /> },
            { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon sx={{ fontSize: '18px' }} /> },
        ]
    },
    { segment: 'integrations', title: 'Integrations', icon: <LayersIcon sx={{ fontSize: '18px' }} /> },
];

// Custom Router Hook
function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);
    return React.useMemo(() => ({
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
    }), [pathname]);
}

// Sidebar Component
export default function SideBar({ window }) {
    const theme = useTheme();
    const router = useDemoRouter('/dashboard');
    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION} router={router} theme={theme} window={demoWindow}>
            <DashboardLayout>
                <Page />
            </DashboardLayout>
        </AppProvider>
    );
}