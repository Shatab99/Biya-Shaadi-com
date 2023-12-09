import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useEachFullBiodata = ({ email }) => {
    const { data: eachBiodata = {}, isLoading, refetch } = useQuery({
        queryKey: ['biodata', email],
        queryFn: async () => {
            const res = await axios.get(`https://shaadi-server.vercel.app/members/biodata/${email}`)
            return res.data;
        }
    })
    return { eachBiodata, isLoading, refetch }
};

export default useEachFullBiodata;