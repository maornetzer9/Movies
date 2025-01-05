export const BUTTON_PERMISSION_LOADING  = 'BUTTON_PERMISSION_LOADING';
export const BUTTON_PERMISSION_SUCCESS  = 'BUTTON_PERMISSION_SUCCESS';
export const BUTTON_PERMISSIONS_FAILURE = 'BUTTON_PERMISSIONS_FAILURE';

export const buttonsPermissionsAction = ( getUserButtonsPermissions = () => {}, username = '' ) => async (dispatch) => {
    try
    {
        const permissions = await getUserButtonsPermissions(username);
        dispatch({ type: BUTTON_PERMISSION_LOADING }); 

        if(!permissions)
        {
            dispatch({ type: BUTTON_PERMISSIONS_FAILURE }); 
        }

        dispatch({ type: BUTTON_PERMISSION_SUCCESS, payload: permissions }); 
    }
    catch(err)
    {
        console.error(err.message);
    }
};