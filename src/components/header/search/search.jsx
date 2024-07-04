import anime from 'animejs';
import { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Store } from '../../../redux/redux';
function Search() {
    const [open, setOpen] = useState(Store.getState().open);
    useEffect(() => {
       const anim =  anime.timeline({
          duration:1000,
          easing:'easeOutQuint'
        
        });
        anim
        .add({
            targets:'button',
            opacity:[0,1],
          
        })
        .add({
            targets:'input',
            width:[0,'100%']
        })
      }, []);

      useEffect(() => {
        const handleStateChange = () => {
          setOpen(Store.getState().open);
        };
        Store.subscribe(handleStateChange);
     
      }, []);


return(
    <div className={`Search_box ${open ? 'Active_search' :'Disable_search'}`}><button><FontAwesomeIcon icon={faMagnifyingGlass}/></button><input placeholder='Search' type="text"/></div>
)
}
export default Search