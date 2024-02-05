import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useMembers = ({select}) => {
    const{data : members = [], isLoading, refetch}= useQuery({
        queryKey :['members',select],
        queryFn : async ()=>{
            const res =await axios.get(`http://localhost:5000/members/${select}`)
            return res.data
        }
    })
    console.log('Members : ',members, select)
    return [members, isLoading, refetch]

};

export default useMembers;