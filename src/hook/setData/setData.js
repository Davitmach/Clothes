import { useMutation } from "@tanstack/react-query";
function SetData(func,key) {

const {mutate,error,isSuccess,data} = useMutation({
    mutationFn:(data)=>func(data),
    mutationKey:[key],
  
})

return{mutate,error,isSuccess,data}
}
export default SetData;