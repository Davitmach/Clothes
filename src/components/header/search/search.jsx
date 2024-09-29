import anime from 'animejs';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Store } from '../../../redux/redux';
import { SetData } from '../../../hook/setData/setData';
import axios from 'axios';
import { Link } from "react-router-dom";

function Search() {
    const [open, setOpen] = useState(Store.getState().menu.open);

    useEffect(() => {
        const anim = anime.timeline({
            duration: 1000,
            easing: 'easeOutQuint'
        });
        anim
            .add({
                targets: 'button',
                opacity: [0, 1],
            })
            .add({
                targets: '.Input_header_search',
                width: [0, '100%']
            });
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

    const Search = async (info) => {
        return await axios.post("http://clothes/product/search.php", info, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    };

    const { mutate, data, isSuccess, error } = SetData(Search, 'SearchData');

    useEffect(() => {
    
    }, [data]);

    const handleInput = (e) => {
        if (e.target.value.length > 0) {
            mutate({
                search: e.target.value
            });
        } else {
            mutate({
                search: ''
            });
        }
    };

    return (
        <div style={hide ? { width: '5%' } : { width: '10%' }} className="Search_box">
            <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
                onInput={handleInput}
                className="Input_header_search"
                placeholder="Search"
                type="text"
            />
            {data?.data ? (
                <div className="Searches" >
                    {Array.isArray(data?.data) && data?.data.length > 0 ? (
                        data.data.map((e) => (
                            <div className="Product" key={e.id}>
                                <Link to={`/productPage/${e.id}`}>
                                    <div className="Img">
                                        <img src={e.img} alt={e.name} />
                                    </div>
                                    <div className="Info">
                                        <div className="Name">
                                            <h1>{e.name.length > 17 ? e.name.substring(0, 17) + '...' : e.name}</h1>
                                        </div>
                                        <div className="Price">
                                            <span>{(e.price / 10).toFixed(2)}$</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                       ''
                    )}
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default Search;
