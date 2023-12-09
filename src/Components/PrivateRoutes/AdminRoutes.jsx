import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import Lottie from "lottie-react";
import loadingAnimation from "../../Animations/Animation - Loading.json"
import { Navigate, useLocation } from "react-router-dom";


const AdminRoutes = ({children}) => {
    const {user, loading}= useContext(AuthContext)
    const {member, isLoading}=useAdmin()
    const location = useLocation()

    if(loading || isLoading){
        return <div className="max-w-xs mx-auto">
            <Lottie animationData={loadingAnimation}/>
        </div>
    }
    if(user && member?.role){
        return children
    }
    return <Navigate to='/' state={location.pathname} replace/>
};

export default AdminRoutes;