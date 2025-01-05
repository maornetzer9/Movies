import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { loadingUsersAction } from "../actions/users";
import { CINEMA } from "../App";
import { MENU } from "../utils/constants";

/**
 * Custom hook for loading users and managing permissions.
 */

export const usePermissions = () => {
    const dispatch = useDispatch();
    const [ authorize, setAuthorize ] = useState(null); // Start with null to indicate loading state

    const loadingUsers = useCallback(async () => {
        try 
        {
            const USERS = `${CINEMA}/users/`;
            const { code, users } = await dispatch(loadingUsersAction(USERS));

            if (code === 200) return users || [];
        }
        catch(err) 
        {
            console.error(err.message);
        }
        return [];
    }, [dispatch]);

    /**
     * Check if a user is authorized for movies or subscriptions based on their permissions.
     */
    const getUserPermissions = useCallback(async (username) => {
        const users = await loadingUsers();
        const isAdmin = username === "Admin";

        const user = users.find((user) => user.username === username);
        if (!user && !isAdmin) 
        {
            const auth = { movies: false, subscription: false, admin: false };
            setAuthorize(auth);
            return auth;
        }

        const hasMoviesPermission = user?.permissions.some((perm) =>
            ["View-Movies", "Create-Movie", "Update-Movie", "Delete-Movies"].includes(perm)
        );

        const hasSubscriptionsPermission = user?.permissions.some((perm) =>
            ["View-Subscriptions", "Create-Subscriptions", "Update-Subscriptions", "Delete-Subscriptions"].includes(perm)
        );

        const auth = {
            movies: hasMoviesPermission || isAdmin, // Admin has movies access
            subscription: hasSubscriptionsPermission || isAdmin, // Admin has subscription access
            admin: isAdmin, // Admin always has access to Users Management
        };

        setAuthorize(auth); // Update the authorize state
        return auth;
    }, [loadingUsers]);

     /**
     * Check if the user is authorized to create delete or edit movie or subscriptions base on there permissions.
     */
    const getUserButtonsPermissions = useCallback(async (username) => {
        const users = await loadingUsers();
        const isAdmin = username === "Admin";

        const user = users.find((user) => user.username === username);

        if (!user && !isAdmin) 
        {
            // Default permissions
            return {
                movies: { create: false, update: false, delete: false },
                subscriptions: { create: false, update: false, delete: false },
            };
        }

        const hasPermission = (permissions, key) => permissions.includes(key) || isAdmin;
        
        return {
            movies: {
                create: hasPermission(user?.permissions || [], 'Create-Movies'),
                update: hasPermission(user?.permissions || [], 'Update-Movies'),
                delete: hasPermission(user?.permissions || [], 'Delete-Movies'),
            },
            subscriptions: {
                create: hasPermission(user?.permissions || [], 'Create-Subscriptions'),
                update: hasPermission(user?.permissions || [], 'Update-Subscriptions'),
                delete: hasPermission(user?.permissions || [], 'Delete-Subscriptions'),
            },
        };
        
    }, [loadingUsers]);
    

    /**
     * Filters the menu items based on user permissions.
     */
    const getFilteredMenu = useCallback((isAuthorize) => {
        return MENU.filter((item) => {
            if (item.label === 'Movies') return isAuthorize.movies; // Show "Movies" based on permission
            if (item.label === 'Subscriptions') return isAuthorize.subscription; // Show "Subscriptions" based on permission
            if (item.label === 'Users Management') return isAuthorize.admin; // Show "Users Management" only to Admin
            return true; // Keep other items like "Logout" available for all users
        });
    }, []);

    return { 
        loadingUsers, 
        getUserPermissions, 
        getUserButtonsPermissions, 
        getFilteredMenu, 
        authorize, 
    };
};