import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useFriends = ({requestEmail}) => {
    const {data : friends=[]}= useQuery({
        queryKey : ['friends',requestEmail],
        queryFn : async()=>{
            const res = await axios.get(`http://localhost:5000/friends?email=${requestEmail}`)
            return res.data
        }
    })
    return {friends}
};

export default useFriends;