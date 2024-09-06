import axios from "axios";
import GetData from "../getData/getData";
import { useEffect } from "react";
import { Store } from "../../redux/redux";

function useCheckBan() {
    var Id = localStorage.getItem('id');

    if(Id) {
    const CheckBan = async (id) => {
        const { data } = await axios.get(`http://clothes/admin/checkBan.php?id=${Id}`);
        return data;
      };
const {data,isSuccess,error} = GetData(CheckBan,'checkBan')

if(data == 'baned') {
    
    Store.dispatch({type:"Logout"})
    localStorage.setItem('logged',false)
    Store.dispatch({type:'ban'})
    
}
else {
    Store.dispatch({type:'unban'}) 
}

    }
}
export default useCheckBan;