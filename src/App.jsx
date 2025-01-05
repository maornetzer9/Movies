import { Routes, Route, Outlet } from "react-router-dom";
import DrawerModel from "./components/UI/DrawerModel";
import Login from "./components/Login";
import Users from "./components/Admin-Components/Users";
import Movies from "./components/Movies-Components/Movies";
import Register from "./components/Register";
import Subscriptions from "./components/Members-Components/Subscriptions";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionTimeout from "./components/SessionTimeout";

export const CINEMA = import.meta.env.VITE_CINEMA_WB;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const SUBSCRIPTIONS = import.meta.env.VITE_SUBSCRIPTIONS_WB;

// TODO: Change the username to work base on a token
function App() {
    // const username = JSON.parse(localStorage.getItem('username'));


    const Layout = () => {
        return (
            <>
                <SessionTimeout>
                <DrawerModel />
                <Outlet />
                </SessionTimeout>
            </>
        );
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<Layout />}>
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:movieId" element={<Movies />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />

                {/* Admin Protected Route for Users */}
                    {/* <Route element={<ProtectedRoute allowedRoles={['Admin']} />}> */}
                        <Route element={<Layout />}>
                            <Route path="/users" element={<Users />} />
                        </Route>
                    </Route>
                {/* </Route> */}
            </Routes>
        </>
    );
}

export default App;
