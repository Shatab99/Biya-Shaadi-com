import Lottie from 'lottie-react';
import loginAnimation from './loginAnimation.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa6";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const SignUp = () => {
    const { createUser, googleSign } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogle = () => {
        googleSign()
            .then(res => {
                console.log(res.user)
                const userInfo = {
                    name: res.user.displayName, email: res.user.email,
                    profile_pic: res.user.photoURL
                }
                axios.post('http://localhost:5000/members', userInfo)
                    .then(res => {
                        console.log(res.user)
                        navigate(location?.state ? location?.state : '/')
                    })

            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
            .then(res => {
                console.log(res.user)
                updateProfile(res.user, {
                    displayName: name, photoURL: photo
                })
                    .then(res => {
                        console.log("profile Updated", res)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                const userInfo = {
                    name: name, profile_pic: photo,
                    email: email
                }
                axios.post('http://localhost:5000/members', userInfo)
                    .then(res => {
                        console.log(res.user)
                        Swal.fire({
                            icon: 'success',
                            title: 'Done !!',
                            text: 'Successfully Signed Up ',
                        })
                        form.reset()
                        navigate(location?.state ? location?.state : '/')
                    })
            })
            .catch(error => {
                console.log(error.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`
                })
            })

    }


    return (
        <div className='flex flex-col lg:flex-row my-12 justify-center items-center gap-5 p-4 max-w-4xl mx-auto rounded-2xl'>
            <Helmet><title>Sign Up</title></Helmet>
            <div>
                <Lottie animationData={loginAnimation}></Lottie>
            </div>
            <div className='border-2  p-4 rounded-xl shadow-2xl '>
                <h1 className='text-center text-3xl font-bold mb-6'>Please Sign Up !!</h1>
                <form onSubmit={handleSignUp} className='flex flex-col gap-y-3'>
                    <input type="text" name='name' placeholder="Enter Username .." className="input input-bordered w-full max-w-xs" />
                    <input type="text" name='photo' placeholder="Enter Photo URl" className="input input-bordered w-full max-w-xs" />
                    <input type="email" name='email' placeholder="Enter Email" className="input input-bordered w-full max-w-xs" />
                    <input type="password" name='password' placeholder="Enter Password" className="input input-bordered w-full max-w-xs" />
                    <input type="submit" className='btn bg-gray-800 text-white hover:text-black ' value="sign up" />
                </form>
                <p className='my-4'>Already Have account ? <Link to='/login' className='text-blue-900 font-semibold' >Sign In</Link> </p>
                <div className="divider">OR</div>
                <div className='flex justify-center'>
                    <button onClick={handleGoogle} className="btn  btn-outline  ">
                        <FaGoogle></FaGoogle>
                        Continue with google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;