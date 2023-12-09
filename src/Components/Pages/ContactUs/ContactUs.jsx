import { Helmet } from "react-helmet-async";


const ContactUs = () => {
    return (
        <div className="my-8 px-4 lg:px-0">
            <Helmet><title>Contact Us</title></Helmet>
            <h1 className="text-3xl text-center font-semibold">Contact Us</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 max-w-5xl mx-auto gap-5 my-12">
                <div className="p-12   border-2 rounded-lg ">
                    <h1 className="text-center text-4xl font-semibold font-luxurious">Email</h1>
                    <p className="text-center "><a href="">shatabag4749@gmail.com</a></p>
                </div>
                <div className="p-12 border-2 rounded-lg ">
                    <h1 className="text-center text-4xl font-semibold font-luxurious">Contact Number</h1>
                    <p className="text-center "><a href="">+88017*******</a></p>
                </div>
                <div className="p-12 border-2 rounded-lg ">
                    <h1 className="text-center text-4xl font-semibold font-luxurious">Location</h1>
                    <p className="text-center ">Bashbari Road, Mohammadpur , Dhaka 1204</p>
                </div>
            </div>
            <div className="mb-12 max-w-3xl p-12 border-2 rounded-xl mx-auto">
                <h1 className="text-center text-4xl font-semibold font-luxurious">Feel Free To Contact</h1>
                <p className="text-center ">Open Every Day</p>
                <p className="text-center p-12">If any bug you see or you have better suggestions feel free contact on my email</p>
            </div>
        </div>
    );
};

export default ContactUs;