import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
    const queryClient = useQueryClient()
    const {mutate:editCabin,isLoading: isEditing} = useMutation({ //Create a mutation to create a new cabin
        mutationFn: ({newCabin,id})=>createEditCabin(newCabin,id), // to accept more than one argument unlike the createCabin
        onSuccess: ()=> {
          toast.success("Cabin successfully edited")
          queryClient.invalidateQueries({queryKey:["cabin"]}) // invalidateQueries trigger a new render and updated the ui
         
        },
        onError: (error)=> toast.error(error.message)
      })
    return { isEditing, editCabin}
}

export default useEditCabin


