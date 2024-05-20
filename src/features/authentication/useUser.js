import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCrurentUser } from "../../services/apiAuth"

function useUser() {
    const {isLoading, data:user} = useQuery({
        queryKey:["user"],
        queryFn: getCrurentUser
    })

    return{isLoading, user, isAuthenticated:user?.role === "authenticated"}

}

export default useUser
