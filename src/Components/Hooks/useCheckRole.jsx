import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCheckRole = ({checkEmail}) => {
    const {data : checkRole ={}, isLoading , refetch}= useQuery({
        queryKey : ['checkRole', checkEmail],
        queryFn : async()=>{
            const res = await axios.get(`http://localhost:5000/members/checkrole/${checkEmail}`)
            return res.data
        }
    })
    return {checkRole, isLoading, refetch}
};

export default useCheckRole;