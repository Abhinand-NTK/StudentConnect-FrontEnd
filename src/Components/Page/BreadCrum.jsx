import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import * as Icons from "@mui/icons-material";

const Breadcrumb = ({ routeSegments }) => {
    const navigate = useNavigate();

    return (
        <Grid2 container spacing={2}>
            {routeSegments.map((item, index) => {
                const IconComponent = Icons[item?.iconName] || Icons.HelpOutline;
                return (
                    <Grid2
                        key={index}
                        onClick={() => navigate(item.path)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            backgroundColor: "linear-gradient(to right, #f3f4f6, #e0e7ff)",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                backgroundColor: "linear-gradient(to right, #e0e7ff, #c7d2fe)",
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        {/* Render dynamic icon */}
                        <IconComponent
                            // fontSize="ezsmall"
                            sx={{
                                color: "#374151",
                                marginRight: "8px",
                                fontSize: '12px'
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "8px",
                                color: "#374151",
                            }}
                        >
                            {item.name}
                        </Typography>
                    </Grid2>
                );
            })}
        </Grid2>
    );
};

export default Breadcrumb;
