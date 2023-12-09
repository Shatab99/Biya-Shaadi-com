import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe('pk_test_51OFunvLooRhoamnLgVy5lbLUPJnhd7LIsPKufKC8DQUJeXgJutEQcHRRApdqjdSLoqTvrxabuKHbIyCmhPnXSMNd00iIaN0Njx')
const CheckOut = () => {
    return (
        <div className="p-5">
            <h1 className="text-3xl font-semibold mb-12">Payment To Premium Membership :</h1>
            <div className="max-w-xl mx-auto ">
                <Elements stripe={stripePromise} >
                    <CheckOutForm />
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;