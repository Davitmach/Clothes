import { useMutation } from "@tanstack/react-query";
function SetData(func,key) {

const {mutate,error,isSuccess} = useMutation({
    mutationFn:(data)=>func(data),
    mutationKey:[key]
})

return{mutate,error,isSuccess}
}
export default SetData;