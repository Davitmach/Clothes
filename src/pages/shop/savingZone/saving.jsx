import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./saving.scss";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Saving() {
  return (
    <div className="Saving_zone">
      <div className="Title_box">
        <div className="Title">
          <h1>Big Saving Zone</h1>
        </div>
      </div>
      <div className="Row1">
        <div className="Hawaiian_Shirts">
          <div className="Title_box">
            <h1>Hawaiian Shirts</h1>
          </div>
          <div className="Description_box">
            <span>Dress up in summer vibe</span>
          </div>
          <div className="Akcia_box">
            <h1>UPTO 50% OFF</h1>
          </div>
          <div className="Arrow_down_box">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="Shop_btn_box">
            <Link to={'/men'}>SHOP NOW</Link>
          </div>
        </div>
        <div className="Printed_T-Shirt">
          <div className="Status_box">
            <span>Limited Stock</span>
          </div>
          <div className="Title_box">
            <h1>Printed T-Shirt</h1>
          </div>
          <div className="Desription_box">
            <span>New Designs Every Week</span>
          </div>
          <div className="Akcia_box">
            <h1>UPTO 40% OFF</h1>
          </div>
          <div className="Arrow_down_box">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="Shop_btn_box">
            <Link to={'/women'}>SHOP NOW</Link>
          </div>
        </div>
        <div className="Cargo_Joggers">
          <div className="Title_box">
            <h1>Cargo Joggers</h1>
          </div>
          <div className="Description_box">
            <span>Move with style & comfort</span>
          </div>
          <div className="Akcia_box">
            <h1>UPTO 50% OFF</h1>
          </div>
          <div className="Arrow_down_box">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="Shop_btn_box">
            <Link to={'/women'}>SHOP NOW</Link>
          </div>
        </div>
      </div>
      <div className="Row2">
        <div className="Urban_shirts">
        <div className="Title_box">
            <h1>Urban
            Shirts</h1>
          </div>
          <div className="Description_box">
            <span>Live In Confort</span>
          </div>
          <div className="Akcia_box">
            <h1>FLAT 60% OFF</h1>
          </div>
          <div className="Arrow_down_box">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="Shop_btn_box">
            <Link to={'/men'}>SHOP NOW</Link>
          </div>
        </div>
        <div className="Oversized">
        <div className="Title_box">
            <h1>Oversized
            T-Shirts</h1>
          </div>
          <div className="Description_box">
            <span>Street Style Icon</span>
          </div>
          <div className="Akcia_box">
            <h1>FLAT 60% OFF</h1>
          </div>
          <div className="Arrow_down_box">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="Shop_btn_box">
            <Link to={'/men'}>SHOP NOW</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Saving;
