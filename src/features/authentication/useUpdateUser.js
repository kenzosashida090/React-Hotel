import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCurrentUser } from "../../services/apiAuth"
import toast from "react-hot-toast"

function useUpdateUser() {
    const queryClient = useQueryClient()
    const {mutate:updateUser, isLoading:isUpdating } = useMutation({
        mutationFn:updateCurrentUser,
        onSuccess:()=>{
            toast.success("User account successfully updated");
            queryClient.invalidateQueries({queryKey:["user"]})
        },
        onError:()=>{
            toast.error("There was an error updating the user")
        }
    })
    return{updateUser, isUpdating}
}

export default useUpdateUser
