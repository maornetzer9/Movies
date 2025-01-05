import axios from 'axios';

export const loadingMoviesRoute = async (url) => {
    try
    {
        const { data } = await axios.get(url);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to load movies', err.message);
    }
};


export const editMovieRoute = async (movieDetails, url) => {
    try
    {
        const { data } = await axios.put(url, movieDetails);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to edit movie', err.message);
    }
};


export const addMovieRoute = async (newMovie, url) => {
    try
    {
        const { data } = await axios.post(url, newMovie);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to add new movie', err.message);
    }
};


export const deleteMovieRoute = async (_id, url) => {
    try
    {
        const queriesUrl = `${url}?_id=${_id}`;
        const { data } = await axios.delete(queriesUrl);

        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to delete movie', err.message);
    }
};