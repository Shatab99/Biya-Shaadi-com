import { Outlet } from "react-router-dom";
import NavDash from "./NavDash";
import NavTopDash from "./NavTopDash";


const Dashboard = () => {
    return (
        <div className="">
            <NavTopDash/>
            <div className="">
                <NavDash>
                    <Outlet/>
                </NavDash>
            </div>
        </div>
    );
};

export default Dashboard;