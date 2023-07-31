import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Modal, Button } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";
import { Modal as Modalantd, Upload, Select, Input } from "antd";
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

export default function Invite() {
  const navigate = useNavigate();
  axios.interceptors.request.use((request) => requestInterceptor(request));
axios.interceptors.response.use(
  function (response) {
    console.log("response",response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("response", error);
    if (error.response.data.message == "Unauthenticated." || error.response.data == "Unauthorized") {
      localStorage.removeItem("token")
      navigate("/user/login");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
  const invite = async () => {
    setLoading(true);
    const data = await axios.post("http://127.0.0.1:8000/api/mail", {
      email: email,
      name: "Ravi",
    });

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>.", data);
    let data2 = await data;
    console.log("DATA response:- ", data2);
    alert(data2.message);
    console.log("Mail:- ", data2);

    setLoading(false);
    return data2;
  };
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);
  const table = async () => {
    let a = await axios.get("http://127.0.0.1:8000/api/users");
    let b = await a.json();
    console.log(b);
    setUsers(b.data);
    return b;
  };
  useEffect(() => {
    let api = async () => {
      let res = await axios.get("http://127.0.0.1:8000/api/users");
      let b = await res.data;
      console.log("useEffect:- ", b);
      // return
      console.log(b);
      for (let i = 0; i < b.data.length; i++) {
        console.log(new Date(b.data[i].updated_at).toDateString());
        b.data[i].created_at = new Date(b.data[i].created_at).toDateString();
        b.data[i].updated_at = new Date(b.data[i].updated_at).toDateString();
      }
      console.log(b.data);
      // const formattedDate = date.toLocaleDateString('en-GB');
      setUsers(b.data);
      return b;
    };
    api();
  }, []);
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
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Email:-
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary">Close Modal</Button> */}

          <Button variant="primary" onClick={() => invite()} disabled={loading}>
            {loading ? "Please wait...." : "Send Mail"}
          </Button>
        </Modal.Footer>
        {/* </Modal.Dialog> */}
      </Modal>

      <div className="container mt-5">
        <button
          className="btn btn-primary my-2 float-right"
          onClick={modalShow}
        >
          + Add User
        </button>
        <table className="table table-striped rounded overflow-hidden">
          <thead className="thead-dark rounded">
            <tr>
              {users?.length > 0 &&
                Object.keys(users[0]).map((key, i) => {
                  return (
                    <th scope="col" key={i}>
                      {key[0].toUpperCase() + key.slice(1).replace("_", " ")}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => {
              return (
                <>
                  <tr key={i}>
                    {Object.values(user).map((key, i) => {
                      return (
                        <td scope="col" key={i}>
                          {JSON.stringify(key).length > 40
                            ? JSON.stringify(key).slice(1, 10) +
                              "..." +
                              JSON.stringify(key).slice(
                                JSON.stringify(key).length - 11,
                                JSON.stringify(key).length-1
                              )
                            : key==null? <span className="rounded-pill bg-danger text-light px-2" style={{fontWeight:"bold"}}>null</span>:key}
                        </td>
                      );
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
