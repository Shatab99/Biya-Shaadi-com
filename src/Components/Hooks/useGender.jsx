import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGender = ({gender}) => {
    const { data: genders = [], isLoading, refetch } = useQuery({
        queryKey: ['members', gender],
        queryFn: async () => {
            const res = await axios.get(`https://shaadi-server.vercel.app/members/gender/${gender}`)
            return res.data
        }
    })
   
    return [genders, isLoading, refetch]

};


export default useGender;