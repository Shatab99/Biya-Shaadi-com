import { useContext } from "react";
import useCheckMembers from "../Hooks/useCheckMembers";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import animationLoading from '../../Animations/Animation - Loading.json'
import Lottie from "lottie-react";


const ValidUserRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    const { checkUsers, isLoading } = useCheckMembers()

    const checkUser = checkUsers.map(user => { return user.email })
    console.log(checkUser)

    if(isLoading){
        return <div className="max-w-xs mx-auto"><Lottie animationData={animationLoading} /></div>
    }
    if(checkUser.includes(user.email)){
        return children
    }

    return <Navigate to={'/notFoundUser'}/>


};

export default ValidUserRoute;