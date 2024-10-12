import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./details.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { SetData, SetDataWithQueryClient } from "../../../../../hook/setData/setData";
import axios from "axios";
import GetData from "../../../../../hook/getData/getData";
function Details() {
  var { id } = useParams();
  const [confirm,setConfirm] = useState(false);
  const [delConf,setDelConf] = useState(false);
  const [xmark,setXmark] = useState(false); 
  const Location = useLocation();
  const Navigate = useNavigate();
  const GetDate = ({ data }) => {
    const orderDate = new Date(data);

    const day = orderDate.getDate();
    const month = orderDate.toLocaleString("en-US", { month: "long" });
    const year = orderDate.getFullYear();
    const hour = orderDate.getHours();
    const minute = orderDate.getMinutes();

    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Если час 0, то показываем 12
    const formattedMinute = minute < 10 ? `0${minute}` : minute; // Добавляем ноль, если меньше 10

    return `${day} ${month} ${year} ${formattedHour}:${formattedMinute} ${period}`;
  };

  const OrderStatus = async (id) => {
    const { data } = await axios.get(
      `http://clothes/order/getOrderStatus.php?id=${Location.state.orderId}`
    );
    return data;
  };
  const {data:OrderData} = GetData(OrderStatus,'orderStatus');
  useEffect(()=> {
console.log(OrderData,'esfsfe');

  },[OrderData])
     const CancelOrder = async (info) => {
      return await axios.post(  `http://clothes/order/cancelOrder.php`, info, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    };
    const ConfirmOrder = async (info) => {
      return await axios.post(  `http://clothes/order/confirmOrder.php`, info, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    };
    const {mutate:confMutate,data:confData} = SetDataWithQueryClient(ConfirmOrder,'confirmOrder','orderStatus');
    useEffect(()=> {
console.log(confData);

    },[confData])
    const {data,mutate} = SetData(CancelOrder,'cancelOrder');
    useEffect(()=> {
if(data?.data == 'cancel') {
  Navigate('/user/order/cancel',{replace:true})
}

    },[data])
  useEffect(() => {
    if(OrderData?.delivered == 'progress') {
      setDelConf(true);
      setXmark(true)
    }
    if(OrderData?.delivered == 'complete') {
      setXmark(true);
      setDelConf(false)
      Navigate('/user/order/complete',{replace:true})
    }
  }, [OrderData?.delivered]);
  const HandleDelete = (id)=> {
mutate({
  orderId:id
})

  }
  return (
    <div className="Details_box">
      <div className="Back_to_orders">
        <Link to={"/user/order"}>
          <FontAwesomeIcon icon={faAngleLeft} /> Order Details
        </Link>
      </div>
      <div className="Info_box">
        <div className="Order_info">
          <div className="Column1">
            <div>
              <h1>Order no: #{Location.state.orderId}</h1>
            </div>
            <div>
              <span>
                Placed On {<GetDate data={Location.state.orderPlaced} />}
              </span>
            </div>
          </div>
          <div className="Column2">
            <span>
              Total : <h1>$143.00</h1>
            </span>
          </div>
        </div>
        <div className="Order_status">
            <div>
                <div className={`Circle_box ${OrderData?.placed == 'complete' ? 'Complete' :''}`}></div>
                <div><span>Order Placed</span></div>
            </div>
            <div>
                <div className={`Circle_box ${OrderData?.shipping == 'complete' ? 'Complete' : OrderData?.shipping == 'progress' ? 'Progress' : ''}`}></div>
                <div><span>shipped</span></div>
            </div>
            <div>
                <div className={`Circle_box ${OrderData?.delivered == 'complete'? 'Complete': OrderData?.delivered == 'soon' ? 'Soon' : OrderData?.delivered == 'progress' ? 'Progress' : ''}`}></div>
                <div><span>Delivered</span></div>
            </div>
            <div className="Bar"></div>
        </div>
        <div className="Message_box">
          <div><span>{<GetDate data={Location.state.orderPlaced}/>}</span></div>
          <div><h1>Your order has been successfully verified.</h1></div>
        </div>
        <div className="Product_box">
          <div className="Column1">
            <div className="Img_box"><img src={Location.state.img}/></div>
            <div className="Column1_info_box">
              <div><h1>{Location.state.name}</h1></div>
              <div><h1>Color : <span>{Location.state.color}</span></h1></div>
            </div>
          </div>
          <div className="Column2">
            <div className="Quantity"><h1>Qty : <span>{Location.state.quantity}</span></h1></div>
            <div><h2>${parseInt(Location.state.total).toFixed(2)}</h2></div>
            <div style={xmark == true ? {visibility:'hidden'} : {visibility:'visible'}}><button  onClick={()=> setConfirm(true)}><FontAwesomeIcon icon={faXmark}/></button></div>
          </div>
        </div>
        <div style={delConf   == true ? {visibility:'visible'} : {visibility:'hidden'}} className="Conf_box">
          <button onClick={()=> confMutate({
            id:Location.state.orderId
          })}>Confirm</button>
        </div>
      </div>
      <div className="Confirm_box" style={confirm == true ? {visibility:'visible'} : {visibility:'hidden'}}>
        <div><button className="Conf" onClick={()=> HandleDelete(Location.state.orderId)}>Confirm</button></div>
        <div><button className="Canc" onClick={()=> setConfirm(false)}>Cancel</button></div>
      </div>
    </div>
  );
}
export default Details;
