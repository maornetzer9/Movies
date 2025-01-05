import React, { useState } from "react";
import { Alert, Box, Button, Dialog, DialogContent, DialogContentText, TextField, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocalError } from "../../hooks/error";
import { addMovieService } from "../../services/movies";

export default function AddMovie( { toggleAddMovieComponent = () => {} } ) {

    const dispatch = useDispatch();
    const dateFormat = new Date().toISOString().split("T")[0];
    const { localError, setLocalError } = useLocalError();
    const { loading } = useSelector((state) => state.moviesReducer);

    const [ newMovie, setNewMovie ] = useState({
        name: '',
        genres: [],
        image: '',
        premiered: dateFormat
    });

    const newMovieHandler = ({ target: { name, value } }) => {
        if (name === "genres") 
        {
          // Split the string by commas, trim any extra whitespace
          const genresArray = value.split(',').map(genre => genre.trim()).filter(genre => genre.length > 0);
          setNewMovie({ ...newMovie, genres: genresArray });
        } 
        else 
        {
            setNewMovie({ ...newMovie, [name]: value });
        }
      };

    const addMovie = async () => {
        const { name, genres, image } = newMovie;
        if (!name || genres.length === 0 || !image) return setLocalError('All fields are required...');
        try
        {
            const { code } = await addMovieService( newMovie, dispatch );
            if( code === 200 ) return toggleAddMovieComponent();
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
                    Add Movie 
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
                                variant="outlined"
                                label="Enter name"
                                name="name"
                                onChange={newMovieHandler}
                                sx={{bgcolor:'lightgray'}}
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
                                variant="outlined"
                                label="Enter Genres"
                                name="genres"
                                onChange={newMovieHandler}
                                sx={{bgcolor:'lightgray'}}
                            />
                        </Box>

                        <Typography variant="body1" width="120px">
                            Image url:
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Enter image url"
                            name="image"
                            onChange={newMovieHandler}
                            sx={{bgcolor:'lightgray'}}
                        />
                        <Typography variant="body1" width="120px">
                            Premiered:
                        </Typography>
                        <TextField
                            fullWidth
                            type="date"
                            variant="outlined"
                            name="premiered"
                            defaultValue={dateFormat}
                            onChange={newMovieHandler}
                            sx={{bgcolor:'lightgray'}}
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
                                    onClick={addMovie}
                                >
                                    { loading ? "Saving..." : 'Save' }
                                </Button>
                            </Tooltip>
                            <Tooltip title="Cancel">  
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={toggleAddMovieComponent}
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