import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Icons from '@mui/icons-material';

const Sidebar = () => {
    const [sidebarData, setSidebarData] = useState([]);
    const navigate = useNavigate();

    const fetchSidebarData = async () => {
        const dummyData = [
            {
                module: "Dashboard",
                icon: "HomeIcon",
                route: "/dashboard",
                submodules: [
                    {
                        name: "Overview",
                        route: "/dashboard/overview"
                    },
                    {
                        name: "Analytics",
                        route: "/dashboard/analytics"
                    }
                ]
            },
            {
                module: "Settings",
                icon: "SettingsIcon",
                route: "/settings",
                submodules: [
                    {
                        name: "Profile",
                        route: "/settings/profile"
                    },
                    {
                        name: "Security",
                        route: "/settings/security"
                    }
                ]
            }
        ];
        setSidebarData(dummyData);
    };

    useEffect(() => {
        fetchSidebarData();
    }, []);

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <Drawer
            sx={{
                height: '100vh',
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 300,
                    boxSizing: "border-box",
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {sidebarData.map((item, index) => {
                    const IconComponent = Icons[item.icon] || Icons.HelpOutline;
                    return (
                        <div key={index}>
                            {/* Main module item */}
                            <ListItem button onClick={() => handleNavigation(item.route)}>
                                <ListItemIcon>
                                    <IconComponent />
                                </ListItemIcon>
                                <ListItemText primary={item.module} />
                            </ListItem>
                            <Divider />
                            {/* Submodule items */}
                            {item.submodules.map((submodule, subIndex) => (
                                <ListItem
                                    button
                                    key={subIndex}
                                    onClick={() => handleNavigation(submodule.route)}
                                    sx={{ pl: 4 }} // Indentation for submodules
                                >
                                    <ListItemText primary={submodule.name} />
                                </ListItem>
                            ))}
                        </div>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default Sidebar;
