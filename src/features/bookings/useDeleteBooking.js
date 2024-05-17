import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"
import toast from "react-hot-toast"
function useDeleteBooking() {
  const queryClient = useQueryClient() //get the instance of the query client
  const {isLoading: isDeletingBooking, mutate:deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess:()=>{
        toast.success("Booking successfully deleted");
        queryClient.invalidateQueries({ queryKey: ["bookings"]}) //invalidate the query cache to refresh
    },
    onError:(err) => toast.error(err.message)
 })
 return {isDeletingBooking, deleteBooking}
}

export default useDeleteBooking
