import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaUsers, FaUserEdit } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { BiSolidContact } from "react-icons/bi";
import { FaRegFaceGrinStars } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";



const NavDash = ({ children }) => {

    const {member} =useAdmin()
    console.log(member)
    const isAdmin = member?.role
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content  mt-8">
                <label htmlFor="my-drawer-2" className=" lg:hidden absolute  -top-11 text-3xl left-5"><GiHamburgerMenu /></label>
                {children}

            </div>
            <div className="drawer-side min-h-full z-50">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#F7D6D6] text-base-content">
                    {/* Sidebar content here */}
                    {
                        isAdmin === 'admin' ?
                            <>
                                <h1 className="font-luxurious text-4xl mb-8">Admin Settings </h1>
                                <li><Link to={'/dashboard/userhome'}><RiUserStarFill />Admin Biodata</Link></li>
                                <li><Link to={'/dashboard/manageusers'}><MdManageAccounts />Manage Users</Link></li>
                                <li><Link to={'/dashboard/premiumrequests'}><MdWorkspacePremium />Premium User Requests</Link></li>
                                <li><Link to={'/dashboard/editbiodata'}><FaUserEdit />Edit Admin Biodata</Link></li>
                                <li><Link to={'/dashboard/mycontacts'}><BiSolidContact />Admin Contacts Requests</Link></li>
                                <li><Link to={'/dashboard/favourites'}><FaRegFaceGrinStars />Admin Favourites</Link></li>
                                <div className="divider"></div>
                                <li><Link to={'/'}><FaHome />Home</Link></li>
                                <li><Link to={'/biodata'}><FaUsers />Biodata</Link></li>
                            </>
                            :
                            <>
                                <h1 className="font-luxurious text-4xl mb-8">User Settings </h1>
                                <li><Link to={'/dashboard/userhome'}><RiUserStarFill />View Biodata</Link></li>
                                <li><Link to={'/dashboard/editbiodata'}><FaUserEdit />Edit Biodata</Link></li>
                                <li><Link to={'/dashboard/mycontacts'}><BiSolidContact />Contacts Requests</Link></li>
                                <li><Link to={'/dashboard/favourites'}><FaRegFaceGrinStars />Favourites</Link></li>
                                <div className="divider"></div>
                                <li><Link to={'/'}><FaHome />Home</Link></li>
                                <li><Link to={'/biodata'}><FaUsers />Biodata</Link></li>
                            </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default NavDash;