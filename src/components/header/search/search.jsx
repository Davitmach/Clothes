import anime from 'animejs';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
function Search() {

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

return(
    <div className="Search_box"><button><FontAwesomeIcon icon={faMagnifyingGlass}/></button><input placeholder='Search' type="text"/></div>
)
}
export default Search