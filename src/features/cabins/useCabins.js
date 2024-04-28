import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../../services/apiCabins"

function useCabins() {
    const {isLoading, data: cabins, error} =  useQuery({
        queryKey: ["cabin"], //identify the data that we want to query
        queryFn: getCabins //Function that actually queries the data return a promise
    
      }) // fetch the data to the cabins 
    
    return {isLoading, cabins,error}
}

export default useCabins
