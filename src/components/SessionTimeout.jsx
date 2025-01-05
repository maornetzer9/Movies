import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { disconnectUserService } from "../services/users";

const SessionTimeout = ({ children }) => {
    const { user } = useSelector((state) => state.userReducer);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Memoized initialization of the timeout state
    const initialTimeout = useMemo(() => {
        const savedTimeout = localStorage.getItem('sessionTimeoutRemaining');
        return savedTimeout
            ? JSON.parse(savedTimeout)
            : JSON.parse(localStorage.getItem('sessionTimeout')) || 0;
    }, []);

    const [timeout, setTimeoutValue] = useState(initialTimeout);

    // Memoize expiration time calculation
    const calculateExpirationTime = useCallback(() => {
        return Date.now() + timeout * 60 * 1000; // Convert to milliseconds
    }, [timeout]);

    // Save session data to localStorage
    const saveSessionData = useCallback(() => {
        const expirationTime = calculateExpirationTime();
        localStorage.setItem('sessionTimeoutRemaining', JSON.stringify(timeout));
        localStorage.setItem('sessionExpirationTime', expirationTime.toString());
    }, [timeout, calculateExpirationTime]);


    useEffect(() => {

        saveSessionData();

        const logoutTimer = setTimeout(async () => {
            try 
            {
            const localUsername = JSON.parse(localStorage.getItem('username') || '');
            const isAdmin = localUsername === 'Admin' ? true : false
                
            if (isAdmin) return;

                const timeout = Math.round(JSON.parse(localStorage.getItem('sessionTimeoutRemaining')));
                const updatedUser = {...user, sessionTimeout: timeout};
                delete updatedUser.permissions

                alert("Session expired. Please log in again.");
                await disconnectUserService(updatedUser, dispatch);
                localStorage.clear(); 
                
                navigate("/");
            }
            catch(err) 
            {
                console.error("Error during user disconnection:", err.message);
                alert("An error occurred while disconnecting. Please try logging in again.");
                localStorage.clear(); // Ensure session is cleared even if disconnection fails
                navigate("/");
            }
        }, timeout * 60 * 1000);


        return () => clearTimeout(logoutTimer); // Cleanup the timeout on unmount
    }, [timeout, navigate, saveSessionData, user._id, dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
        const expirationTime = localStorage.getItem('sessionExpirationTime');
            if (expirationTime) 
            {
                const remainingTime = Math.max(
                    (parseInt(expirationTime, 10) - Date.now()) / (60 * 1000), // Convert to minutes
                    0
                );
                setTimeoutValue(remainingTime);
            }
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);
    
    return <>{children}</>;
};

export default SessionTimeout;
