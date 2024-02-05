import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useSearch = ({searchTerm}) => {
    const {data : searchResult=[], isLoading, refetch}=useQuery({
        queryKey : ['searchResult', searchTerm],
        queryFn : async()=>{
            const res =await axios.get(`http://localhost:5000/search?q=${searchTerm}`)
            return res.data
        }
    })
    return {searchResult, isLoading, refetch}
};

export default useSearch;