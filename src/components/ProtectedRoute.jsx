import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence  } from 'framer-motion';
import Loader from '../components/UI/Loader';

// TODO: Make this component replace the sessionTimeout component and work base on a token.
const ProtectedRoute = ({ allowedRoles }) => {
    const token = JSON.parse(localStorage.getItem('token')) || '';
    const username = JSON.parse(localStorage.getItem('username'));

    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(true);
    const [ isAuthorized, setIsAuthorized ] = useState(false);

    useEffect(() => {
        // if (!token) {
        //     setLoading(false);
        //     setIsAuthorized(false);
        //     return;
        // }
        
        const handleAuthorization = async () => {
            try 
            {
                // Assuming an authentication action or a role check
                if (allowedRoles.includes(username)) 
                {
                    setIsAuthorized(true);
                } 
                else 
                {
                    setIsAuthorized(false);
                }
            } 
            catch(error) 
            {
                console.error('Authorization failed:', error);
                setIsAuthorized(false);
            } 
            finally 
            {
                setLoading(false);
            }
        };

        handleAuthorization();
    }, [ dispatch, allowedRoles, username]);

    if (loading) return <Loader />;

    return isAuthorized ? (
        <AnimatePresence mode="wait">
                <Outlet />
        </AnimatePresence>
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;
