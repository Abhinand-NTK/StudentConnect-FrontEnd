import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const Breadcrumb = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {pathnames.length > 0 ? (
                <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    Home
                </Link>
            ) : (
                <Typography color="text.primary">Home</Typography>
            )}
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <Typography key={to} color="text.primary">
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Typography>
                ) : (
                    <Link
                        key={to}
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate(to)}
                        style={{ cursor: "pointer" }}
                    >
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default Breadcrumb;
