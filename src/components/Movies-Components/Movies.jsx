import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Container, Typography, Tooltip, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { headContentAnimation } from "../../utils/motion";
import { loadingMovies } from "../../services/movies";
import { loadingMembers } from "../../services/members";
import { useLocalError } from "../../hooks/error";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../../assets/images/Movie-Banner.webp";
import Loader from "../UI/Loader";
import AddIcon from "@mui/icons-material/Add";
import AddMovie from "./AddMovie";
import PermissionButton from "../UI/PermissionButton";
import PermissionsLoader from "../UI/PermissionsLoader";
import MoviesTabs from "./MoviesTabs";

const Movies = () => {
    const dispatch = useDispatch();
    const { localError, setLocalError } = useLocalError();
    const { members } = useSelector((state) => state.membersReducer);
    const { movies } = useSelector((state) => state.moviesReducer);

    const { movieId } = useParams();
    const selectedMovieParam = movies.filter(movie => movie._id.toString() === movieId);

    const [addMovie, setAddMovie] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(0);

    const toggleAddMovieComponent = useCallback(() => setAddMovie((prev) => !prev), []);

    const fetchData = useCallback(async () => {
        try 
        {
            if(movies.length === 0)
            {
                await loadingMovies(dispatch);
            }
            if(members.length === 0)
            {
                await loadingMembers(dispatch);
            }
        } 
        catch(err) 
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    }, [dispatch, movies.length]);

    const moviesByGenres = useMemo(() => {
        const grouped = {};
        const moviesToGroup = selectedMovieParam.length > 0 ? selectedMovieParam : movies;
    
        moviesToGroup.forEach((movie) => {
            movie.genres.forEach((genre) => {
                if (!grouped[genre]) grouped[genre] = [];
                grouped[genre].push(movie);
            });
        });
    
        return grouped;
    }, [movies, selectedMovieParam]);
    

    const genres = useMemo(() => Object.keys(moviesByGenres), [moviesByGenres]);

    useEffect(() => {
        const genreMovies = moviesByGenres[genres[selectedGenre]] || [];

        if (selectedMovie >= genreMovies.length) 
        {
            setSelectedMovie(0);
        }
    }, [moviesByGenres, genres, selectedGenre, selectedMovie]);

    useEffect(() => { fetchData(); }, [movies.length, members.length, fetchData]);

    if (members.length <= 0 || movies.length < 230) return <Loader color={"warning"} />;

    return (
        <PermissionsLoader>
            <Box component={"div"} sx={{ overflow: "hidden" }}>
              

                <Box
                    component={"img"}
                    src={Background}
                    width={"100%"}
                    loading="lazy"
                    sx={{
                        opacity: "0.3",
                        position: "fixed",
                        top: 0,
                        zIndex: -1,
                    }}
                />

                <Container maxWidth="xl" sx={{ pt: 5 }}>
                    <motion.div
                        {...headContentAnimation}
                        style={{ width: "100%" }}
                    >
                        <Typography 
                            textAlign="center"
                            variant="h4" 
                            component="h1" 
                            gutterBottom
                        >
                            { movieId ? 'Movie Genres' : 'Movies By Genres'}
                        </Typography>

                        {localError &&
                            <Alert
                                variant="filled"
                                severity="error"
                                color="error"
                                sx={{ display: "flex", justifyContent: "center" }}
                            >
                                { localError }
                            </Alert>
                        }

                        <MoviesTabs
                            genres={genres}
                            moviesByGenres={moviesByGenres}
                            selectedGenre={selectedGenre}
                            setSelectedGenre={setSelectedGenre}
                            selectedMovie={Math.min(selectedMovie,
                                (moviesByGenres[genres[selectedGenre]] || []).length - 1
                            )}
                            setSelectedMovie={setSelectedMovie}
                        />
                    </motion.div>
                </Container>

                { addMovie && 
                    <AddMovie
                        toggleAddMovieComponent={toggleAddMovieComponent}
                    />
                }

                <Tooltip title="Add Movie">
                    <PermissionButton
                        permissionType="create"
                        resourceType="movies"
                        type="fab"
                        color="info"
                        aria-label="add"
                        onClick={toggleAddMovieComponent}
                        sx={{
                            padding: "28px",
                        }}
                    >
                        <AddIcon />
                    </PermissionButton>
                </Tooltip>
            </Box>
        </PermissionsLoader>
    );
}

export default Movies;