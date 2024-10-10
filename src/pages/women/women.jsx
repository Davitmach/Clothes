import GetData from "../../hook/getData/getData";
import LeftBar from "../leftBar/leftBar"
import axios from "axios";
import { useEffect ,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SetData, SetDataWithQueryClient } from "../../hook/setData/setData";
import './women.scss'
import { Link } from "react-router-dom";
import useViewed from "../../hook/viewedProduct/viewedProduct";
import ProductComponent from "../productComponent/productComponent";
 function Women() {
  const [type,setType] = useState('New');
  const [dataLoad,setDataLoad] = useState(false);
  const [rec,setRec] = useState([]);
  const {SetProduct} = useViewed();
var userId = localStorage.getItem('id');
    const GetCategories= async (id) => {
        const { data } = await axios.get(`http://clothes/product/getCat.php?info=women/${userId}`);
        return data;
      };
      const {data,isSuccess,error} = GetData(GetCategories,'getWomenCar');
      const Products= async (id) => {
        const { data } = await axios.get(`http://clothes/product/getWomenProducts.php?id=${userId}`);
        return data;
      };
      const ProductsRec= async (id) => {
        const { data } = await axios.get(`http://clothes/product/getProductsRec.php?info=female/${userId}`);
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

      const {data:productData,isSuccess:productSuccess,error:productError} = GetData(Products,'getWomenProduct');
      const {mutate,data:funcData} = SetData(FuncProduct,'ProductFunc')
      const {data:recData,isSuccess:recSuccess,error:recError} = GetData(ProductsRec,'getRecProduct')
      useEffect(()=> {
        if(funcData?.data) {
        setDataLoad(true)
        }
        console.log(funcData,'funcdatq');
        console.log(productData,'productdata');
        console.log(recData,'recdata');
        
        
        
              },[funcData,productData,recData])

              useEffect(()=> {
          
                if(type == 'Recommended') {
                  setRec(recData)
                }
                
                
                          },[type,recData])
                          const Product = type == 'Recommended' ? rec : dataLoad  ? funcData?.data : productData
      return(
        <div className="Women_container">
          <div className="Product_container">
            {data ? (<LeftBar mutate={mutate}  info={data} gender="female" id={userId}/>) : ''}
            <div className="Women_products">
              <div className="Title_box">
                <div className="Name_box"><h1>Women’s Clothing</h1></div>
                <div className="Type_btn">
                  <div><button className={`${type=='New' ? 'Active' : ''}`} onClick={()=> {
                    setType('New')
                  }}>New</button></div>
                  <div><button className={`${type=='Recommended' ? 'Active' : ''}`} onClick={()=> {
                    setType('Recommended')
                  }}>Recommended</button></div>
                </div>
              </div>
              <div className="Products">
                {Product?.map((product)=> (
              
                <ProductComponent product={product} likeData={likeData} likeMutate={likeMutate} gender={'female'}  />
              ))}
              </div>
            </div>
            </div>
            <div className="Info_box"></div>
            </div>
    )
}
export default Women