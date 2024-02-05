import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCheckMembers = () => {
    const {data : checkUsers =[], isLoading} = useQuery({
        queryKey : ['checkUsers'],
        queryFn : async()=>{
            const res = await axios.get('http://localhost:5000/checkmembers')
            return res.data
        }
    })

    return {checkUsers,isLoading}
};

export default useCheckMembers;