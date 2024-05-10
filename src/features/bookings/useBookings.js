import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

//To filter the booking section we set the filters right on the Query hook
// To filter will access to the url
export function useBookings(){
    //1)Access to the params of the url
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    
    
    // Filter
    const filteredValue = searchParams.get("status");
    const filter = !filteredValue || filteredValue === "all" ? null: {field:"status", value:filteredValue}
    
    //const filter = !filteredValue || filteredValue === "all" ? null: {field:"status", value:filteredValue, method:"gte"}
    //we can pass also the method if we want an eq or gt or gte to make it more dinamically
    
    // SORT
     const sortByRaw = searchParams.get("sortBy") || "start_date-desc"
     const [field, direction] = sortByRaw.split("-")
    
    const sortBy = {field,direction}
    
    // PAGINATION
    const page = !searchParams.get("page") ? 1: Number(searchParams.get("page"));
    const {
        isLoading,  // Are we currently loading,
        data:{data:bookings, count} = {}, // set an empty object as a default value to avoid undefined errors
        error
    } = useQuery({
        queryKey: ["bookings",filter,sortBy,page], // to update eachtime that we set a filter 
        //We can think that the queryKey array is a dependencie array
        queryFn:()=>getBookings({filter, sortBy,page})
    }) 
    const pageCount = Math.ceil(count/ PAGE_SIZE)
    //PRE-FETCHING
    if(page < pageCount) {
        queryClient.prefetchQuery({
            queryKey:["bookings", filter, sortBy, page +1],
            queryFn: ()=>getBookings({filter, sortBy,  page : page+1})
        }) // pre-fetching data from the pagination
    }
    if(page > 1) {
        queryClient.prefetchQuery({
            queryKey:["bookings", filter, sortBy, page - 1],
            queryFn: ()=>getBookings({filter, sortBy,  page : page - 1})
        }) // pre-fetching data from the pagination
    }
    return {isLoading, bookings, error,count}
}