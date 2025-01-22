import Grid2 from '@mui/material/Grid2';

export default function Grid({ children, sx = {}, column, ...props }) {
    let size;

    if (column === 2) {
        size = { xs: 12, sm: 12, md: 6, lg: 3 };
    } else if (column === 1) {
        size = { xs: 12, sm: 12, md: 12, lg: 12 };
    } else if (column === 3) {
        size = { xs: 12, sm: 12, md: 4, lg: 4 }; 
    } else {
        size = { xs: 12, sm: 12, md: 12, lg: 12 };
    }

    return (
        <Grid2
            {...size} 
            sx={{
                backgroundColor: 'lightblue',
                padding: '8px',
                borderRadius: '8px',
                ...sx, 
            }}
            {...props}
        >
            {children}
        </Grid2>
    );
}
