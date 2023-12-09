import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const CheckOutForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const price = parseInt(500)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axios.post('https://shaadi-server.vercel.app/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setSuccess('')
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);

        }

        //confirm
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'unknown',
                    name: user.displayName || 'unknown'
                }
            }
        })

        if (paymentError) {
            console.log('Payment Error', paymentError)
        }
        else {
            console.log("[Payment Intend]", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setSuccess(`Successfully Paid .Transaction id is ${paymentIntent.id}`)
                setError('')
                Swal.fire({
                    title: "Payment Done!",
                    imageUrl: "https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif",
                    imageWidth: 300,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                });
                elements.getElement(CardElement).clear();
            }
        }


        //save to database 
        const payment = {
            email: user.email,
            price,
            date: new Date(),
            name: user.displayName,
            photo: user.photoURL,
            transactionId: paymentIntent.id,
            status: 'pending'
        }

        const res = await axios.post('https://shaadi-server.vercel.app/payments', payment)
        console.log('Payment Saved', res.data)


    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className="btn bg-red-900 text-white hover:text-black mt-12 btn-wide" disabled={!stripe || !clientSecret}>
                Pay tk. 500
            </button>
            <p className="text-red-800 font-semibold mt-8">{error}</p>
            <p className="text-green-800 font-semibold mt-8">{success}</p>
        </form>
    );
};

export default CheckOutForm;