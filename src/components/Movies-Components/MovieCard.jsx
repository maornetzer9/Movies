import React, { memo, useCallback, useMemo, useState } from "react";
import { Box, Card, Typography, Avatar, Stack, Chip, Tooltip, Table, TableHead, TableRow, TableCell, TableBody, CardMedia, Alert } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useDispatch, useSelector } from "react-redux";
import { deleteMovieById } from "../../services/movies";
import { useLocalError } from "../../hooks/error";
import PermissionButton from "../UI/PermissionButton";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditMovie from "./EditMovie";

function MovieCard({ movie, isSelected }) {
    const dispatch = useDispatch();
    const { localError, setLocalError } = useLocalError();
    const { members } = useSelector((state) => state.membersReducer);

    const [edit, setEdit] = useState(false);

    const toggleEditMovieComponent = useCallback(() => setEdit((prev) => !prev));

    const deleteMovie = async (_id) => {
        try 
        {
            const { code, message } = await deleteMovieById(_id, dispatch);
            if(code !== 200) setLocalError(message);
        } 
        catch(err) 
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    };

    const formattedDate = useMemo(() => {
        if (!movie.premiered) return '';
        return new Date(movie.premiered).toLocaleDateString();
    }, [movie.premiered]);

    // Filter subscriptions for the current movie
    const filteredSubscriptions = members?.filter((member) =>member.subscriptions?.some((sub) => sub.movieId === movie._id));

    const subscriptions = filteredSubscriptions?.map((member) => ({
        name: member.name,
        subscriptions: member.subscriptions.filter(
            (sub) => sub.movieId === movie._id
        ),
    }));

    return (
        <Card
            sx={{
                p: 5,
                minWidth:{xs: 0, md: '300px', xl: '300px'},
                height: {xs: 'auto', md: '650px', xl: '650px'},
                scrollBehavior: 'auto',
                transition: 'transform 0.2s ease',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                '&:hover': { transform: 'scale(1.02)' }
            }}
        >
            <Box
                component={'div'}
                display={'flex'}
                justifyContent={'flex-end'}
                flexDirection={{xs: 'column', md: 'row', xl: 'row'}}
                width="100%"
                gap={1}
            >
                <Tooltip title={'Edit'}>
                    <PermissionButton
                        type='button'
                        resourceType='movies'
                        permissionType="update"
                        size="small"
                        variant="outlined"
                        onClick={toggleEditMovieComponent}
                        component="span"
                    >
                        <EditTwoToneIcon />
                    </PermissionButton>
                </Tooltip>
                <Tooltip title={'Remove'}>
                    <PermissionButton
                        type='button'
                        size="small"
                        variant="outlined"
                        component="span"
                        color="error"
                        resourceType="movies"
                        permissionType="delete"
                        onClick={() => deleteMovie(movie._id)}
                    >
                        <DeleteForeverTwoToneIcon />
                    </PermissionButton>
                </Tooltip>
            </Box>

            {edit && <EditMovie movie={movie} toggleEditMovieComponent={toggleEditMovieComponent} />}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: { xs: 'column', md: 'row', xl: 'row' },
                    mt:{ xs: 2, md: 0, xl: 0 },
                    width: "100%"
                }}

            >
                <Avatar
                    src={movie.image}
                    alt={movie.name}
                    sx={{ width: 50, height: 50, mb: 2, mr: 2 }}
                />
                <Stack
                    direction="row"
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        '& > *': { margin: '2px !important' }
                    }}
                >
                    {movie?.genres.map((genre, index) => (
                        <Chip
                            key={index}
                            label={genre}
                            size="small"
                            variant="outlined"
                            sx={{
                                fontSize: '0.75rem',
                                height: '24px'
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            <CardMedia
                height="340"
                component="img"
                loading="lazy"
                alt={movie.name}
                image={movie.image}
                sx={{ objectFit: 'cover', mb: 2, width: "100%"}}
            />

            <Typography variant="h5" noWrap>
                {movie.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                Premiered: {formattedDate}
            </Typography>

            {localError && 
                <Alert
                    variant="standard"
                    severity="error"
                    color="error"
                >
                    { localError }
                </Alert>
            }

            {subscriptions.length > 0 && 
                <Typography variant="h6" sx={{ mt: 3 }}>
                    Watched By:
                </Typography>
            }
            {subscriptions.length > 0 && 
                <Box
                    component={"div"}
                    sx={{
                        maxHeight: 100,
                        overflow: "auto",
                        borderRadius: '5px',
                        border: '1px solid lightgray',
                        mt: 2
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name:</strong></TableCell>
                                <TableCell><strong>Date:</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subscriptions?.map((sub, index) => (
                                sub.subscriptions.map((subscription, subIndex) => (
                                    <TableRow key={`${index}-${subIndex}`}>
                                        <TableCell>{sub.name}</TableCell>
                                        <TableCell>{new Date(subscription.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            }
        </Card>
    );
}

export default memo(MovieCard);