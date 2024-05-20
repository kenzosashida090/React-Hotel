import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email,password})=> loginApi({email,password}),
        onSuccess:(user)=> {
            queryClient.setQueriesData(["user"], user); // set this data to the react query cache.
            //This setQueriesData will avoid to fetch the user session and instead will store in the cahce.
            navigate('/dashboard')
           
        }, 
        onError : err =>{
            console.log(err)
            toast.error("Provided email or password are incorrect.")
        }
    })

    return {login, isLoading}
}