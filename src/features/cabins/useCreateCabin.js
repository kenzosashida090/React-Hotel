import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient(); // Get the isntance of the queryClient to re render whenever whe create a new cabin 
  const {mutate:createCabin,isLoading: isCreating} = useMutation({ //Create a mutation to create a new cabin
    mutationFn: createEditCabin,
      onSuccess: ()=> {
        toast.success("New cabin successfully created")
        queryClient.invalidateQueries({queryKey:["cabin"]}) // invalidateQueries trigger a new render and updated the ui
      },
      onError: (error)=> toast.error(error.message)
    })
  return {isCreating, createCabin}
}

export default useCreateCabin
