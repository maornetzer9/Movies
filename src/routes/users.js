import axios from 'axios';


export const registerRoute = async (form, url) => {
    try
    {
        const { data } = await axios.post(url, form);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to register user', err.message);
    }
};


export const loginRoute = async (username, password, url) => {
    try
    {
        const { data } = await axios.post(url, { username, password });
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to login user', err.message);
    }
};

// TODO: Finish the flow on the token and send him from the frontend to the backend to check if he is not expired. 
export const loadingUsersRoute = async (url) => {
    try
    {
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const { data } = await axios.get(url, config);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to loading users', err.message);
    }
};


export const addNewUserRoute = async (form, url) => {
    try
    {
        const { data } = await axios.post(url, form);
        return data
    }

    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to add new user', err.message);
    }
};


export const editUserRoute = async (form, url) => {
    try
    {
        const { data } = await axios.put(url, form);
        return data
    }

    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to edit user', err.message);
    }
};


export const deleteUserRoute = async (_id, url) => {
    try
    {
        const queriesUrl = `${url}?_id=${_id}`
        const { data } = await axios.delete(queriesUrl);

        return data
    }

    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to delete user', err.message);
    }
};


export const disconnectUserRoute = async (user, url) => {
    try
    {
        const { data } = await axios.put(url, { user });
        return data
    }

    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to delete user', err.message);
    }
};