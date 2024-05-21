import { useMutation } from "@tanstack/react-query"
import { signUp as signUpApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

function useSignUp() {
 const{mutate:signUp, isLoading} = useMutation({
    mutationFn: signUpApi,
    onSuccess:(data)=> {
        toast.success("Account successfully craeted! Please verify the new account from the user's email address")
    } 
})
    return {signUp, isLoading}
}

export default useSignUp
