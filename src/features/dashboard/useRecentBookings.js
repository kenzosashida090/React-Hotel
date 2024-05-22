import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings"

function useRecentBookings() {
    const [searchParams] = useSearchParams()

    const numDay = !searchParams.get("last") ? 7 : Number(searchParams.get( "last" ))
    const queryDate = subDays(new Date(), numDay).toISOString()
    console.log(queryDate)
    //Substract day from today
    // let date = new Date()
    // date.setDate(date.getDate() - 7)
    // console.log(date.toString())

    const {isLoading, data: bookings} = useQuery({
        queryFn: ()=> getBookingsAfterDate(queryDate),
        queryKey:["bookings", `last-${numDay}`]
    })

    return {isLoading, bookings}
}

export default useRecentBookings

