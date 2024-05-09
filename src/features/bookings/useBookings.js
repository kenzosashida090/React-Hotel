import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings(){
    const {
        isLoading,  // Are we currently loading,
        data:bookings,
        error
    } = useQuery({
        queryKey: ["bookings"],
        queryFn:getBookings
    }) 

    return {isLoading, error , bookings}
}