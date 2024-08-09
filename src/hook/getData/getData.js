import { useQuery} from "@tanstack/react-query";
function GetData(func,key) {

const {data,error,isSuccess} = useQuery({
    queryFn:(data)=>func(data),
    queryKey:[key],
    select:data=> data
})

return{data,error,isSuccess}
}
export default GetData;