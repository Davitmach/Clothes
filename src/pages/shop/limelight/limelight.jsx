import { useEffect } from "react";
import GetData from "../../../hook/getData/getData";
import "./limelight.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import useViewed from "../../../hook/viewedProduct/viewedProduct";
function LimeLight() {
  const { SetProduct } = useViewed();
  const GetLimelight = async (id) => {
    const { data } = await axios.get(`http://clothes/product/limelight.php`);
    return data;
  };
  const { data, isSuccess, error } = GetData(GetLimelight, "getLimelight");
  useEffect(() => {
    console.log(data);
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
          <div className="Limelight">
            <div className="Img_box">
              <img src={cat.img} />
              <div className="Like">
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
            <div className="Info_box">
              <Link
                to={`/productPage/${cat.id}`}
                onClick={() => SetProduct(cat)}
              >
                <div className="Title_box">
                  <h1>
                    {cat.name.length > 20
                      ? cat.name.substring(0, 20) + "..."
                      : cat.name}
                  </h1>
                </div>
                <div className="Price">
                  <span>${(cat.price / 10).toFixed(2)}</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default LimeLight;
