import { Alert, Box, Button, CircularProgress, Collapse, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalError } from '../../hooks/error';
import { loadingMovies } from '../../services/movies';
import { newSubscriptionService } from '../../services/members';

export default function NewSubscription({ member = {}, index = 0 }) {

    const dispatch = useDispatch();
    const { loading, error, movies } = useSelector((state) => state.moviesReducer);
    const { localError, setLocalError } = useLocalError();
    const [ movieId, setMovieId ] = useState('');
    const [ subscribe, setSubscribe ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState(new Date().toISOString().split("T")[0]);

    const movieIdHandler = ({ target: { value } }) => setMovieId(value);
    const movieDateHandler = ({ target: { value } }) => setSelectedDate(value);  
    const toggleSubscribe = () => setSubscribe((prev) => !prev);


    const filteredMovies = useMemo(() => {
      // Create a Set of subscribed movie IDs for efficient lookup
      const subscribedMovieIds = new Set(member?.subscriptions?.map(sub => sub.movieId));

      // Filter movies to exclude those with IDs in the subscribedMovieIds Set
      return movies.filter(movie => !subscribedMovieIds.has(movie._id));
    }, [member?.subscriptions, movies]);


    const newSubscription = async () => {
        if(!movieId) return setLocalError('Pick a movie if you want to subscribe.');
        try
        {       
            const newSubscription = { movieId, date: selectedDate, memberId: member._id };
            await newSubscriptionService(newSubscription, dispatch);
        }
        catch(err)
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    };

    const fetchMovies = useCallback(async() => {
        try 
        {
            await loadingMovies(dispatch);
        }
        catch(err)
        {
            console.log(err.message);
        }
    
    }, [dispatch])


    useEffect(() => {
        if ( movies.length === 0 ) 
        {
            fetchMovies();
        }
    }, [ fetchMovies, movies.length]);

  return (
    <Box component={'div'}>
         {/* Subscribe to New Movie */}
         <Tooltip title="Subscribe">
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    size="small"
                    color="info"
                    onClick={toggleSubscribe}
                >
                    Subscribe To New Movie
                </Button>
            </Tooltip>

            <Divider sx={{ bgcolor: "lightgray", mt: 2 }} />

            {/* Movie Selector and Date Input */}
            {!loading ? 
                <Collapse in={subscribe} timeout={1000}>
                    <FormControl fullWidth sx={{ mt: 2, gap: 2 }}>
                        <Box
                            gap={2}
                            component={"div"}
                            display={{ xs: "column", md: "flex", xl: "flex" }}
                        >
                            <InputLabel id={`movies-label-${index}`}>Movies</InputLabel>
                            <Select
                                value={movieId}
                                defaultValue={movieId.toLocaleLowerCase()}
                                labelId={`movies-label-${index}`}
                                onChange={movieIdHandler}
                                displayEmpty
                                sx={{
                                    bgcolor: "lightgray",
                                    width: { xs: "100%", xl: "20%" },
                                    mb: { xs: 2, md: 0, xl: 0 },
                                }}
                            >
                                {filteredMovies.map((movie, index) =>
                                    <MenuItem 
                                        key={index} 
                                        value={movie._id}
                                        aria-hidden="false"
                                    >
                                        { movie.name } 
                                    </MenuItem> 
                                )}
                            </Select>
                            <TextField
                                type="date"
                                variant="outlined"
                                defaultValue={selectedDate}
                                onChange={movieDateHandler}
                                sx={{
                                    bgcolor: "lightgray",
                                    width: { xs: "100%", xl: "25%" },
                                    mb: { xs: 2, md: 0, xl: 0 },
                                }}
                            />
                            <Tooltip title={'Subscribe'}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => newSubscription(movies[index], movies[index]?._id)}
                                    sx={{
                                        width: "fit-content",
                                        padding: "10px 20px",
                                        mr: { xs: 2, md: 0, xl: 0 },
                                    }}
                                >
                                    Subscribe
                                </Button>
                            </Tooltip>
                            <Tooltip title={'Cancel'}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    sx={{ width: "fit-content", padding: "10px 20px" }}
                                    onClick={toggleSubscribe}
                                >
                                    Cancel
                                </Button>
                            </Tooltip>
                        </Box>

                            {localError || error ?
                                <Alert
                                    variant='filled'
                                    severity='error'
                                    color='error'
                                >
                                    {localError ? localError : error}
                                </Alert>
                            : null }

                    </FormControl>
                </Collapse>
                : 
                <Box 
                    component={'div'} 
                    sx={{textAlign:'center'}}
                >
                    { subscribe ? <CircularProgress color="primary"/> : null }
                </Box>
            }
    </Box>
  )
}