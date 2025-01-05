import React, { memo } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Alert, Box, Slide, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocalError } from "../../hooks/error";
import NewSubscription from "./newSubscription";
import PermissionButton from "../UI/PermissionButton";
import { deleteMemberById } from "../../services/members";
import { Link } from "react-router-dom";

function MemberCard({ index, member, componentHandler }) {
    const dispatch = useDispatch();
    const { localError, setLocalError } = useLocalError();

    // TODO: Make this function global and be on all the date in the website
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const deleteMember = async (id) => {
        if (!id) return setLocalError("Missing id cannot delete member");
        try 
        {
            await deleteMemberById(id, dispatch);
        } 
        catch(err) 
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    };

    return (
        <Box
            p={5}
            component={"div"}
            color={"black"}
            borderRadius={"20px"}
            className="bg-color-card"
            margin={{ xs: "auto", xl: 5 }}
            width={{ xs: "70%", xl: "80%" }}
            boxShadow={"0px 0px 4px 1px lightgray"}
            sx={{
                transition: "transform 0.5s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                },
            }}
        >
            {/* Action Buttons */}
            <Box
                component={"div"}
                display={"flex"}
                justifyContent={"flex-end"}
                gap={1}
            >
                {localError && (
                    <Slide
                        direction="right"
                        in={!!localError}
                        mountOnEnter
                        unmountOnExit
                        timeout={{ enter: 500, exit: 300 }}
                    >
                        <Alert
                            color="error"
                            severity="error"
                            variant="standard"
                            sx={{
                                width: "fit-content",
                                transition: "width 0.5s ease-in-out",
                            }}
                        >
                            {localError}
                        </Alert>
                    </Slide>
                )}

                <Tooltip title={"Edit"}>
                    <PermissionButton
                        resourceType="subscriptions"
                        permissionType="update"
                        size="large"
                        variant="outlined"
                        onClick={() => componentHandler("Edit Member", member)}
                    >
                        <EditTwoToneIcon />
                    </PermissionButton>
                </Tooltip>
                <Tooltip title={"Remove"}>
                    <PermissionButton
                        resourceType="subscriptions"
                        permissionType="delete"
                        size="large"
                        color="error"
                        variant="outlined"
                        onClick={() => deleteMember(member._id)}
                    >
                        <DeleteForeverTwoToneIcon color="error" />
                    </PermissionButton>
                </Tooltip>
            </Box>

            {/* Member Details */}
            <Typography variant="h4" mb={5}>
                <strong> Member: </strong> {member?.name}
            </Typography>
            <Typography variant="body2">
                <strong> City: </strong> {member?.city}
            </Typography>
            <Typography variant="body2">
                <strong> Email: </strong> {member?.email}
            </Typography>

            {/* Subscriptions Table */}
            {member?.subscriptions?.length > 0 ? (
                <Box
                    component={"div"}
                    mt={2}
                    width={"100%"}
                    sx={{ overflow: "scroll", height: 115 }}
                >
                    <Table border={1}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Movie Name</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Date</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {member.subscriptions.map((subscription, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                      <Link
                                        to={`/movies/${subscription.movieId}`}
                                        style={{ textDecoration: 'none', color: 'blue' }}
                                      >
                                        {subscription.name}
                                      </Link>
                                    </TableCell>

                                    <TableCell>
                                        {formatDate(subscription.date)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            ) : null}

            <NewSubscription member={member} index={index} />
        </Box>
    );
}

export default memo(MemberCard);
