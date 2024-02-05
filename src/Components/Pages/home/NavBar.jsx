import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useCheckMembers from "../../Hooks/useCheckMembers";


const NavBar = ({ children }) => {

    const [stickyClass, setStickyClass] = useState('relative')
    const { user, logOut } = useContext(AuthContext)
    const { checkUsers } = useCheckMembers()

    const checkUser= checkUsers.map(user => {return user.email})

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 50 ? setStickyClass('fixed top-0 left-0 z-50') : setStickyClass('relative');
        }
    };

    const handleSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            imageUrl: 'https://cdn.dribbble.com/users/1797873/screenshots/5310497/logout.gif',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out!",
            imageWidth: 400,
            imageHeight: 300,
            background: 'black'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(res => {
                        console.log(res.user, 'Signed Out')
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                Swal.fire({
                    title: "Logged Out",
                    text: "You are Successfully Logged Out",
                    icon: "success",
                    background: 'black'
                });

            }
        });



    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className={`w-full navbar  ${stickyClass} bg-[#FE5D63]`}>
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-luxurious text-5xl ">ShaddiBiya.com</div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal items-center font-semibold">
                            {/* Navbar menu content here */}
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/biodata'}>Bio Data</Link></li>
                            <li><Link to={'/aboutus'}>About</Link></li>
                            <li><Link to={'/contactus'}>Contact Us</Link></li>
                            {
                                user ?
                                    checkUser.includes(user.email) ?
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                <div className="w-10 rounded-full">
                                                    <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                                </div>
                                            </label>
                                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                <li>
                                                    <Link to={'/dashboard/userhome'} className="justify-between">
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li><button onClick={handleSignOut}>Logout</button></li>
                                            </ul>
                                        </div>
                                        :
                                        <li><Link to={'/login'}>Sign In</Link></li>

                                    : <li><Link to={'/login'}>Sign In</Link></li>
                            }
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                {children}
            </div>
            <div className="drawer-side z-50 min-h-full">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    {
                        user ?
                            <div className="flex items-center justify-between">
                                <img src={user?.photoURL} alt="" className="w-12 h-12 rounded-full" />
                                <li><Link to={'/dashboard/userhome'}>DashBoard</Link></li>
                                <button onClick={handleSignOut} className="btn bg-red-800 text-white">Sign Out</button>
                            </div>
                            : <li><Link to={'/login'} className="btn bg-red-800 text-white ">Sign In</Link></li>
                    }
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/biodata'}>Bio Data</Link></li>
                    <li><Link to={'/aboutus'}>About</Link></li>
                    <li><Link to={'contactus'}>Contact Us</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;