import { Outlet } from "react-router-dom";
import NavBar from "./Components/Pages/home/NavBar";
import Footer from "./Components/Footer/Footer";
import BannedMessage from "./Components/Pages/home/BannedMessage";
import { useContext } from "react";
import { AuthContext } from "./Components/Provider/AuthProvider";
import useCheckMembers from "./Components/Hooks/useCheckMembers";



const Roots = () => {

    const {user}=useContext(AuthContext)
    const {checkUsers}=useCheckMembers()

    const checkUser = checkUsers.map(user => {return user.email})
    

    return (
        <>
            {user && !checkUser.includes(user?.email) && <BannedMessage />}
            <NavBar>
                <Outlet />
                <Footer />
            </NavBar>
        </>
    );
};

export default Roots;