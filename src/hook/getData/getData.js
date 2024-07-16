import { useQuery} from "@tanstack/react-query";
function SetData(func,key) {

const {data,error,isSuccess} = useQuery({
    queryFn:(data)=>func(data),
    queryKey:[key],
    select:data=> data
})

return{mutate,error,isSuccess}
}
export default SetData;