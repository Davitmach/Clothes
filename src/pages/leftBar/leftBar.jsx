import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./leftBar.scss";
import {
  faAngleUp,
  faChevronRight,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect, useMemo } from "react";
import ColorNamer from "color-namer";
import { useLocation } from "react-router-dom";
function LeftBar(props) {
  const Gender = props.gender;
  const Info = props.info;
  const Mutate = props.mutate;
  const rangeRef = useRef(null);
  var userId = props.id;
  const prices = Info.map((e) => Number(e.price) / 10);
const Location = useLocation();

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState(false);
  const [color, setColor] = useState(false);
  const [size, setSize] = useState(false);
  const [activeType, setActiveType] = useState("");
  const [activePrice,setActivePrice] = useState('');
  const [activeColor,setActiveColor] = useState('');
  const [activeSize,setActiveSize] = useState('');
  const [filter,setFilter] = useState({
    type:'',
    price:[min,max],
    size:'',
    color:''
  })
  const ChangeValue = (type) => {
    if (type === "min") {
      const newMin = Number(minRef.current.value);
      setMin(newMin);

      if (newMin >= max) {
        const newMax = newMin + 1;
        setMax(newMax);
        maxRef.current.value = newMax;
      }
    }

    if (type === "max") {
      const newMax = Number(maxRef.current.value);
      setMax(newMax);

      if (newMax <= min) {
        const newMin = newMax - 1;
        setMin(newMin);
        minRef.current.value = newMin;
      }
    }
  };
  const extractUniqueColors = (infoArray) => {
    const allColors = infoArray.flatMap((e) => JSON.parse(e.color));

    const uniqueColors = [...new Set(allColors)];

    const colorObjects = uniqueColors.map((color) => {
      const colorName = ColorNamer(color).basic[0]?.name || "Unknown";
      return { color, name: colorName };
    });

    return colorObjects;
  };
  const extractUniqueSizes = (infoArray) => {
    const allSizes = infoArray.flatMap((e) => JSON.parse(e.size));

    return [...new Set(allSizes)];
  };

  useEffect(() => {
    setColors(extractUniqueColors(Info));
    setSizes(extractUniqueSizes(Info));
  }, [Info]);

  useMemo(() => {
    const minPercent = ((min - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent = ((max - minPrice) / (maxPrice - minPrice)) * 100;

    const clampedMinPercent = Math.max(0, Math.min(100, minPercent));
    const clampedMaxPercent = Math.max(
      clampedMinPercent,
      Math.min(100, maxPercent)
    );

    if (rangeRef.current) {
      rangeRef.current.style.left = `${clampedMinPercent}%`;
      rangeRef.current.style.width = `${
        clampedMaxPercent - clampedMinPercent
      }%`;
    }
  }, [min, max]);

  const HandleFunc = (state,gender) => {
    Mutate({
 
      state: state,
gender:gender,
userId:userId
    });
  };
  const HandleOpenMenu = (payload) => {
    switch (payload) {
      case "price":
        setPrice((e) => !e);
        break;
      case "color":
        setColor((e) => !e);
        break;
      case "size":
        setSize((e) => !e);
        break;
    }
  };
useEffect(()=> {
  if(Location.pathname == '/men') {
  
HandleFunc(filter,'male')
  }
  else {
    HandleFunc(filter,'female')
  }

},[filter])
  return (
    <div className="Left_container">
      <div className="Title_box">
        <div>
          <h1>Filter</h1>
        </div>
        <div className="Icon">
          <FontAwesomeIcon icon={faSliders} />
        </div>
      </div>
      <div className="Types_box">
        {Info.map((e) => (
          <div
            className={`Type ${activeType == e.type ? 'Active' :''}`}
            key={e.type}
            onClick={() => {
        
              setActiveType(e.type);
              setFilter((q)=>({
                ...q,
                type:e.type
              }) )
              
            }}
          >
            <h3>{e.type}</h3>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        ))}
      </div>
      <div className="Price_box">
        <div className="Title_box">
          <div className="Title">
            <h1>Price</h1>
          </div>
          <div className="Open_close_btn">
            <button onClick={() => HandleOpenMenu("price")}>
              <FontAwesomeIcon
                style={
                  !price
                    ? { transform: "rotate(0)" }
                    : { transform: "rotate(180deg)" }
                }
                icon={faAngleUp}
              />
            </button>
          </div>
        </div>
        <div className={`Price_cont ${!price ? "Disable" : "Active"}`}>
          <div id="Filter_box">
            <div className="Slider_track"></div>
            <div
              style={{ width: "100%" }}
              className="Slider_range"
              ref={rangeRef}
            ></div>
            <input
              onChange={() => {
                ChangeValue("min");
              }}
              onMouseUp={() => {
      
                setFilter((e)=>({
                  ...e,
                  price:[min,max]
                }))
                setActivePrice([min,max])
              }}
              onTouchEnd={()=> {
                setFilter((e)=>({
                  ...e,
                  price:[min,max]
                }))
                setActivePrice([min,max])
                
              }}
              ref={minRef}
              id="Input1"
              type="range"
              min={minPrice}
              max={maxPrice}
              defaultValue={minPrice}
            />
            <input
              onChange={() => ChangeValue("max")}
              onMouseUp={() => {
          
                setFilter((e)=>({
                  ...e,
                  price:[min,max]
                }))
                setActivePrice([min,max])
              }}
              onTouchEnd={()=> {
                setFilter((e)=>({
                  ...e,
                  price:[min,max]
                }))
                setActivePrice([min,max])
              }}
              ref={maxRef}
              id="Input2"
              type="range"
              min={minPrice}
              max={maxPrice}
              defaultValue={maxPrice}
            />
          </div>
          <div className="Price">
            <div>
              <span>{min}$</span>
            </div>
            <div>
              <span>{max}$</span>
            </div>
          </div>
        </div>
      </div>
      <div className="Color_box">
        <div
          className="Title_box"
          style={
            price
              ? { borderTop: "1px solid #BEBCBD" }
              : { borderTop: "1px solid transparent" }
          }
        >
          <div className="Title">
            <h1>Colors</h1>
          </div>
          <div className="Open_close_btn">
            <button onClick={() => HandleOpenMenu("color")}>
              <FontAwesomeIcon
                style={
                  !color
                    ? { transform: "rotate(0)" }
                    : { transform: "rotate(180deg)" }
                }
                icon={faAngleUp}
              />
            </button>
          </div>
        </div>
        <div className={`Colors_box ${!color ? "Disable" : "Active"}`}>
          {colors.map((e) => (
            <div
              onClick={() => {
            
                setFilter((eq)=>({
                  ...eq,
                  color:e.color
                }))
                setActiveColor(e.color);
              }}
              className={`Color ${!color ? "Disable_box" : "Active_box"}`}
            >
              <div className={activeColor == e.color ? 'Active_color' : ''}
                style={{ background: e.color, height: "40px", width: "40px" }}
              ></div>
              <div>{e.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="Size_box">
        <div
          className="Title_box"
          style={
            color
              ? { borderTop: "1px solid #BEBCBD" }
              : { borderTop: "1px solid transparent" }
          }
        >
          <div className="Title">
            <h1>Size</h1>
          </div>
          <div className="Open_close_btn">
            <button onClick={() => HandleOpenMenu("size")}>
              <FontAwesomeIcon
                style={
                  !size
                    ? { transform: "rotate(0)" }
                    : { transform: "rotate(180deg)" }
                }
                icon={faAngleUp}
              />
            </button>
          </div>
        </div>
        <div className={`Sizes_box ${!size ? "Disable" : "Active"}`}>
          {sizes.map((e) => (
            <div
              className={`Size ${activeSize == e ? 'Active' :""}` }
              onClick={() => {
         
                setFilter((eq)=>({
                  ...eq,
                  size:e
                }))
                setActiveSize(e);
              }}
            >
              {e}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
