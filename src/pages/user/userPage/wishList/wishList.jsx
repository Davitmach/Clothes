import EmptyWish from '../../emptyWish/emptyWish';
import './wishList.scss';
import axios from 'axios';
import GetData from '../../../../hook/getData/getData';
import { SetDataWithQueryClient } from '../../../../hook/setData/setData';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function WishList() {
var UserId = localStorage.getItem('id');
const Navigate = useNavigate();
  const LikeProduct= async (id) => {
    const { data } = await axios.get(`http://clothes/product/getLikeProduct.php?id=${id}`);
    return data;
  };

  const LikeFunc = async (info) => {
    return await axios.post("http://clothes/product/likeFunc.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

const {data,isSuccess,error} = GetData(()=>LikeProduct(UserId),'getLike');
const {data:funcData,mutate} = SetDataWithQueryClient(LikeFunc,'likeFunc','getLike')

const HandleFunc = (state,likeId,productId)=> {
if(!productId) {
  mutate({
    state:state,
    likeId:likeId,
    userId:UserId
   
  })
}
else {
  mutate({
    state:state,
    likeId:likeId,
    productId:productId,
    userId:UserId
   
  })
}
 
  if(Array.isArray(data) && data.length == 1) {
    window.location.reload()
  }
}
if(Array.isArray(data) && data && data.length > 0) {
return(
  <div className='Liked_product'>
    <div className='Title_box'><h1>Wishlist</h1></div>
    <div className='Products_box'>
      {data.map((like)=>(
        <div className='Product'>
          <div className='Info_box'>
            <div className='Delete_box' onClick={()=> {
              HandleFunc('del',like.id)
            }}><FontAwesomeIcon icon={faXmark}/></div>
            <div className='Img_box'><img src={like.img}/></div>
            <div className='Info'>
              <div className='Title'><h1>{like.name}</h1></div>
              <div className='Color'><h1>Color : <span>{like.color}</span></h1></div>
              <div className='Quantity'><h1>Quantity : <span>{like.quantity}</span></h1></div>
            </div>
          </div>
          <div className='Func_box'>
            <div className='Price_box'><h1>${parseInt(like.price/10).toFixed(2)}</h1></div>
            <div className='Add_cart'><button onClick={()=> {
              HandleFunc('add',like.id,like.productId)
            }}>Add to cart</button></div>
          </div>
        </div>
      ) )}
    </div>
  </div>
)
}
else {
return(
  <EmptyWish/>
)
}
}
export default WishList;