import { useEffect, useMemo, useState } from "react";
import GetData from "../../hook/getData/getData";
import LeftBar from "../leftBar/leftBar";
import axios from "axios";
import "./men.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { SetData, SetDataWithQueryClient } from "../../hook/setData/setData";
import { Link, Outlet } from "react-router-dom";
import useViewed from "../../hook/viewedProduct/viewedProduct";
import colorNamer from "color-namer";
import ProductComponent from "../productComponent/productComponent";
function Men() {
  const [type, setType] = useState("New");
  const [dataLoad, setDataLoad] = useState(false);
  const [rec, setRec] = useState([]);
  const { SetProduct } = useViewed();

  const GetCategories = async (id) => {
    const { data } = await axios.get(
      `http://clothes/product/getCat.php?gender=men`
    );
    return data;
  };
  var userId = localStorage.getItem("id");

  const Products = async (id) => {
    const { data } = await axios.get(
      `http://clothes/product/getProducts.php?id=${id}`
    );
    return data;
  };
  const ProductsRec = async (id) => {
    const { data } = await axios.get(
      `http://clothes/product/getProductsRec.php?gender=male`
    );
    return data;
  };
  const FuncProduct = async (info) => {
    return await axios.post("http://clothes/product/funcProduct.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const Like = async (info) => {
    return await axios.post("http://clothes/product/Like.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  const { mutate: likeMutate, data: likeData } = SetDataWithQueryClient(
    Like,
    "like",
    'ProductFunc'
  );
useEffect(()=> {
console.log(likeData,'likeData');


},[likeData])
  const { data, isSuccess, error } = GetData(GetCategories, "getMenCar");
  const {
    data: productData,
    isSuccess: productSuccess,
    error: productError,
  } = GetData(() => Products(userId), "getManProduct");

  const {
    data: recData,
    isSuccess: recSuccess,
    error: recError,
  } = GetData(ProductsRec, "getRecProduct");
  const { mutate, data: funcData } = SetData(FuncProduct, "ProductFunc");
  useEffect(() => {
    console.log(funcData,'funcData');

    if (funcData?.data) {
      setDataLoad(true);
    }
  }, [funcData]);

  useEffect(() => {
    if (type == "Recommended") {
      setRec(recData);
    }
  }, [type, recData]);
  const Product =
    type == "Recommended" ? rec : dataLoad ? funcData?.data : productData;

  return (
    <div className="Men_container">
      <div className="Product_container">
        {data ? (
          <LeftBar mutate={mutate} id={userId} info={data} gender="men" />
        ) : (
          ""
        )}
        <div className="Man_products">
          <div className="Title_box">
            <div className="Name_box">
              <h1>Men’s Clothing</h1>
            </div>
            <div className="Type_btn">
              <div>
                <button
                  className={`${type == "New" ? "Active" : ""}`}
                  onClick={() => {
                    setType("New");
                  }}
                >
                  New
                </button>
              </div>
              <div>
                <button
                  className={`${type == "Recommended" ? "Active" : ""}`}
                  onClick={() => {
                    setType("Recommended");
                  }}
                >
                  Recommended
                </button>
              </div>
            </div>
          </div>
          <div className="Products">
            {Product?.map((product) => (
<ProductComponent  likeMutate={likeMutate}  product={product} likeData={likeData} gender={'male'}/>
            ))}
          </div>
        </div>
      </div>
      <div className="Info_box">
        <Outlet />
      </div>
    </div>
  );
}
export default Men;
