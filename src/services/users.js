import { CINEMA } from "../App";
import { addNewUserAction, deleteUserAction, disconnectUserAction, editUserAction, loadingUsersAction, LoginAction, registerAction } from "../actions/users";

export const registerService = async (form, dispatch) => {
    try
    {
        const REGISTER = `${CINEMA}/users/register`;
        const { code, message } = await dispatch(registerAction(form, REGISTER));
        return { code, message };
    }

    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const loginService = async (username, password, dispatch) => {

    try
    {
        const LOGIN_PATH = `${CINEMA}/users/login`;
        const { code, message } = await dispatch( LoginAction(username, password, LOGIN_PATH) );
        return { code, message };
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const loadingUsers = async (dispatch) => {
    try 
    {
        const LOADING_USERS = `${CINEMA}/users/`;
        await dispatch(loadingUsersAction(LOADING_USERS));
    } 
    catch(err) 
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const addNewUserService = async (form, dispatch) => {
    try
    {
        const ADD_NEW_USER = `${CINEMA}/users/add`;
        const { code, message } = await dispatch(addNewUserAction( form, ADD_NEW_USER ));
        return { code, message }
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
}


export const deleteUserById = async (_id, dispatch) => {
    if (!_id) return setLocalError('Id cannot be provided');
    try 
    {
        const DELETE_USER = `${CINEMA}/users/delete`;
        await dispatch(deleteUserAction(_id, DELETE_USER));
    } 
    catch(err) 
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const editUserService = async ( form, dispatch ) => {
    try
    {
        const EDIT_USER = `${CINEMA}/users/edit`
        const { code } = await dispatch(editUserAction(form, EDIT_USER));
        return { code }
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const disconnectUserService = async (user, dispatch) => {
    try
    {
        const EDIT_USER = `${CINEMA}/users/disconnect`
        const { code } = await dispatch(disconnectUserAction(user, EDIT_USER));
        return { code }
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
}