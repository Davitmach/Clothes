import { useMutation, useQueryClient } from "@tanstack/react-query";
export function SetData(func,key) {

const {mutate,error,isSuccess,data} = useMutation({
    mutationFn:(data)=>func(data),
    mutationKey:[key],
  
})

return{mutate,error,isSuccess,data}
}
 

 export function SetDataWithQueryClient(func,key,queryKey) {
    const QueryClient = useQueryClient();
    const {mutate,error,isSuccess,data} = useMutation({
        mutationFn:(data)=>func(data),
        mutationKey:[key],
        onSuccess:()=> QueryClient.invalidateQueries(queryKey)
      
    })
    
    return{mutate,error,isSuccess,data} 
}
