import Lottie from 'lottie-react';
import loginAnimation from './loginAnimation.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { FaGoogle } from "react-icons/fa6";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';


const LogIn = () => {
    const { logInUser, googleSign } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location?.state)
    const handleGoogle = () => {
        googleSign()
            .then(res => {
                console.log(res.user)
                const userInfo = {
                    name: res.user.displayName, email: res.user.email,
                    profile_pic: res.user.photoURL
                }
                axios.post('https://shaadi-server.vercel.app/members', userInfo)
                    .then(res => {
                        console.log(res.user)
                        navigate(location?.state ? location?.state : '/')

                    })

            })
            .catch(err => {
                console.log(err.message)
            })
    }


    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logInUser(email, password)
            .then(res => {
                console.log(res.user)
                Swal.fire({
                    icon: 'success',
                    title: 'Done !!',
                    text: 'Successfully Signed In ',
                })
                form.reset()
                navigate(location?.state ? location?.state : '/')
            })
            .catch(err => {
                console.log(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.message}`
                })
            })
    }


    return (
        <div className='flex flex-col lg:flex-row my-12 justify-center items-center gap-5 p-4 max-w-4xl mx-auto rounded-2xl'>
            <Helmet><title>Sign In</title></Helmet>
            <div>
                <Lottie animationData={loginAnimation}></Lottie>
            </div>
            <div className='border-2  p-4 rounded-xl shadow-2xl '>
                <h1 className='text-center text-3xl font-bold mb-6'>Sign In Please !!</h1>
                <form onSubmit={handleLogIn} className='flex flex-col gap-y-3'>
                    <input type="email" name='email' placeholder="Enter Email" className="input input-bordered w-full max-w-xs" />
                    <input type="password" name='password' placeholder="Enter Password" className="input input-bordered w-full max-w-xs" />
                    <input type="submit" className='btn bg-gray-800 text-white hover:text-black ' value="sign in" />
                </form>
                <p className='my-4'>Have no account ? <Link to='/signup' className='text-blue-900 font-semibold' >Sign Up</Link> </p>
                <div className="divider">OR</div>
                <div className='flex justify-center'>
                    <button onClick={handleGoogle} className="btn  btn-outline ">
                        <FaGoogle></FaGoogle>
                        Continue with google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogIn;