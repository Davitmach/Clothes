import { useEffect, useMemo, useState } from "react";
import GetData from "../../hook/getData/getData";
import LeftBar from "../leftBar/leftBar";
import axios from "axios";
import "./men.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { SetData } from "../../hook/setData/setData";
import { Link, Outlet } from "react-router-dom";
import useViewed from "../../hook/viewedProduct/viewedProduct";

function Men() {
  const [type, setType] = useState("New");
  const [dataLoad, setDataLoad] = useState(false);
  const [rec, setRec] = useState([]);
  const {SetProduct } = useViewed();

  const GetCategories = async (id) => {
    const { data } = await axios.get(
      `http://clothes/product/getCat.php?gender=men`
    );
    return data;
  };

  const Products = async (id) => {
    const { data } = await axios.get(`http://clothes/product/getProducts.php`);
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
  const { data, isSuccess, error } = GetData(GetCategories, "getMenCar");
  const {
    data: productData,
    isSuccess: productSuccess,
    error: productError,
  } = GetData(Products, "getManProduct");
  const {
    data: recData,
    isSuccess: recSuccess,
    error: recError,
  } = GetData(ProductsRec, "getRecProduct");
  const { mutate, data: funcData } = SetData(FuncProduct, "ProductFunc");
  useEffect(() => {
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
        {data ? <LeftBar mutate={mutate} info={data} gender="men" /> : ""}
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
              <div className="Product_box">
                <div className="Img_box">
                  <img src={product.img} />
                  <div className="Like_box">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </div>
                <div className="Info_box">
                  <Link
                    to={`/productPage/${product.id}`}
                    onClick={() =>SetProduct(product)}
                  >
                    <div className="Name_box">
                      <h1>
                        {product.name.length > 16
                          ? product.name.substring(0, 16) + "..."
                          : product.name}
                      </h1>
                    </div>
                    <div className="Price_box">
                      <span>${(product.price / 10).toFixed(2)}</span>
                    </div>
                  </Link>
                </div>
              </div>
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
