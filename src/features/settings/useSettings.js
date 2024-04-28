import { useQuery } from "@tanstack/react-query";
import {getSettings} from "../../services/apiSettings"
export function useSettings (){
    const {isLoading, error, data:settings} = useQuery({
        queryKey:["settings"],  // unique key
        queryFn:getSettings,

    }) 
    return{ isLoading, error, settings}
}