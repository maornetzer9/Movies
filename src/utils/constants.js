import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

// Permissions
export const PERMISSIONS = [
    "View-Subscriptions",
    "Update-Subscriptions",
    "Create-Subscriptions",
    "Delete-Subscriptions",
    "View-Movies",
    "Create-Movies",
    "Update-Movies",
    "Delete-Movies",
];

export const MENU = [
    { 
        id: 1,
        path: '/movies', 
        label: 'Movies', 
        icon: MovieFilterOutlinedIcon,
    },
    { 
        id: 2,
        path: '/subscriptions', 
        label: 'Subscriptions', 
        icon: SubscriptionsOutlinedIcon,
    },
    { 
        id: 3,
        path: '/users', 
        label: 'Users Management', 
        icon: ManageAccountsOutlinedIcon,
    },
    { 
        id: 4,
        path: '/', 
        label: 'Disconnect', 
        icon: ExitToAppOutlinedIcon,
    },
];

// UI Menu Settings
export const DRAWER_DIRECTION = [ 'Left', 'Right', 'Top', 'Bottom' ];