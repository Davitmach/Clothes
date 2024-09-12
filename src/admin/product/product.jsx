import { useForm } from "react-hook-form";
import "./product.scss";
import axios from "axios";
import { SetDataWithQueryClient } from "../../hook/setData/setData";
import GetData from "../../hook/getData/getData";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPenToSquare,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
function Product() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const formRef = useRef(null);
  const editImgRef = useRef(null);
  const [Colors, setColors] = useState([]);
  const [Sizes, setSizes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editChange, setEdit] = useState(false);
  const [edit, setEditData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  // server part
  const AddProduct = async (info) => {
    return await axios.post("http://clothes/admin/addProduct.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const FuncProduct = async (info) => {
    return await axios.post("http://clothes/admin/funcProduct.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const EditProduct = async (info) => {
    return await axios.post("http://clothes/admin/editProduct.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  const GetProducts = async (id) => {
    const { data } = await axios.get(`http://clothes/admin/getProduct.php`);
    return data;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    data: getData,
    isSuccess: getSuccess,
    error: getError,
  } = GetData(GetProducts, "getProduct");
  const { mutate, data, isSuccess, error } = SetDataWithQueryClient(
    AddProduct,
    "AddProduct",
    "getProduct"
  );
  useEffect(()=> {
console.log(data);


  },[data])
  const handle = async (data) => {
    window.scrollTo({
      top: document.body.scrollHeight - 200,
      behavior: "smooth",
    });
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("gender", data.gender);
    formData.append("type", data.type);
    formData.append("price", data.price);
    formData.append("img", data.img[0]);
    formData.append("shipping", data.shipping);
    formData.append("size", JSON.stringify(Sizes));
    formData.append("color", JSON.stringify(Colors));

    try {
      await mutate(formData);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  const handleEdit = (data) => {
    console.log(edit.id);
    
    ProductFunc(data.payload, edit.id, data);
    setEditId(null);
    setEditData(null);

    formRef.current.reset();
  };
  const { mutate: editMutate, data: editData } = SetDataWithQueryClient(
    EditProduct,
    "EditProduct",
    "getProduct"
  );
  const { mutate: funcMutate, data: funcData } = SetDataWithQueryClient(
    FuncProduct,
    "funcProduct",
    "getProduct"
  );
  useEffect(() => {
    console.log(funcData);
  }, [funcData]);
  // client part
  const addColor = () => {
    const isValidHexColor = /^#[0-9A-Fa-f]{6}$/;

    if (ref.current.value.length === 7) {
      if (isValidHexColor.test(ref.current.value)) {
        if (!Colors.includes(ref.current.value)) {
          setColors([...Colors, ref.current.value]);
        }
      }
    }

    console.log(Colors);
  };

  const removeColor = (c) => {
    setColors(Colors.filter((e) => e !== c)); // Удаляем цвет из массива
  };

  const addSize = () => {
    const allowedSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

    const containsNumbers = /\d/.test(ref2.current.value);

    const isValidSize = allowedSizes.includes(ref2.current.value.toUpperCase());

    if (!containsNumbers && isValidSize) {
      if (!Sizes.includes(ref2.current.value)) {
        setSizes([...Sizes, ref2.current.value.toUpperCase()]);
      }
    }

    console.log(Sizes);
  };

  const removeSize = (c) => {
    setSizes(Sizes.filter((e) => e !== c));
    console.log(Sizes);
  };

  const editPhoto = (id) => {
    editImgRef.current.dataset.id = id;
    editImgRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const id = e.target.dataset.id;

    if (file) {
      setSelectedFile(file);
      setSelectedFileId(id);

      const formData = new FormData();
      formData.append("img", file);
      formData.append("payload", "EditImg");
      formData.append("id", id);
      editMutate(formData);
    }
  };

  const ProductFunc = (status, id, payload) => {
    funcMutate({
      status: status,
      id: id,
      payload: payload,
    });
  };
  const ChangeProduct = () => {
    console.log(1);
  };
  return (
    <div className="Add_product_container">
      <div className="Add_form">
        <form
          ref={formRef}
          action=""
          onChange={() => {
            if (editId !== null) {
              setEdit(true);
            }
          }}
          onSubmit={
            editId == null ? handleSubmit(handle) : handleSubmit(handleEdit)
          }
        >
          {edit !== null ? (
            <>
              <input {...register("id")} value={edit.id} type="hidden" />
              <input type="hidden" {...register("payload")} value={"edit"} />
            </>
          ) : (
            ""
          )}
          <div className="Title_box">
            <h1>{editId !== null ? "Edit" : "Add"} Product</h1>
          </div>
          <input
            {...register("name")}
            placeholder="Name"
            required
            type="text"
            defaultValue={editId !== null ? edit.name : ""}
          />
          <input
            {...register("gender")}
            placeholder="Gender: male/female"
            required
            pattern="male|female"
            type="text"
            defaultValue={editId !== null ? edit.gender : ""}
          />
          <input
            {...register("type")}
            placeholder="Type"
            required
            type="text"
            defaultValue={editId !== null ? edit.type : ""}
          />
          <div
            className="Size_box"
            style={editId != null ? { display: "none" } : { display: "flex" }}
          >
            <div className="Add_size">
              <div className="Size">
                <input placeholder="Size" ref={ref2} type="text" />
              </div>
              <div className="Add_btn">
                <button type="button" onClick={() => addSize()}>
                  Add Size
                </button>
              </div>
            </div>
            <div className="Sizes">
              {Sizes.map((e) => (
                <div className="Added_size_box">
                  <div className="Size">{e}</div>
                  <div className="Delete" onClick={() => removeSize(e)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="Color_box"
            style={editId != null ? { display: "none" } : { display: "flex" }}
          >
            <div className="Add_color">
              <div className="Color">
                <input placeholder="Color" ref={ref} type="text" />
              </div>
              <div className="Add_btn">
                <button type="button" onClick={() => addColor()}>
                  Add Color
                </button>
              </div>
            </div>
            <div className="Colors">
              {Colors.map((e) => (
                <div className="Added_color_box">
                  <div
                    className="Color"
                    style={{
                      background: e,
                      width: "30px",
                      height: "30px",
                      borderRadius: "12px",
                    }}
                  ></div>
                  <div className="Delete" onClick={() => removeColor(e)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <input
            {...register("price")}
            placeholder="Price"
            required
            type="text"
            defaultValue={editId !== null ? edit.price / 10 : ""}
          />
          {editId != null ? (
            ""
          ) : (
            <input {...register("img")} accept="image/*" required type="file" />
          )}
          <input
            {...register("shipping")}
            placeholder="Shipping: true(Paid)/false(Free)"
            required
            type="text"
            pattern="false|true"
            defaultValue={editId !== null ? edit.shipping : ""}
          />
          <button
            onClick={() => {
              if (editChange == false) {
                setEditId(null);
                setEdit(false);
                setEditData(null);
      
              }
            }}
          >
            {" "}
            {editId !== null ? (editChange ? "Edit" : "Cancel") : "Add"}
          </button>
        </form>
      </div>
      <div className="Products">
        {getData?.map((el) => (
          <div className="Product_box">
            <div className="Img_box">
              <img src={el.img} alt="" />
              <div className="Edit_box">
                <FontAwesomeIcon
                  onClick={() => editPhoto(el.id)}
                  icon={faPlus}
                />
                <input
                  onChange={handleImageChange}
                  data-id={el.id}
                  style={{ visibility: "hidden", position: "absolute" }}
                  ref={editImgRef}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="Info_box">
              <div className="Name">
                <h1>{el.name}</h1>
              </div>
              <div className="Price">
                <span>{el.price / 10}$</span>
              </div>
              <div className="Gender">
                <h2>Gender: {el.gender}</h2>
              </div>
              <div className="Shipping">
                Shipping: {el.shipping == false ? "Paid" : "Free"}
              </div>
              <div className="Type">
                <h2>{el.type}</h2>
              </div>
              <div className="Color_box">
                <div className="Title_box">Colors</div>
                <div className="Info">
                  {JSON.parse(el?.color).map((e) => (
                    <div className="Product_color">
                      <div
                        className="Color"
                        style={{
                          background: e,
                          width: "30px",
                          height: "30px",
                          borderRadius: "12px",
                        }}
                      ></div>
                      <div className="Remove_box">
                        <FontAwesomeIcon
                          onClick={() => ProductFunc("delColor", el.id, e)}
                          icon={faXmark}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="Size_box">
                <div className="Title_box">Sizes</div>
                <div className="Info">
                  {JSON.parse(el.size).map((e) => (
                    <div className="Product_size_box">
                      <div className="Size">{e}</div>
                      <div className="Remove_box">
                        <FontAwesomeIcon
                          onClick={() => ProductFunc("delSize", el.id, e)}
                          icon={faXmark}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="Func_box">
              <div>
                <button
                  className="Delete"
                  onClick={() => ProductFunc("delete", el.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
              </div>
              <div>
                <button
                  className="Edit"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setEditData(el);

                    setEdit(false);

                    setEditId(el.id);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Product;
