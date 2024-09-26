import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./comments.scss";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { faMagnifyingGlass, faPaperPlane, faPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SetDataWithQueryClient } from "../../../hook/setData/setData";
import GetData from "../../../hook/getData/getData";
function Comments() {
 
  const [star, setStar] = useState(1);
  const Id = localStorage.getItem("id");
  const {id} = useParams();
  const Location = useLocation();
  const inputRef = useRef();
  const StarsRef = useRef();
  const Navigate = useNavigate();

  const GetComments = async (id) => {
    const { data } = await axios.get(
      `http://clothes/product/getComments.php?id=${id}`
    );
    return data;
  };

const {data:commData} = GetData(()=>GetComments(id),'getComments');
  useEffect(() => {
    
console.log(commData);

    
  }, [commData]);

  useEffect(() => {
    // console.log();
    
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
      if(Id) {
      mutate({
        stars: star,
        message: inputRef.current.value,
        userId: Id,
       productId:id
      });}
      else {
        Navigate('/login',{replace:true})
        
      }
    }
  };

  const handleStarClick = (index) => {
    setStar(index + 1);
  };
  const DeleteHandle =(data)=> {
    mutate({
      status:'del',
      id:data.id,
      userId: data.userId,
     productId:data.productId
    })
  }
  return (
    <div className="Comment_box">
      <div className="Comments" style={commData?.length < 4 ? {height:'auto'} : {height:'350px'}}>
        {commData?.map((e) => {
          var Time = e?.time?.split(".")[0];
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
             {e.userId == Id ? (<div className="Delete" onClick={()=> DeleteHandle(e)}><FontAwesomeIcon icon={faXmark}/></div>) : ''} 
            </div>
          );
        })}
      </div>
      <div className="Add_box">
        <div className="Input_box">
          <input placeholder="Enter a comment" type="text" ref={inputRef} />
          <FontAwesomeIcon
            onClick={() => handleAddMessage()}
            icon={faPaperPlane}
          />
        </div>
        <div className="Stars_box" ref={StarsRef}>
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              style={{ color: index < star ? "#EDD146" : "#ccc" }}
              onClick={() => handleStarClick(index)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Comments;
