import "./userPage.scss";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Store } from "../../../redux/redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faRightFromBracket,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";

function UserPage() {
  const UserId = localStorage.getItem("id");
  const Navigate = useNavigate();
  const [ban, setBan] = useState(Store.getState().checkBan.ban);
  const Location = useLocation();
 
  useEffect(() => {
    const handleStateChange = () => {
      setBan(Store.getState().checkBan.ban);
    };
    Store.subscribe(handleStateChange);
  }, []);

  const [FullAddress, setFull] = useState(Store.getState().fullAddress.full);
  useEffect(() => {
    const handleStateChange = () => {
      setFull(Store.getState().fullAddress.full);
    };
    Store.subscribe(handleStateChange);
  }, []);
  useEffect(() => {
    if (ban == true) {
      Navigate("/", { replace: true });
      window.location.reload();
    }
  }, [ban]);

  const [submit, setSubmit] = useState(
    Store.getState().userInfoSubmit.submited
  );

  const [activeLink, setActive] = useState("");
  useEffect(() => {
    const handleStateChange = () => {
      setSubmit(Store.getState().userInfoSubmit.submited);
    };
    Store.subscribe(handleStateChange);
  }, []);

  const GetName = () => {
    const Name = localStorage.getItem(`${UserId}name`);
    return <h1>Hello {Name} </h1>;
  };

  useEffect(() => {
    if (submit == false) {
  
      setActive("myinfo");
    } else {
      localStorage.setItem(`${UserId}submitInfo`, true);

    }
  }, [submit, Navigate, UserId]);

  useEffect(() => {
    const SubmitedInfo = localStorage.getItem(`${UserId}submitInfo`);
    if (SubmitedInfo == "true") {
    
      Store.dispatch({ type: "Submited" });
    }
  }, [Navigate, UserId]);

  const HandleActiveLink = (link) => {
    setActive(link);
  };
  return (
    <>
      <div className="User_page_container">
        <div className="Choose_page_container">
          <div className="Title_box">
            {submit ? (
              <div className="Title">{submit ? GetName() : ""}</div>
            ) : (
              ""
            )}

            <div className="Description">
              <p>Welcome to your Account</p>
            </div>
          </div>
          <div className="Change_page_box">
            <div>
              <Link
                className={`${activeLink == "cart" ? "Active" : ""}`}
                onClick={() => HandleActiveLink("cart")}
                to={"/cart"}
              >
                <div className="Icon_box">
                  <FontAwesomeIcon icon={faBagShopping} />
                </div>
                <div>
                  <span>My orders</span>
                </div>
              </Link>
            </div>
            <div>
              <Link
                className={`${activeLink == "wishlist" ? "Active" : ""}`}
                onClick={() => HandleActiveLink("wishlist")}
                to={"wishlist"}
              >
                <div className="Icon_box">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div>
                  <span>Wishlist</span>
                </div>
              </Link>
            </div>
            <div>
              <Link
                className={`${activeLink == "myinfo" ? "Active" : ""}`}
                onClick={() => HandleActiveLink("myinfo")}
                to={submit ? "myInfo" : "setMyInfo"}
              >
                <div className="Icon_box">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <span>My info</span>
                </div>
              </Link>
            </div>
            <div>
              <Link to={"signOut"}>
                <div className="Icon_box">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
                <div>
                  <span>Sign out</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="Container_box">
          {<Outlet />}
          <div
            className="Background_box"
            style={
              FullAddress ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            <div
              className="Error_box_back"
              style={
                FullAddress
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <div
                className="Xmark_box"
                onClick={() => Store.dispatch({ type: "NoFull" })}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <div
                className="Icon_box"
                style={
                  FullAddress
                    ? { animation: "Anim .4s .4s ease-in-out forwards" }
                    : { animation: "none" }
                }
              >
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>
              <div className="Description_box">
                {FullAddress ? (
                  <p>You have 4 address!. Maximum 4 address you can have</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserPage;
