import { useEffect, useRef, useState } from 'react';
import './arrival.scss';
import axios from 'axios';
import GetData from '../../../hook/getData/getData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Arrival() {
    const refBox = useRef(null);
    const SlideRef = useRef(null);
    const [turnWidth, setTurnWidth] = useState(0);
    const [turn, setTurn] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const GetArrival = async (id) => {
        const { data } = await axios.get(`http://clothes/product/getArrival.php`);
        return data;
    };

    const { data, isSuccess, error } = GetData(GetArrival, 'getProduct');
    useEffect(() => {
        if (data && refBox.current) {
            setTurnWidth(refBox.current.offsetWidth);
        }
    }, [data]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (data && refBox.current) {
                setTurnWidth(refBox.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [data]);

    useEffect(() => {
        if (SlideRef.current && windowWidth > 1052) {
            SlideRef.current.style.transform = `translateX(-${(turnWidth + 38) * turn}px)`;
        } else if (SlideRef.current) {
            SlideRef.current.style.transform = `translateX(0)`;
        }
    }, [turn, turnWidth,windowWidth]);

    const handleClick = (direction) => {
        if (direction === 'left' && turn > 0) {
            setTurn((prevTurn) => prevTurn - 1);
        } else if (direction === 'right' && turn < data.length - Math.floor(refBox.current.offsetWidth / turnWidth)) {
            setTurn((prevTurn) => prevTurn + 1);
        }
    };

    return (
        <div className="Arrival_container">
<div className="Title_box"><h1 className='Title'>New Arrival</h1></div>

            <div className="Arrivals">
                <div className="Slide" ref={SlideRef}>
                    {data?.map((e, index) => (
                        <div className="Arrival_box" ref={refBox} key={index}>
                            <div className="Img_box">
                                <img src={e.img} alt={e.name} />
                            </div>
                            <div className="Title_box">
                                <h1>{e.name}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="Direction_box">
                {data?.length > 4 && (
                    <>
                        <div className="Left" onClick={() => handleClick('left')}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </div>
                        <div className="Right" onClick={() => handleClick('right')}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Arrival;
