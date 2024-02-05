import { Link } from "react-router-dom";

const NotfoundUser = () => {
    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen text-2xl font-bold text-red-700">
            <p>User not Found ! </p>
            <p>Your account maybe Banned from this web Page </p>
            <Link to='/login' className="text-blue-700 hover:border-b-2 border-black">Get back to Sign in page</Link>
        </div>
    );
};

export default NotfoundUser;