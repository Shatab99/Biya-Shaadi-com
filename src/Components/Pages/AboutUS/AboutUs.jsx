import { Helmet } from "react-helmet-async";


const AboutUs = () => {
    return (
        <div className="my-8 px-4 lg:px-0">
            <Helmet><title>About US</title></Helmet>
            <h1 className='text-center text-3xl font-semibold'>About US</h1>
            <div className="p-12 max-w-xl mx-auto my-12 border-2 rounded-xl">
                <p className="font-luxurious text-6xl font-bold animate-bounce">Welcome to ShaadiBiya.Com</p>
            </div>
            <div className="max-w-4xl flex flex-col mx-auto mb-12">
                <h1 className="font-luxurious text-5xl font-semibold text-center mb-6">A  Success  Story</h1>
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    <img src="https://img.freepik.com/free-photo/close-up-confident-male-employee-white-collar-shirt-smiling-camera-standing-self-assured-against-studio-background_1258-26761.jpg" alt="" className="w-1/2" />
                    <img src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg" alt="" className="w-1/2" />
                </div>
                <div className="my-12 space-y-7">
                    <p>
                        Meet Alex and Emily, a couple whose love story found its perfect beginning on [Your Marriage Website], the online platform dedicated to helping individuals find their life partners.
                    </p>
                    <h1 className="text-3xl font-semibold">
                        The Serendipitous Connection
                    </h1>
                    <p>
                        Alex, a software engineer with a passion for photography, and Emily, a marketing professional with a love for adventure, each found themselves on ShaadiBiya.Com in pursuit of a meaningful connection. Little did they know that their lives were about to change forever.
                    </p>
                    <h1 className="text-3xl font-semibold">
                        <h1 className="text-3xl font-semibold">
                            The Serendipitous Connection
                        </h1>
                    </h1>
                    <p>
                        As Alex and Emily explored profiles on ShaadiBiya.com , they were drawn to each other's profiles by shared values and common interests. Alex's love for capturing moments through his camera resonated with Emily's adventurous spirit, creating an instant connection.
                    </p>
                    <h1 className="text-3xl font-semibold">
                        Meaningful Conversations
                    </h1>
                    <p>
                        Their journey began with exchanging messages on the platform. From discussing their favorite travel destinations to sharing their dreams for the future, Alex and Emily found themselves engrossed in meaningful conversations that went beyond the surface.
                    </p>
                    <h1 className="text-3xl font-semibold">
                        A Picture-Perfect Proposal
                    </h1>
                    <p>
                        After months of getting to know each other, Alex decided it was time to take their connection to the next level. With the help of ShaadiBiya.Com personalized planning tools, he orchestrated a surprise proposal during a romantic getaway, capturing the moment through his lens.
                    </p>

                    <h1 className="text-xl animate-pulse font-semibold text-center">That's How they meet and make life partner each other</h1>

                </div>

            </div>
        </div>
    );
};

export default AboutUs;