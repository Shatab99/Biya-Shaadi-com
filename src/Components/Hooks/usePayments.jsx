import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const usePayments = () => {
    const {data : paymentUsers =[], isLoading, refetch }= useQuery({
        queryKey : ['paymentUsers'],
        queryFn : async()=>{
            const res = await axios.get('https://shaadi-server.vercel.app/payments')
            return res.data;
        }
    })

    return {paymentUsers, isLoading, refetch}
};

export default usePayments;