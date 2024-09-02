import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import {faUser} from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import './admin.scss'
import LeftBar from "./leftBar/leftBar";
function Admin() {
const Navigate = useNavigate();
const AdminLog = localStorage.getItem('AdminLog');
const Role = localStorage.getItem('AdminRole')
const Name = localStorage.getItem('AdminName');

useEffect(()=> {

if(AdminLog) {
    Navigate('/admin/page',{replace:true})
}
else {
    Navigate('/admin/login',{replace:true})
}},[AdminLog])




return(<div className="Admin_container">
    <div className="Left_bar">
        <div className="Title_box">
            <div className="Title">
                <h1>{Name}</h1>
            </div>
            <div className="Description">
                <p>Welcome to your Account</p>
            </div>
        </div>
        <div className="Pages">
            <ul>
       <LeftBar  role={Role}/>
       </ul>
       </div>
    </div>
    <div className="Main_container"><Outlet/></div>
</div>)
}
export default Admin;