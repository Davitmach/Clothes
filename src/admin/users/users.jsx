import "./users.scss";
import { useEffect, useState } from "react";
import GetData from "../../hook/getData/getData";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faPlus,
  faTrash,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { SetData, SetDataWithQueryClient } from "../../hook/setData/setData";
import { Store } from "../../redux/redux";
import { useForm } from "react-hook-form";

function Users() {
  const [editUserId, setEditUserId] = useState(null);
  const [editState, setState] = useState(false);

  const GetUsers = async (id) => {
    const { data } = await axios.get(`http://clothes/admin/getUsers.php`);
    return data;
  };
  const AdminId = localStorage.getItem("AdminId");
  const AdminRole = localStorage.getItem("AdminRole");
  const AdminName = localStorage.getItem("AdminName");

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
  const {
    mutate,
    data: funcData,
    isSuccess: funcSuccess,
    error: DelError,
  } = SetDataWithQueryClient(FuncUser, "FuncUser","checkBan");
  const {
    mutate: AdmLogMutate,
    data: AdmLogData,
    isSuccess: AdmLogSuccess,
  } = SetDataWithQueryClient(LogAdmin, "LogAdmin","getAdminUsers");
  const FuncUsers = (userId, payload) => {
    AdmLogMutate({
      adminName: AdminName,
      adminRole: AdminRole,
      action: payload,
      userId: userId,
    });

    var Until;

    if (payload == "ban") {
      Until = +prompt("Enter a until");
      if (Until) {
        mutate({
          payload: payload,
          userId: userId,
          adminId: AdminId,
          until: payload == "ban" ? Until : null,
        });
      }
    } else {
      mutate({
        payload: payload,
        userId: userId,
        adminId: AdminId,
        until: payload == "ban" ? Until : null,
      });
    }
  };


  const toggleEdit = (userId) => {
    if (editUserId === userId) {
      setEditUserId(null);
      setState(false);
    } else {
      setEditUserId(userId);
    }
  };

  const HandleSubmit = (event) => {
    event.preventDefault();

    mutate({
      payload: "edit",
      userId: event.target.id.value,
      adminId: AdminId,
      form: {
        email: event.target.email.value,
        password: event.target.password.value,
      },
    });
  };
const deleteAddress = (info)=> {

mutate({
  payload: 'deleteAddress',
  userId: info.address.data.userId,
  adminId: AdminId,
  addressType:info.address.type,
  addressId:info.address.data.id
  
});
}
  return (
    <div className="Users_box">
      {data?.map((user) => (
        <div className="User_box">
          <div
            style={
              editUserId === user?.user?.id
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
            className={`Edit_box`}
          >
            <div className="Close_box">
              <FontAwesomeIcon
                onClick={() => toggleEdit(user.user.id)}
                icon={faXmark}
              />
            </div>
            <div className="Edit">
              <form onSubmit={HandleSubmit}>
                <div className="Email_box">
                  <input placeholder="Change email!" name="email" type="text" />
                </div>
                <div className="Password_box">
                  <input placeholder="Change password!" name="password"  type="text" />
                </div>
                <input name="id" type="hidden" value={user?.user?.id} />
                <div className="Error_box">{funcData?.data == true ? <FontAwesomeIcon style={{color:'green'}} icon={faCheck}/> : funcData?.data}</div>
                <div className="Submit">
                  <button><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="Info_box">
            <div className="Email_box">
              <span>{user?.user?.email}</span>
            </div>
            <div className="Address_box">
              <div className="Address">
                {user?.addresses?.map((address) => (
                  <div>{address?.type}<div className="Delete"><button onClick={()=> deleteAddress({address})}><FontAwesomeIcon icon={faTrash}/></button></div></div>
                ))}
              </div>
       
            </div>
          </div>
          <div className="Punish">
            <div className="Warn_box">
              <span>{!user?.user?.warn ? "0/3" : user?.user?.warn + "/3"}</span>
            </div>
            {user?.user?.baned == "true" ? (
              <div className="Until_box">Unban date: {user?.user?.until}</div>
            ) : (
              ""
            )}
          </div>
          <div className="Function_box">
            <div className="Warn">
              <button onClick={() => FuncUsers(user.user.id, "warn")}>
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Warn
              </button>
            </div>

            <div className="Ban">
              <button
                onClick={() =>
                  FuncUsers(
                    user.user.id,
                    user?.user?.baned == "true" ? "unban" : "ban"
                  )
                }
              >
                <FontAwesomeIcon icon={faBan} />
                {user?.user?.baned == "true" ? "UnBan" : "Ban"}
              </button>
            </div>
            <div className="Edit">
              <button onClick={() => toggleEdit(user.user.id)}>
                <FontAwesomeIcon icon={faPenToSquare} />
                Edit
              </button>
            </div>
            <div className="Delete">
              <button onClick={()=> FuncUsers(user.user.id, "delete")}>
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
