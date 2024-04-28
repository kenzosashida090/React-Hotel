import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";


function useDeleteCabin() {
  const queryClient = useQueryClient(); // Get the instance of the queryClient 
  const {isLoading:isDeliting, mutate: deleteCabin}=useMutation({
  mutationFn:deleteCabinApi, // (id)=> deleteCabin(id) the same thing
  onSuccess:()=>{ 
    toast.success("Cabin successfully  deleted");
    queryClient.invalidateQueries({
      queryKey:["cabin"]
    }) //InvalidateQueries will tell to react query that the cache is not valid anymore so it needs to fetch the data again
  }, //tell react query  what to do as soon as the mutation was successfull
  onError:(err)=> toast.error(err.message),
}) // useMutation hook (reactQuery) allows to mutate data like delete,update an item, this will return a isLoading state and a mutate function taht we can use on the button

return {isDeliting, deleteCabin}// return isloading and mutate
}

export default useDeleteCabin