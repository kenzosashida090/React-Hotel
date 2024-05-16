import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

function useCheckin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {bookingIdParams}=useParams()
  const {mutate:checkin, isLoading: isCheckingIn}=useMutation({
    mutationFn: ({ bookingId, breakfast})=>updateBooking(bookingId,{
        status:"checked-in",
        is_paid:true,
        ...breakfast
    }),
    onSuccess:(data)=>{
        toast.success(`Booking #${data.booking_id} successfully checked in`
        );
        queryClient.invalidateQueries({active:true});
        navigate("/")
    },
    onError: ()=> toast.error(`There was an error while checking in `)

  })
  return {checkin, isCheckingIn}
}

export default useCheckin
