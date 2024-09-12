import { useEffect } from 'react';
import GetData from '../../../hook/getData/getData';
import './women.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Women() {
    const GetCategories= async (id) => {
        const { data } = await axios.get(`http://clothes/product/getWomenCategories.php?categories=women`);
        return data;
      };
const {data,isSuccess,error} = GetData(GetCategories,'getCategoriesWomen');
useEffect(()=> {
console.log(data);

},[data])

return(
    <div className='Women_categories'>
        <div className='Title_box'><div className="Title"><h1>Categories For Women</h1></div></div>
        <div className='Categories_box'>{data?.map((cat)=>(
            <div className='Categories'>
                <div className='Img_box'><img src={cat.img}/></div>
                <div className='Info_box'>
                   <div className='Cat'>
                    <div><h1>{cat.type}</h1></div>
                    <div><span>Explore Now!</span></div>
                   </div>
                   <div className='Button'><Link to={'/women'}><FontAwesomeIcon icon={faArrowRight}/></Link></div>
                </div>
            </div>
        ))}</div>
    </div>
)
}
export default Women;