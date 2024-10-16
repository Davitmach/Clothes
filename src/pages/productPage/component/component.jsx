import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import colorNamer from 'color-namer';
import { Link } from 'react-router-dom';
import useViewed from '../../../hook/viewedProduct/viewedProduct';
import { useQueryClient } from '@tanstack/react-query';
const Component = ({ product, likeData,likeMutate,id }) => {
useEffect(()=> {
console.log(likeData,'likedata');


},[likeData])

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
    console.log(likeData);
    
    
    const newLikeState = !isLiked;
  
    setIsLiked(newLikeState);


    const payload = newLikeState ? 'setLike' : 'delLike';


  };
  var QueryClient = useQueryClient();






  return (

    <div className="Similar" onClick={()=> {

  window.location.reload()
      
    }}>
    <div className="Img_box">
      <img src={product.img} />
      <div className="Like" 
       onClick={() => {

        handleLike()
        likeMutate({
          payload:product.isLiked == "true" ? "delLike" : "setLike",
          likeId: product.likeId,
          productId: product.id,
          userId: userId,
          img: product.img,
          quantity: 1,
          price: product.price,
          name:product.name,
          size:JSON.parse(product.size)[0],
          color:colorNamer(JSON.parse(product.color)[0]).basic[0]?.name,
       
        });
      window.location.reload()
   
      }}>
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
        onClick={() => {
          SetProduct(product);
          QueryClient.invalidateQueries(`GetProduct${id}`);
     
        }}
      >
        <div className="Title_box">
          <h1>
            {product.name.length > 20
              ? product.name.substring(0, 20) + "..."
              : product.name}
          </h1>
        </div>
        <div className="Price">
          <span>${(product.price / 10).toFixed(2)}</span>
        </div>
      </Link>
    </div>
  </div>
  );
};

export default Component;
