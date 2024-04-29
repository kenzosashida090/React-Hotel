import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting } from "../../services/apiSettings"
import toast from "react-hot-toast"

function useUpdateSettings() { //could ve more or one setting
    const queryClient = useQueryClient()
    const {mutate:updateSettings,isLoading: isEditing} = useMutation({ //Create a mutation to create a new cabin
        mutationFn: updateSetting, // to accept more than one argument unlike the createCabin
        onSuccess: ()=> {
          toast.success("Setting successfully edited")
          queryClient.invalidateQueries({queryKey:["settings"]}) // invalidateQueries trigger a new render and updated the ui
         
        },
        onError: (error)=> toast.error(error.message)
      })
    return { isEditing, updateSettings}
}

export default useUpdateSettings
