import { Box, Tooltip } from "@mui/material";
import React, { useState, useCallback } from "react";
import Banner from "../../assets/images/Manage-Users.webp";
import AddUser from "./AddUser";
import AllUsers from "./AllUsers";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Users() {
    const [selectedComponent, setSelectedComponent] = useState("All Users");

    const componentsHandler = useCallback((component) => setSelectedComponent(component), []);

    return (
        <Box component={"div"}>
            <Box
                zIndex={-1}
                width={"100%"}
                component={"div"}
                height={{ xs: "220px", md: "800px", xl: "1100px" }}
                mb={{ xs: 5, md: 5, xl: 0 }}
                position={{ xs: 'relative', xl: 'fixed' }}
                sx={{
                    opacity: 0.6,
                    backgroundImage: `url(${Banner})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: { xs: 'contain', md: 'fit', xl: 'fit' }
                }}
            />
            <Box
                component={"div"}
                display={"flex"}
                width={"100%"}
                flexDirection={"column"}
            >
                { selectedComponent === "All Users" && 
                    <AllUsers selectedComponent={selectedComponent} />
                }
                { selectedComponent === "Add User" && 
                    <AddUser 
                        componentsHandler={componentsHandler} 
                        selectedComponent={selectedComponent}
                    />
                }
                <Tooltip title="Add User">
                    <Fab
                        size="large"
                        color="info"
                        aria-label="add"
                        onClick={() => componentsHandler("Add User")}
                        sx={{
                            position: "fixed",
                            right: 10,
                            bottom: 10,
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </Box>
    );
}