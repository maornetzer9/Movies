import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

export default function MoviesTabs({ genres, moviesByGenres, selectedGenre, setSelectedGenre, selectedMovie, setSelectedMovie }) {
    return (
        <>
            {/* Parent Tabs Section (Genres) */}
            <Tabs
                value={selectedGenre}
                onChange={(event, newValue) => {
                    setSelectedGenre(newValue);
                    setSelectedMovie(0); // Reset movie selection when genre changes
                }}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="genres tabs"
                sx={{
                    mb: 4,
                    ".MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.3 },
                    ".css-1wxkzlj-MuiTabs-flexContainer": { justifyContent: genres.length < 4 ? 'center' : 'start'},
                }}
            >
                {genres.map((genre, index) => (
                    <Tab
                        key={index}
                        label={genre}
                        sx={{ color: "white", width: "30%" }}
                    />
                ))}
            </Tabs>

            {/* Genre Movies Panel */}
            {genres.map((genre, genreIndex) => (
                <motion.div
                    key={genre}
                    role="tabpanel"
                    id={`tabpanel-${genre}`}
                    hidden={selectedGenre !== genreIndex}
                    aria-labelledby={`tab-${genre}`}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    initial="hidden"
                    animate={
                        selectedGenre === genreIndex ? "visible" : "hidden"
                    }
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "40px" }}
                >
                    {selectedGenre === genreIndex && (
                        <>
                            {/* Child Tabs Section (Movies) */}
                            <Tabs
                                value={selectedMovie}
                                onChange={(event, newValue) =>
                                    setSelectedMovie(newValue)
                                }
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="movies tabs"
                                sx={{
                                    mb: 4,
                                    ".MuiTabs-scrollButtons.Mui-disabled": {
                                        opacity: 0.3,
                                    },
                                }}
                            >
                                {moviesByGenres[genre].map(
                                    (movie, movieIndex) => (
                                        <Tab
                                            key={movie._id}
                                            value={movieIndex}
                                            sx={{ m: moviesByGenres[genre].length <= 3 ? "auto": 1 }}
                                            label={
                                                <MovieCard
                                                    movie={movie}
                                                    isSelected={
                                                        selectedMovie ===
                                                        movieIndex
                                                    }
                                                />
                                            }
                                        />
                                    )
                                )}
                            </Tabs>

                            {/* Selected Movie Details */}
                            {moviesByGenres[genre][selectedMovie] && (
                                <Box sx={{ mt: 4, textAlign: {xs: 'center', md: 'start', xl: 'start'} }}>
                                    <Typography variant="body1">
                                        Name:{" "}
                                        {
                                            moviesByGenres[genre][
                                                selectedMovie
                                            ]?.name
                                        }
                                    </Typography>
                                    <Typography variant="body1">
                                        Genres:{" "}
                                        {moviesByGenres[genre][
                                            selectedMovie
                                        ]?.genres.join(", ")}
                                    </Typography>
                                    <Typography variant="body2">
                                        Premiered:{" "}
                                        {new Date(
                                            moviesByGenres[genre][
                                                selectedMovie
                                            ]?.premiered
                                        ).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            )}
                        </>
                    )}
                </motion.div>
            ))}
        </>
    );
}