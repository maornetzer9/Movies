import { Alert, Box, Tooltip } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadingMembers } from '../../services/members';
import { useLocalError } from '../../hooks/error';
import PermissionButton from '../UI/PermissionButton';
import AllMembers from './AllMembers';
import AddMember from './AddMember';
import EditMember from './EditMember';
import AddIcon from '@mui/icons-material/Add';
import Loader from '../UI/Loader';

const Members = () => {

    const dispatch = useDispatch();
    const { loading, members } = useSelector((state) => state.membersReducer);
    const { localError, setLocalError } = useLocalError();

    const [ selectedMember, setSelectedMember ] = useState(null); 
    const [ componentSelector, setComponentSelector ] = useState('All Members');

    const componentHandler = useCallback((component, member = null) => {
        setComponentSelector(component);
        setSelectedMember(member);
    }, []);


    const fetchMembers = useCallback(async () => {
        try 
        {
            if (members.length === 0) 
            {
                await loadingMembers(dispatch);
            }
        } 
        catch(err) 
        {
            console.error(err.message);
            setLocalError(err.message);
        }
    }, [dispatch, members.length, setLocalError]);


    useEffect(() => { fetchMembers(); }, [ fetchMembers ]);

    if(loading) return <Loader/>

    return (
        <Box component="div">

            { localError ? 
                <Alert
                    variant='standard'
                    severity='error'
                    sx={{display:'flex', justifyContent:'center'}}
                >
                    { localError }
                </Alert>
            : null }

            <Box component="div">
                {
                    componentSelector === 'All Members' && members.length > 0 &&
                    <AllMembers
                        members={members}
                        componentHandler={componentHandler}
                    />
                }
                {
                    componentSelector === 'Add Member' &&
                    <AddMember
                        componentHandler={componentHandler}
                        componentSelector={componentSelector}
                    />
                }
                {
                    componentSelector === 'Edit Member' && selectedMember && (
                    <EditMember
                        member={selectedMember}
                        componentHandler={componentHandler}
                    />
                )}
            </Box>
              
            <Tooltip title="Add Member">
                <PermissionButton
                    resourceType="subscriptions"
                    permissionType="create"
                    type="fab"
                    size="large"
                    color="info"
                    aria-label="add"
                    onClick={() => componentHandler('Add Member')}
                >
                    <AddIcon />
                </PermissionButton>
            </Tooltip>
        </Box>
    );
}

export default memo(Members);