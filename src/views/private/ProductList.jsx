import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import { Card, List, Carousel } from "antd";
import axios from "axios";
import { requestInterceptor } from "../../helpers/BearerAdder";
import { useNavigate } from "react-router-dom";
const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
// const data = [
//   {
//     title: "Product 1",
//     image:
//       ["https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp","https://i.insider.com/5db07d2c4af909315229faa2?width=700","https://images.unsplash.com/photo-1587840178393-079769787b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80","https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp"],
//     price: "200",
//     in_stock: true,
//     category: "electronics",
//   },
//   {
//     title: "Product 2",
//     image:
//       ["https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp","https://i.insider.com/5db07d2c4af909315229faa2?width=700","https://images.unsplash.com/photo-1587840178393-079769787b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80","https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp"],
//     price: "200",
//     in_stock: true,
//     category: "electronics",
//   },
//   {
//     title: "Product 3",
//     image:
//       ["https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp","https://i.insider.com/5db07d2c4af909315229faa2?width=700","https://images.unsplash.com/photo-1587840178393-079769787b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80","https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp"],
//     price: "200",
//     in_stock: true,
//     category: "electronics",
//   },
//   {
//     title: "Product 4",
//     image:
//       ["https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp","https://i.insider.com/5db07d2c4af909315229faa2?width=700","https://images.unsplash.com/photo-1587840178393-079769787b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80","https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp"],
//     price: "200",
//     in_stock: true,
//     category: "electronics",
//   },
// ];
export default function ProductList() {
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
      console.log("response error:-", error);

      if (error.response.data.message == "Unauthenticated.") {
        navigate("/user/login");
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  const [data, setData] = useState([
    {
      title: "Product 4",
      image: [
        "https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp",
        "https://i.insider.com/5db07d2c4af909315229faa2?width=700",
        "https://images.unsplash.com/photo-1587840178393-079769787b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "https://www.androidsis.com/wp-content/uploads/2023/02/buscar-por-imagenes-Google.webp",
      ],
      price: "200",
      in_stock: true,
      category: "electronics",
    },
  ]);
  const [api, setApi] = useState(false);
  useEffect(() => {
    const table = async () => {
      let a = await axios.get("http://127.0.0.1:8000/api/products");
      let b = await a.data;
      // console.log("useeffect b:-", b);
      setData(b);
      setApi(true);
      return b;
    };

    // let a = mail();
    // console.log(a);
    let c = table();
    // setData([c]);
  }, []);
  return (
    <>
      {/* < Navbar /> */}
      <div className="container mt-5">
        <div className="container">
          <div className="row">
            {api
              ? data.data.map((element, i) => {
                  return <Product key={i} data={element} />;
                })
              : "Loading..."}
          </div>
        </div>
        {/* <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>
              <Carousel autoplay>
                  <div>
                    <h3 style={contentStyle}><img src={item.image[0]} alt="" width={"100%"} /></h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}><img src={item.image[1]} alt="" width={"100%"} /></h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}><img src={item.image[2]} alt="" width={"100%"} /></h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}><img src={item.image[3]} alt="" width={"100%"} /></h3>
                  </div>
                </Carousel>
                
                {item.in_stock ? (
                  <>
                    <span className="badge-pill bg-primary my-1 text-light mr-2">
                      {item.category}
                    </span>
                    <span className="badge-pill bg-success my-1 text-light">
                      In stock
                    </span>
                  </>
                ) : (
                  <>
                    <span className="badge-pill bg-primary my-1 text-light mr-2">
                      {item.category}
                    </span>
                    <span className="badge-pill bg-danger my-1 text-light">
                      Not in stock
                    </span>
                  </>
                )}
                <br />
                <div className="fw-bold">Price:-</div>
                <div className="fs-100 fw-bold">{item.price}$</div>
              </Card>
            </List.Item>
          )}
        /> */}
      </div>
    </>
  );
}
