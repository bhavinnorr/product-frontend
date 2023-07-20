import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Modal, Button } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";
import {
  Modal as Modalantd,
  Upload,
  Select,
  Input,
  Form,
  InputNumber,
} from "antd";
// import {
//   Field,
//   Form,
//   Formik,
//   FieldArray as FormikSelect,
//   useFormik,
// } from "formik";
import "./components.css";
import check from "../../assets/check.svg";
import cross from "../../assets/cross.svg";
import checkWhite from "../../assets/check-white.svg";
import checkGreen from "../../assets/check-green.svg";
import axios from "axios";
import { requestInterceptor } from "../../helpers/BearerAdder";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Table() {
  const [fileListValidate, setfileListValidate] = useState();
  const navigate = useNavigate();
  axios.interceptors.request.use((request) => requestInterceptor(request));
  axios.interceptors.response.use(
    function (response) {
      console.log("response", response.data);
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      console.log("response", error);
      if (error.response.data.message == "Unauthenticated.") {
        navigate("/user/login");
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState([]);
  const [id, setId] = useState(0);
  const addModal = async () => {
    setEdit(false);
    setFileList([]);
    setInitialValues({
      name: null,
      in_stock: null,
      category: null,
      price: null,
    });
    setShow(true);
  };
  const editModal = async (id) => {
    setId(id);
    setEdit(true);
    console.log(id);
    let a = await axios.get("http://localhost:8000/api/products/" + id);
    let res = await a.data;
    console.log("images:- ", res.data);
    setFileList(res.data.images[0].file_name);
    normFile(res.data.images[0].file_name);
    // let img = [];
    // for (let i = 0; i < res.data.image.length; i++) {
    //   img.push(res.data.image[i]);
    // }
    setImage();
    setInitialValues({
      name: res.data.name,
      in_stock: res.data.in_stock,
      category: res.data.category,
      price: res.data.price,
      fileList: res.data.images[0].file_name,
    });
    setShow(true);
  };
  const [initialValues, setInitialValues] = useState({});
  const CustomInputComponent = (props) => (
    <input className="my-custom-input" type="text" />
  );
  const [products, setProducts] = useState([]);
  const [in_stock, setInStock] = useState();
  // const
  const table = async () => {
    let a = await axios.get("http://127.0.0.1:8000/api/products");
    let b = await a.data;
    for (let i = 0; i < b.data.length; i++) {
      console.log(new Date(b.data[i].updated_at).toDateString());
      b.data[i].created_at = new Date(b.data[i].created_at).toDateString();
      b.data[i].updated_at = new Date(b.data[i].updated_at).toDateString();
    }
    setProducts(b.data);
    return b;
  };
  useEffect(() => {
    table();
  }, []);
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "error",
    // },
  ]);
  const product = {
    name: "Bhavin",
    in_stock: "no",
    images: [],
    category: "Electronics",
    price: 0,
  };
  const handleCategory = (value) => {
    product.category = value;
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleDelete = (e) => {
    console.log("handleDelete:- ", e);
    console.log("fileList:-(onDelete) ", fileList);
    let a = JSON.parse(JSON.stringify(fileList));
    let b = [];
    for (let i = 0; i < fileList.length; i++) {
      console.log(i);
      if (fileList[i].name == e.name) {
        // a.splice(i, 1);
        b.push(a[i]);
        console.log("b[b.length - 1]:- ", b, ", a:- ", a);
        // console.log("B:- ",b);
        b[b.length - 1]["removed"] = true;
      } else {
        b.push(a[i]);
      }
    }
    setFileList(b);
    // e.name;
  };
  const normFile = (e) => {
    console.log("dasdasdas");
    if (Array.isArray(e)) {
      console.log("Array is array(e)  normfile:- ", e);
      return e;
    }
    console.log("e normfile:- ", e);
    console.log("filelist:- ");
    let a = [...fileList];

    return e?.fileList.filter((file) => {
      return !("removed" in file);
    });
  };
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status === "done") {
        // let a = {};
        console.log(info);
        info.file.name = info.file.response.data.name;
        info.file.url = info.file.response.data.url;
        // info.fileList[fileList.length]
        setFileList(info.fileList);

        // console.log(
        //   "Filelist structuredclone:- ",
        //   JSON.stringify(fileList)),
        //   "\nfileList:- ",
        //   fileList
        // );
        // const list = JSON.stringify(fileList));
        // list.push(a);
        // console.log(a);
        // setFileList(list);
        // console.log(info.file.response.data.name);
      }
    },
  };
  // const handleUpload = async (file) => {
  //   const response = await fetch("http://127.0.0.1:8000/api/save-", {
  //     method: 'POST',
  //     body: file,
  //     // Set the content type to multipart/form-data.
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });

  // const json = await response.json();
  // console.log(json)
  // Do something with the response JSON.
  // };
  return (
    <>
      {/* <Navbar /> */}
      <Modal
        style={{ backgroundColor: "transparent" }}
        show={show}
        onHide={modalClose}
      >
        {/* <Modal.Dialog> */}
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={initialValues}
            onFinish={async (values) => {
              if (edit) {
                console.log(values);
                let a = [];
                for (let i = 0; i < fileList.length; i++) {
                  if ("removed" in fileList[i]) {
                    continue;
                  } else {
                    a.push(fileList[i]);
                  }
                }
                values.fileList = fileList;
                const res = await axios.put(
                  "http://127.0.0.1:8000/api/products/" + id,
                  values
                );
                const data2 = await res.data;
                alert(data2.message);
                console.log(data2);
                table();
              } else {
                console.log(values);
                values.fileList = fileList;
                const res = await axios.post(
                  "http://127.0.0.1:8000/api/products",
                  values
                );
                const data2 = await res.data;
                alert(data2.message);
                console.log(data2);
                table();
              }
            }}
            // onFinishFailed={alert("Unknown Error Occured")}
            autoComplete="off"
          >
            Name:-
            <br />
            {/* <Field name="name" placeholder="Enter Name" /> */}
            <Form.Item
              // label="name"
              style={{ width: "150%" }}
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                name="name"
                style={{ width: "100%" }}
                placeholder="Enter Product Name"
              />
            </Form.Item>
            {/* <input type="text" name="name" style={{ width: "100%" }} /> */}
            <br />
            Is in Stock <br />
            <Form.Item
              // label="name"
              style={{ width: "150%" }}
              name="in_stock"
              // initialValue={initialValues.in_stock}
              // value={initialValues.in_stock}
              rules={[
                {
                  required: true,
                  message: "Please select in stock status",
                },
              ]}
            >
              <div style={{ display: "flex" }}>
                <div style={{ flexGrow: "1", padding: "0 10px 0 0" }}>
                  <input
                    type="radio"
                    name="in_stock"
                    id="yes"
                    value="yes"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="yes"
                    id="color"
                    className="btn btn-outline-success d-flex align-items-center justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <svg
                      style={{ marginRight: "auto 10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="10.728"
                      height="8"
                      viewBox="0 0 10.728 8"
                    >
                      <path
                        data-name="Icon awesome-check"
                        d="M3.644 12.42.157 8.933a.536.536 0 0 1 0-.759l.759-.759a.536.536 0 0 1 .759 0l2.348 2.35 5.031-5.031a.536.536 0 0 1 .759 0l.759.759a.536.536 0 0 1 0 .759L4.4 12.42a.536.536 0 0 1-.756 0z"
                        transform="translate(0 -4.577)"
                        // style="fill:#fff"
                      />
                    </svg>
                    <span style={{ margin: "0 5px" }}></span>Yes
                  </label>
                  {/* </button> */}
                  {/* </label> */}
                </div>
                <div style={{ flexGrow: "1", padding: "0 0 10px 0" }}>
                  {/* <button
                
              > */}
                  <input
                    type="radio"
                    name="in_stock"
                    id="no"
                    value="no"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="no"
                    id="color"
                    className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                    style={{ width: "100%" }}
                  >
                    {/* <img src={cross} alt="" /> */}
                    <svg
                      style={{ marginRight: "auto 10px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="15px"
                      height="15px"
                      viewBox="0 0 15 14"
                      version="1.1"
                    >
                      <g id="surface1">
                        <path
                          // style={{stroke:"none",fillRule:"nonzero",fill:"rgb(100%,100%,100%)",fillOpacity:"1"}}
                          d="M 12.539062 10.574219 L 11.328125 11.703125 C 11.109375 11.910156 10.746094 11.910156 10.523438 11.703125 L 7.5 8.882812 L 4.476562 11.703125 C 4.253906 11.910156 3.890625 11.910156 3.671875 11.703125 L 2.460938 10.574219 C 2.238281 10.367188 2.238281 10.03125 2.460938 9.824219 L 5.484375 7 L 2.460938 4.179688 C 2.238281 3.96875 2.238281 3.628906 2.460938 3.425781 L 3.671875 2.296875 C 3.890625 2.089844 4.253906 2.089844 4.476562 2.296875 L 7.5 5.121094 L 10.523438 2.296875 C 10.746094 2.089844 11.109375 2.089844 11.328125 2.296875 L 12.539062 3.425781 C 12.761719 3.632812 12.761719 3.972656 12.542969 4.179688 L 9.515625 7 L 12.539062 9.824219 C 12.761719 10.03125 12.761719 10.367188 12.539062 10.574219 Z M 12.539062 10.574219 "
                        />
                      </g>
                    </svg>
                    <span style={{ margin: "0 5px" }}></span>No
                  </label>
                  {/* </button> */}
                </div>
              </div>
            </Form.Item>
            {/* <input type="radio" name="in_stock" id="no" value="no" />
          <label htmlFor="no">No</label> */}
            {/* <br /> */}
            Images
            <br />
            {console.log(fileList)}
            <Form.Item
              // label="name"
              style={{ width: "150%" }}
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required:
                    fileList.filter((file) => {
                      return !("removed" in file);
                    })?.length === 0
                      ? true
                      : false,
                  message: "Please select at least one image",
                },
              ]}
            >
              <Upload
                {...props}
                multiple={true}
                action="http://127.0.0.1:8000/api/save-file"
                accept="image/*"
                listType="picture-card"
                defaultFileList={fileList}
                onPreview={handlePreview}
                onRemove={(e) => {
                  handleDelete(e);
                }}
                headers={{
                  Authorization: "Bearer " + localStorage.getItem("token"),
                }}
                fileList={{ ...image }}
              >
                {fileList.filter((file) => {
                  return !("removed" in file);
                }).length >= 4
                  ? null
                  : uploadButton}
              </Upload>
            </Form.Item>
            <Modalantd
              style={
                {
                  // position: "absolute",
                  // top:"0",
                  // bottom:"0",
                  // right:"0",
                  // left:"0",
                  // zIndex:"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
                }
              }
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modalantd>
            <br />
            Category:-
            <br />
            {/* <Field
              as="select"
              name="category"
              options={[
                { value: "red", text: "Red" },
                { value: "green", text: "Green" },
                { value: "blue", text: "Blue" },
              ]}
              // value={initialValues.color}
              // onChange={handleChange}
            /> */}
            <Form.Item
              // label="name"
              style={{ width: "150%" }}
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select a category",
                },
              ]}
            >
              <Select
                placeholder="Select Category"
                name="category"
                // onChange={(value) => formik.setFieldValue("category", value)}
                // onBlur={handleBlur}
                style={{
                  width: "100%",
                }}
                // onChange={handleChange}
                options={[
                  {
                    value: "Electronics",
                    label: "Electronics",
                  },
                  {
                    value: "Clothes",
                    label: "Clothes",
                  },
                  {
                    value: "Accessories",
                    label: "Accessories",
                  },
                  {
                    value: "Groceries",
                    label: "Groceries",
                  },
                ]}
              />
            </Form.Item>
            {/* {errors.color && <div className="input-feedback">{errors.color}</div>} */}
            {/* <FormikSelect name="firstName" as={CustomInputComponent} placeholder="First Name"/> */}
            <br />
            Price <br />
            <Form.Item
              // label="name"
              style={{ width: "150%" }}
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please put a Price",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                controls={false}
                name="price"
                // onChange={(value) => formik.setFieldValue("price", value)}
                prefix="₹"
                suffix="Rupees"
              />
            </Form.Item>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </Form>
          {/* </Form>)}
          </Formik> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close Modal
          </Button>
        </Modal.Footer>
        {/* </Modal.Dialog> */}
      </Modal>

      <div className="container mt-5">
        <button className="btn btn-primary my-2 float-right" onClick={addModal}>
          + Add Product
        </button>
        <table className="table table-striped rounded table-responsive">
          <thead className="thead-dark rounded">
            <tr>
              {products?.length > 0 &&
                Object.keys(products[0]).map((key, i) => {
                  return (
                    <th scope="col" key={i}>
                      {key[0].toUpperCase() + key.slice(1).replace("_", "")}
                    </th>
                  );
                })}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => {
              return (
                <tr key={i}>
                  {Object.values(product).map((key, i) => {
                    return (
                      <td scope="col" key={i}>
                        {JSON.stringify(key).length > 40 ? (
                          <img
                            src={key[0].file_name[0].url}
                            alt=""
                            width="80px"
                          />
                        ) : key == null ? (
                          <span
                            className="rounded-pill bg-danger text-light px-2"
                            style={{ fontWeight: "bold" }}
                          >
                            null
                          </span>
                        ) : key == "1" ? (
                          <span
                            className="rounded-pill bg-success text-light px-2"
                            style={{ fontWeight: "bold" }}
                          >
                            yes
                          </span>
                        ) : key == "0" ? (
                          <span
                            className="rounded-pill bg-danger text-light px-2"
                            style={{ fontWeight: "bold" }}
                          >
                            no
                          </span>
                        ) : (
                          key
                        )}
                      </td>
                    );
                  })}
                  <td>
                    <button
                      className="btn btn-success py-0 px-2 fw-bold"
                      onClick={() => {
                        editModal(product.id);
                      }}
                      style={{ fontWeight: "bold" }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
