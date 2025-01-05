import React, { useCallback } from "react";
import { Box, Grid } from "@mui/material";
import MemberCard from "./MemberCard"; // Import the child component
import { motion } from "framer-motion";
import { headContentAnimation } from "../../utils/motion";

export default function AllMembers({ members, componentHandler = () => {} }) {

    const stableComponentHandler = useCallback(componentHandler, []);

    return (
        <Box
            pt={5}
            mx="auto"
            component="div"
            width={{ xs: "100%", xl: "80%" }}
        >
            <Grid container spacing={{ xs: 6, md: 3, xl: 1 }}>
                {members.map((member, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <motion.div {...headContentAnimation}>
                            <MemberCard
                                index={index}
                                member={member}
                                componentHandler={stableComponentHandler}
                            />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
