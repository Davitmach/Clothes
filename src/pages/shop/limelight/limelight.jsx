import { useEffect, useState } from "react";
import GetData from "../../../hook/getData/getData";
import "./limelight.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import useViewed from "../../../hook/viewedProduct/viewedProduct";
import { SetData, SetDataWithQueryClient } from "../../../hook/setData/setData";
import colorNamer from "color-namer";
import ProductComponent from "./products/products";
function LimeLight() {

  const { SetProduct } = useViewed();
  var userId = localStorage.getItem('id');
  const GetLimelight = async (id) => {
    const { data } = await axios.get(`http://clothes/product/limelight.php?id=${id}`);
    return data;
  };

  const Like = async (info) => {
    return await axios.post("http://clothes/product/Like.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  const { mutate: likeMutate, data: likeData } =SetData(Like,"like");

  const { data, isSuccess, error } = GetData(()=>GetLimelight(userId), "getLimelight");
  useEffect(() => {
    console.log(data,'limelight');
  }, [data]);

  return (
    <div className="Limelight_box">
      <div className="Title_box">
        <div className="Title">
          <h1>In The Limelight</h1>
        </div>
      </div>
      <div className="Limelights">
        {data?.map((cat) => (
          <ProductComponent likeData={likeData} likeMutate={likeMutate} product={cat}/>
        ))}
      </div>
    </div>
  );
}
export default LimeLight;
