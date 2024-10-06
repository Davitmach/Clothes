import GetData from "../../hook/getData/getData";
import LeftBar from "../leftBar/leftBar"
import axios from "axios";
import { useEffect ,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { SetData } from "../../hook/setData/setData";
import './women.scss'
import { Link } from "react-router-dom";
import useViewed from "../../hook/viewedProduct/viewedProduct";
 function Women() {
  const [type,setType] = useState('New');
  const [dataLoad,setDataLoad] = useState(false);
  const [rec,setRec] = useState([]);
  const {SetProduct} = useViewed()
    const GetCategories= async (id) => {
        const { data } = await axios.get(`http://clothes/product/getCat.php?gender=women`);
        return data;
      };
      const {data,isSuccess,error} = GetData(GetCategories,'getWomenCar');
      const Products= async (id) => {
        const { data } = await axios.get(`http://clothes/product/getWomenProducts.php`);
        return data;
      };
      const ProductsRec= async (id) => {
        const { data } = await axios.get(`http://clothes/product/getProductsRec.php?gender=female`);
        return data;
      };
      const FuncProduct = async (info) => {
        return await axios.post("http://clothes/product/funcProduct.php", info, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
      };
      const {data:productData,isSuccess:productSuccess,error:productError} = GetData(Products,'getWomenProduct');
      const {mutate,data:funcData} = SetData(FuncProduct,'ProductFunc')
      const {data:recData,isSuccess:recSuccess,error:recError} = GetData(ProductsRec,'getRecProduct')
      useEffect(()=> {
        if(funcData?.data) {
        setDataLoad(true)
        }
        console.log(funcData);
        
        
              },[funcData])

              useEffect(()=> {
          
                if(type == 'Recommended') {
                  setRec(recData)
                }
                
                
                          },[type,recData])
                          const Product = type == 'Recommended' ? rec : dataLoad  ? funcData?.data : productData
      return(
        <div className="Women_container">
          <div className="Product_container">
            {data ? (<LeftBar mutate={mutate}  info={data} gender="women"/>) : ''}
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
              <div className="Products">{Product?.map((product)=> (
                <div className="Product_box">
                  <div className="Img_box">
                    <img src={product.img}/>
                    <div className="Like_box"><FontAwesomeIcon icon={faHeart}/></div>
                  </div>
                  <div className="Info_box">
                  <Link to={`/productPage/${product.id}`} onClick={()=> SetProduct(product)}>
                    <div className="Name_box"><h1>{product.name.length > 16 ? product.name.substring(0,16)+'...' :product.name}</h1></div>
                    <div className="Price_box"><span>${(product.price/10).toFixed(2)}</span></div>
                  </Link>
                  </div>
                </div>
              ))}</div>
            </div>
            </div>
            <div className="Info_box"></div>
            </div>
    )
}
export default Women