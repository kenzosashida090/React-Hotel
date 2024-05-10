import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

//To filter the booking section we set the filters right on the Query hook
// To filter will access to the url
export function useBookings(){
    //1)Access to the params of the url
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

    return {isLoading, bookings, error,count}
}