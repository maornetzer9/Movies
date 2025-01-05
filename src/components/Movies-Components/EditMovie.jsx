import React, { useState } from "react";
import { Alert, Box, Button, Dialog, DialogContent, DialogContentText, TextField, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocalError } from "../../hooks/error";
import { editMovieService } from "../../services/movies";

export default function EditMovie( { movie, toggleEditMovieComponent } ) {

    const dispatch = useDispatch();
    const { localError, setLocalError } = useLocalError();
    const { loading } = useSelector((state) => state.moviesReducer);

    const [ editMovieDetails, setEditMovieDetails ] = useState({
        _id: movie._id || '',
        name: movie.name || '',
        genres: movie.genres || [],
        image: movie.image || {},
        premiered: movie.premiered || new Date().toLocaleDateString()
    });

    const editMovieDetailsHandler = ({ target: { name, value } }) => {
        if (name === "genres") 
        {
          // Split the string by commas, trim any extra whitespace
          const genresArray = value.split(',').map(genre => genre.trim()).filter(genre => genre.length > 0);
          setEditMovieDetails({ ...editMovieDetails, genres: genresArray });
        } 
        else 
        {
          setEditMovieDetails({ ...editMovieDetails, [name]: value });
        }
      };

    const editMovie = async () => {
        
        const { name, genres, image, premiered } = editMovieDetails; 
        if( !name || genres.length === 0 || !image || !premiered ) return setLocalError('All fields are required...'); 

        try
        {
            const { code, message } = await editMovieService(editMovieDetails, dispatch);
            if( code === 200 ) return toggleEditMovieComponent();
            setLocalError(message);
        }
        catch(err)
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    };

    return (
        <Box component={"div"}>
            <Dialog open fullWidth transitionDuration={2000}>
                <DialogContentText textAlign={"center"} variant="h4" mt={5}>
                    Edit {movie.name}
                </DialogContentText>

                <DialogContent>
                    <Box
                        component={"div"}
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        gap={2}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            gap={2}
                        >
                            <Typography variant="body1" width="120px">
                                Name:
                            </Typography>
                            <TextField
                                fullWidth
                                name="name"
                                variant="outlined"
                                label="Enter name"
                                sx={{bgcolor:'lightgray'}}
                                defaultValue={movie?.name}
                                onChange={editMovieDetailsHandler}
                            />
                        </Box>

                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            gap={2}
                        >
                            <Typography variant="body1" width="120px">
                                Genres:
                            </Typography>
                            <TextField
                                fullWidth
                                name="genres"
                                variant="outlined"
                                label="Enter Genres"
                                sx={{bgcolor:'lightgray'}}
                                defaultValue={movie?.genres ? movie.genres.join(", ") : ''}
                                onChange={editMovieDetailsHandler}
                            />
                        </Box>

                        <Typography variant="body1" width="120px">
                            Image url:
                        </Typography>
                        <TextField
                            fullWidth
                            name="image"
                            variant="outlined"
                            label="Enter image url"
                            sx={{bgcolor:'lightgray'}}
                            defaultValue={movie?.image}
                            onChange={editMovieDetailsHandler}
                        />
                        <Typography variant="body1" width="120px">
                            Premiered:
                        </Typography>
                        <TextField
                            fullWidth
                            type="date"
                            name="premiered"
                            variant="outlined"
                            sx={{bgcolor:'lightgray'}}
                            defaultValue={movie?.premiered ? new Date(movie.premiered).toISOString().split("T")[0] : ""}
                            onChange={editMovieDetailsHandler}
                        />

                        { localError ? 
                            <Alert 
                                variant="standard" 
                                severity="error" 
                                color="error" 
                            > 
                                {localError} 
                            </Alert>
                        : null}

                        <Box component={"div"} display={"flex"} gap={2} mt={3}>
                            <Tooltip title={loading ? "Saving..." : 'Save'}>
                                <Button 
                                    variant="contained" 
                                    onClick={editMovie}
                                >
                                    { loading ? "Saving..." : 'Save' }
                                </Button>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={toggleEditMovieComponent}
                                >
                                    Cancel
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}