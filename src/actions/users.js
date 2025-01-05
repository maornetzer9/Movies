import { loginRoute, addNewUserRoute, registerRoute, loadingUsersRoute, deleteUserRoute, editUserRoute, disconnectUserRoute } from "../routes/users";

export const LOADING_USERS_LOADING = 'LOADING_USERS_LOADING';
export const LOADING_USERS_SUCCESS = 'LOADING_USERS_SUCCESS';
export const LOADING_USERS_FAILURE = 'LOADING_USERS_FAILURE';

export const REGISTER_USER_LOADING = 'REGISTER_USER_LOADING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_LOADING = 'LOGIN_USER_LOADING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const ADD_NEW_USER_LOADING = 'ADD_NEW_USER_LOADING';
export const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
export const ADD_NEW_USER_FAILURE = 'ADD_NEW_USER_FAILURE';

export const EDIT_USER_LOADING = 'EDIT_USER_LOADING';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const DELETE_USER_LOADING = 'DELETE_USER_LOADING';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const DISCONNECT_USER_SUCCESS = 'DISCONNECT_USER_SUCCESS';
export const DISCONNECT_USER_FAILURE = 'DISCONNECT_USER_FAILURE';


export const loadingUsersAction = (url) => async ( dispatch ) => {
    try
    {
        dispatch({ type: LOADING_USERS_LOADING })
        const { code, message, users } = await loadingUsersRoute(url);

        if(code !== 200)
        {
            dispatch({type: LOADING_USERS_FAILURE, payload: message});
            return { code, message };
        } 

        dispatch({type: LOADING_USERS_SUCCESS, payload: users })
        return { code, message, users };
    }
    catch(err)
    {
        console.error(err.message);
        dispatch({type: LOADING_USERS_FAILURE, payload: err.message});
    };
};


export const LoginAction = (username, password, url) => async ( dispatch ) => {
    try
    {
        dispatch({ type: LOGIN_USER_LOADING })
        const { code, message, user, token } = await loginRoute(username, password, url);

        if(code !== 200)
        {
            dispatch({type: LOGIN_USER_FAILURE, payload: message});
            return { code, message };
        } 

        const isAdmin = user.sessionTimeout;

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('username', JSON.stringify(user.username));
        isAdmin && localStorage.setItem('sessionTimeout', JSON.stringify(user.sessionTimeout));

        dispatch({type: LOGIN_USER_SUCCESS, payload: user})
        return { code, message };
    }
    catch(err)
    {
        console.error(err.message);
        dispatch({type: LOGIN_USER_FAILURE, payload: err.message});
    };
};


export const registerAction = (form, url) => async ( dispatch ) => {
    try
    {
        dispatch({type: REGISTER_USER_LOADING });
        const { code, message, user } = await registerRoute(form, url);

        if(code !== 200)
        {
            dispatch({type: REGISTER_USER_FAILURE, payload: message});
            return { code, message };
        } 

        dispatch({type: REGISTER_USER_SUCCESS, payload: user})
        return { code, message };
    }
    catch(err)
    {
        console.error(err.message);
        dispatch({type: REGISTER_USER_FAILURE, payload: err.message});
    };
};


export const addNewUserAction = (form, url) => async ( dispatch ) => {
    try
    {
        dispatch({type: ADD_NEW_USER_LOADING });
        const { code, message, user } = await addNewUserRoute(form, url);

        if(code !== 200)
        {
            dispatch({type: ADD_NEW_USER_FAILURE, payload: message});
            return { code, message };
        } 

        dispatch({type: ADD_NEW_USER_SUCCESS, payload: user})
        return { code, message };
    }
    catch(err)
    {
        console.error(err.message);
        dispatch({type: ADD_NEW_USER_FAILURE, payload: err.message});
    };
};


export const editUserAction = (form, url) => async ( dispatch ) => {
    try
    {
        dispatch({type: EDIT_USER_LOADING });
        const { code, message, users, user } = await editUserRoute(form, url);

        if(code !== 200)
        {
            dispatch({type: EDIT_USER_FAILURE, payload: message});
            return { code, message };
        } 

        dispatch({type: EDIT_USER_SUCCESS, payload: { users, user }})
        return { code, message };
    }
    catch(err)
    {
        console.error(err.message);
        dispatch({type: EDIT_USER_FAILURE, payload: err.message});
    };
};


export const deleteUserAction = (_id, url) => async ( dispatch ) => {
    try
    {
        dispatch({type: DELETE_USER_LOADING });
        const { code, message, users } = await deleteUserRoute(_id, url);

        if(code !== 200)
        {
            dispatch({type: DELETE_USER_FAILURE, payload: message});
            return { code, message };
        } 

        dispatch({type: DELETE_USER_SUCCESS, payload: users})
        return { code, message };
    }
    catch(err)
    {
        console.error(err.message);
        dispatch({type: DELETE_USER_FAILURE, payload: err.message});
    };
};

// TODO: Add the types to the reducer that handle the data and the error.
export const disconnectUserAction = (user, url) => async ( dispatch ) => {
    try
    {
        const { code, message, user: updatedUser } = await disconnectUserRoute(user, url);

        if(code !== 200)
        {
            dispatch({type: DISCONNECT_USER_FAILURE, payload: message});
            return { code, message };
        } 

        dispatch({type: DISCONNECT_USER_SUCCESS, payload: updatedUser})
        return { code, message };
    }
    catch(err)
    {
        console.error(err.message);
        dispatch({type: DELETE_USER_FAILURE, payload: err.message});
    };
};