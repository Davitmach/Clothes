import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./comments.scss";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SetDataWithQueryClient } from "../../../hook/setData/setData";
function Comments() {
  const [data, setData] = useState([]);
  const [star, setStar] = useState(1);
  const Id = localStorage.getItem("id");
  const Location = useLocation();
  const inputRef = useRef();
  const StarsRef = useRef();
  useEffect(() => {
    setData(Location.state);
  }, []);

  useEffect(() => {
    console.log(document.querySelector(`.Comments_box .Stars_box`));
  }, []);
  const SetMessage = async (info) => {
    return await axios.post("http://clothes/product/setRating.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  const {
    mutate,
    data: setMessageData,
    isSuccess,
    error,
  } = SetDataWithQueryClient(SetMessage, "SetMessage", "GetProduct");



  useEffect(() => {
    console.log(setMessageData);
  }, [setMessageData]);


  const handleAddMessage = () => {
    if (inputRef.current.value !== "") {
      mutate({
        stars: star,
        message: inputRef.current.value,
        userId: Id,
      });
    }
  };
  
  const handleStarClick = (index) => {
    setStar(index + 1);
  };
  return (
    <div className="Comments_box">
      <div className="Add_box">
        <div className="Input_box">
          <input type="text" ref={inputRef} />
          <FontAwesomeIcon
            onClick={() => handleAddMessage()}
            icon={faMagnifyingGlass}
          />
        </div>
        <div className="Stars_box" ref={StarsRef}>
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              style={{ color: index < star ? "#EDD146" : "#ccc" }} // Активные звёзды выделены цветом
              onClick={() => handleStarClick(index)} // Обработка клика по звезде
            />
          ))}
        </div>
      </div>
      <div className="Comments">
        {data.map((e) => {
          var Time = e.time.split(".")[0];
          return (
            <div className="Comment">
              <div className="Message">
                <div>
                  <p>{e.message}</p>
                </div>
                <div>
                  {" "}
                  {Array.from({ length: Math.round(e.rating) }, (_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      style={{ color: "#EDD146" }}
                      icon={faStar}
                    />
                  ))}
                </div>
              </div>
              <div className="Time">{Time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Comments;
