import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import animationLoading from '../../Animations/Animation - Loading.json'
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext) 
    const location = useLocation()
    if(loading){
        return <div className="max-w-xs mx-auto"><Lottie animationData={animationLoading}/></div>
    }
    if(user){
        return children;
    }
    
    return <Navigate state={location.pathname} to={'/login'} replace/>
};

export default PrivateRoutes;