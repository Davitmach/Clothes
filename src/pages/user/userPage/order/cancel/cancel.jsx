import { useEffect } from "react";
import GetData from "../../../../../hook/getData/getData";
import "./cancel.scss";
import axios from "axios";
import { Link } from "react-router-dom";
function Cancel() {
  const UserId = localStorage.getItem("id");

  const GetCancelOrders = async (id) => {
    const { data } = await axios.get(
      `http://clothes/order/getCancelOrder.php?id=${UserId}`
    );
    return data;
  };

  //   const AddCart = async (info) => {
  //     return await axios.post(  `http://clothes/order/getActiveOrder.php?id=${UserId}`, info, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     });
  //   };
  const GetDate = ({ data, type }) => {
    const orderDate = new Date(data);

    const day = orderDate.getDate();
    const month = orderDate.toLocaleString("en-US", { month: "long" });
    const year = orderDate.getFullYear();
    const hour = orderDate.getHours();
    const minute = orderDate.getMinutes();

    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Если час 0, то показываем 12
    const formattedMinute = minute < 10 ? `0${minute}` : minute; // Добавляем ноль, если меньше 10
    if (type == "order") {
      return `${day} ${month} ${year} ${formattedHour}:${formattedMinute} ${period}`;
    } else {
      return `${day} ${month} ${year}`;
    }
  };
  const { data } = GetData(GetCancelOrders, "getCancelOrder");
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {Array.isArray(data) && data
        ? data.map((e) => {
            return (
              <div className="Cancel_order_box">
                <div className="Order" key={e.id}>
                  <div className="Order_info">
                    <div className="Delivery_info">
                      <div className="Order_number">
                        <h1>Order no: #{e.id}</h1>
                      </div>
                      <div className="Order_date">
                        <span>
                          Order Date : 
                          <h2>
                            {<GetDate type={"order"} data={e.orderDate} />}
                          </h2>
                        </span>
                      </div>
                   
                    </div>
                    <div className="Status_box">
                      <div>
                        <span>
                          Order Status : <h2>{e.orderStatus}</h2>{" "}
                        </span>
                      </div>
                      <div>
                        <span>
                          Payment Method :{" "}
                          <h2>
                            {e.paymantMethod == "card"
                              ? "Card"
                              : "Cash on delivery"}
                          </h2>{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="Product_info">
                    <div className="First_column">
                      <div className="Img_box">
                        <img src={e.img} alt="" />
                      </div>
                      <div className="Info_box">
                        <div className="Title_box">
                          <h1>{e.name}</h1>
                        </div>
                        <div className="Color_box">
                          <h1>
                            Colour :   <h2> {e.color}</h2>
                          </h1>
                        </div>
                        <div className="Quantity_box">
                          <h1>
                            Qty : <h2>{e.quantity}</h2>
                          </h1>
                        </div>
                        <div className="Total_box">
                          <h1>
                            Total : ${Number(e.total).toFixed(2)}
                          </h1>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </>
  );
}
export default Cancel;
