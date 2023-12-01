//component to authenticate the user before entering the home page or any other page
import React from 'react';
//outlet is the component that renders the children of the route that is being protected by this component
import { Navigate, Outlet } from 'react-router-dom';
import useUser from '../hooks/useUser';


const ProtectRoute = ({ children, redirectTo='/' }) => {
    const { isLogged } = useUser();

    if(!isLogged){
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}

export default ProtectRoute;
