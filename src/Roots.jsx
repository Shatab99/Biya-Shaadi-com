import { Outlet } from "react-router-dom";
import NavBar from "./Components/Pages/home/NavBar";
import Footer from "./Components/Footer/Footer";



const Roots = () => {
    return (
        <NavBar>
            <Outlet />
            <Footer/>
        </NavBar>
    );
};

export default Roots;