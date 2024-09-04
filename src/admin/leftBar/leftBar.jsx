import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./leftBar.scss";
import { Link, useLocation } from "react-router-dom";
import {
  faBarcode,
  faHouseUser,
  faListUl,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
function LeftBar(props) {
  const [active, setActive] = useState("");
  const Location = useLocation();
  useEffect(() => {
    switch (Location.pathname) {
      case "/admin/page":
        setActive("page");
        break;
      case "/admin/Users":
        setActive("users");
        break;
      case "/admin/admins":
        setActive("admins");
        break;
        case "/admin/product":
            setActive("product");
            break;
            case '/admin/log': 
            setActive("log");
            break
    }
  }, [Location.pathname]);
  if (props.role == "owner") {
    return (
      <>
        <Page active={active} />
        <Users active={active} />
        <AddAdmin active={active} />
        <Product  active={active}/>
        <Log active={active}/>
      </>
    );
  } else if (props.role == "Sr.Helper") {
    return (
      <>
        <Page active={active} />
        <Users  active={active}/>
        <Product active={active} />
        <Log active={active}/>
      </>
    );
  } else if (props.role == "Mid.Helper") {
    return (
      <>
        <Page active={active} />
        <Users  active={active}/>
        <Product active={active} />
        <Log active={active}/>
      </>
    );
  } else if (props.role == "Jr.Helper") {
    return (
      <>
        <Page  active={active}/>
        <Users active={active}/>
        <Product active={active}/>
      </>
    );
  }
}
export default LeftBar;

function Users(props) {
  return (
    <li>
      <Link to={"Users"} className={props.active == 'users' ? 'Active' : ''}>
        <FontAwesomeIcon icon={faUser} />
        Users
      </Link>
    </li>
  );
}
function AddAdmin(props) {
  return (
    <li>
      <Link to={"admins"} className={props.active == 'admins' ? 'Active' : ''}>
        <FontAwesomeIcon icon={faUserTie} />
        Admins
      </Link>
    </li>
  );
}
function Product(props) {
  return (
    <li>
      <Link to={"product"} className={props.active == 'product' ? 'Active' : ''}>
        <FontAwesomeIcon icon={faBarcode} />
        Product
      </Link>
    </li>
  );
}
function Page(props) {
  return (
    <li>
      <Link to={"page"} className={props.active == 'page' ? 'Active' : ''}>
        <FontAwesomeIcon icon={faHouseUser} />
        Page
      </Link>
    </li>
  );
}
function Log(props) {
  return (
    <li>
      <Link to={"log"} className={props.active == 'log' ? 'Active' : ''}>
        <FontAwesomeIcon icon={faListUl} />
        Log
      </Link>
    </li>
  );
}