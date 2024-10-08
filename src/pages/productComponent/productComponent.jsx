import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import colorNamer from 'color-namer';
import { Link } from 'react-router-dom';
import useViewed from '../../hook/viewedProduct/viewedProduct';
const ProductComponent = ({ product, likeData,likeMutate,gender }) => {
    var userId = localStorage.getItem('id')
    const { SetProduct } = useViewed();
  const [isLiked, setIsLiked] = useState(
    Array.isArray(likeData?.data) 
      ? likeData.data.find((e) => parseInt(e.productId) === parseInt(product.id)) 
        ? true 
        : false 
      : product.isLiked === 'true'
  );

  useEffect(() => {

    if (Array.isArray(likeData?.data)) {
      const likedProduct = likeData.data.find((e) => parseInt(e.productId) === parseInt(product.id));
      setIsLiked(!!likedProduct);
    }
  }, [likeData, product.id]);

  const handleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);


    const payload = newLikeState ? 'setLike' : 'delLike';


  };

  return (

       <div className="Product_box">
               <div className="Img_box">
                <img src={product.img} />
                 <div
                    className="Like_box"
                    onClick={() => {
                      
                      handleLike()
                      likeMutate({
                        payload:
                        Array.isArray(likeData?.data) ?  likeData?.data.find((e)=> parseInt(e.productId) == parseInt(product.id))? 'delLike' : 'setLike'  :product.isLiked == "true" ? "delLike" : "setLike",
                        likeId: product.likeId,
                        productId: product.id,
                        userId: userId,
                        gender:gender,
                        img: product.img,
                        quantity: 1,
                        price: product.price,
                        name:product.name,
                        size:JSON.parse(product.size)[0],
                        color:colorNamer(JSON.parse(product.color)[0]).basic[0]?.name
                      });

                 
                    }}
                  >
                  
                  {isLiked ? (
       <FontAwesomeIcon icon={solidHeart} />
  ) : (
        <FontAwesomeIcon icon={faHeart} />
     )}
                  </div>
                </div>
                <div className="Info_box">
                  <Link
                    to={`/productPage/${product.id}`}
                    onClick={() => SetProduct(product)}
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
  );
};

export default ProductComponent;
