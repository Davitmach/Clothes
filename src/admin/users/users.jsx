import "./users.scss";
import { useEffect, useState } from "react";
import GetData from "../../hook/getData/getData";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faBan,
  faPlus,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { SetData } from "../../hook/setData/setData";
import { Store } from "../../redux/redux";

function Users() {

  const GetUsers = async (id) => {
    const { data } = await axios.get(`http://clothes/admin/getUsers.php`);
    return data;
  };
  const AdminId = localStorage.getItem('AdminId');
  const AdminRole = localStorage.getItem('AdminRole');
  const AdminName = localStorage.getItem('AdminName');
  const FuncUser = async (info) => {
    return await axios.post("http://clothes/admin/funcUser.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const LogAdmin = async (info) => {
    return await axios.post("http://clothes/admin/logAdmin.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const { data, isSuccess, error } = GetData(GetUsers, "getAdminUsers");
  const {mutate,data:funcData,isSuccess: funcSuccess,error:DelError} = SetData(FuncUser, "FuncUser");
  const {mutate:AdmLogMutate,data:AdmLogData,isSuccess:AdmLogSuccess} = SetData(LogAdmin,'LogAdmin');
  const FuncUsers = (userId,payload) => {
AdmLogMutate({
  adminName:AdminName,
  adminRole:AdminRole,
  action:payload,
  userId:userId,

})

    var Until;

if(payload == 'ban') {
  Until = +prompt('Enter a until');
}
    
    mutate({
        payload:payload,
        userId:userId,
        adminId:AdminId,
        until: payload == 'ban' ? Until : null
    })
  };
  useEffect(() => {
 console.log(funcData,'funcData');
 console.log(AdmLogData,'logData');
 
 

  }, [funcData,AdmLogData]);

  return (
    <div className="Users_box">
      {data?.map((user) => (
        <div className="User_box">
          <div className="Info_box">
            <div className="Email_box">
              <span>{user.user.email}</span>
            </div>
            <div className="Address_box">
              <div className="Address">
                {user?.addresses?.map((address) => (
                  <div>{address.type}</div>
                ))}
              </div>
              <div className="Function_box">
                <div className="Add_btn"><button><FontAwesomeIcon icon={faPlus}/></button></div>
              </div>
            </div>
          </div>
          <div className="Punish">
          <div className="Warn_box">
            <span>{!user.user.warn ? '0/3': user.user.warn+'/3'}</span>
          </div>
          {user.user.baned == "true" ? (
                <div className="Until_box">Unban date: {user.user.until}</div>
            ) : ''}
            </div>
          <div className="Function_box">
            <div className="Warn">
              <button onClick={()=> FuncUsers(user.user.id,'warn')}>
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Warn
              </button>
            </div>
      
            <div className="Ban">
              <button onClick={()=> FuncUsers(user.user.id,user.user.baned == 'true' ? 'unban' : 'ban')}>
                <FontAwesomeIcon icon={faBan} />
                {user.user.baned == 'true' ? 'UnBan' : 'Ban'}
              </button>
            </div>
            <div className="Edit">
              <button>
                <FontAwesomeIcon icon={faPenToSquare} />
                Edit
              </button>
            </div>
            <div className="Delete">
              <button>
                <FontAwesomeIcon icon={faTrash} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Users;
