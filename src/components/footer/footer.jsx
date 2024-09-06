import './footer.scss';
import Menu from './Menu/Menu';
import Social from './Social/Social';
import Text from './text/text';
import { useState,useEffect } from 'react';
import { Store } from '../../redux/redux';
function Footer() {
    const [hide, setHide] = useState(Store.getState().userHidEl.open);
    useEffect(() => {
        const handleStateChange = () => {
          setHide(Store.getState().userHidEl.open);
        };
        Store.subscribe(handleStateChange);
    
      }, []);

    return (
        <footer style={hide ? {display:'none'}:{display:'grid'}}>
            <Menu />
            <Social />
            <Text />
        </footer>
    )
}
export default Footer