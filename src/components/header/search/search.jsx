import anime from 'animejs';
import { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Store } from '../../../redux/redux';
function Search() {
    const [open, setOpen] = useState(Store.getState().menu.open);
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
            targets:'.Input_header_search',
            width:[0,'100%']
        })
      }, []);

      useEffect(() => {
        const handleStateChange = () => {
          setOpen(Store.getState().menu.open);
        };
        Store.subscribe(handleStateChange);
     
      }, []);
      const [hide, setHide] = useState(Store.getState().userHidEl.open);
      useEffect(() => {
          const handleStateChange = () => {
            setHide(Store.getState().userHidEl.open);
          };
          Store.subscribe(handleStateChange);
      
        }, []);

return(
    <div style={hide ? {width:'5%' }:{width:'10%'}}  className={`Search_box `}><button><FontAwesomeIcon icon={faMagnifyingGlass}/></button><input className='Input_header_search'  placeholder='Search' type="text"/></div>
)
}
export default Search