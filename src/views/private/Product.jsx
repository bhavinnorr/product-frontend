import React from "react";
import { Card, List, Carousel } from "antd";

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
export default function Product(props) {
  
  const { data } = props;
  return (
    <div className="col-md-4 p-4">
      <div className="card">
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "0",
            top: "-10px",
          }}
        >
          <span
            className="badge rounded-pill bg-danger "
            style={{ zIndex: "1", color: "white" }}
          >
            {data.category}
          </span>
        </div>
        <Carousel autoplay dots={false}>
          {data.images[0].file_name.map((img,i)=>{
             return <div key={i}>
            <h3 style={contentStyle}>
              <img src={img.url} alt="" width={"100%"} height={"200px"}/>

              {/* <img src={img.thumbUrl} alt="" width={"100%"} /> */}
            </h3>
          </div>;
          })}
          
          {/* <div>
            <h3 style={contentStyle}>
              <img src={data.image.split(",")[1]} alt="" width={"100%"} />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src={data.image.split(",")[2]} alt="" width={"100%"} />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src={data.image.split(",")[3]} alt="" width={"100%"} />
            </h3>
          </div> */}
        </Carousel>
        {/* <object data={imageUrl} type="image/png">
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg" alt="Card image cap" />
                </object> */}
        <div className="card-body">
          {data.in_stock ? (
            <>
              {/* <span className="badge-pill bg-primary my-1 text-light mr-2">
                      {data.category}
                    </span> */}
              <span className="badge-pill bg-success my-1 text-light">
                In stock
              </span>
            </>
          ) : (
            <>
              {/* <span className="badge-pill bg-primary my-1 text-light mr-2">
                      {item.category}
                    </span> */}
              <span className="badge-pill bg-danger my-1 text-light">
                Not in stock
              </span>
            </>
          )}
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">{data.price}₹</p>
          {/* <p className="card-text"><small className='text-muted'>By {author} on {new Date(date).toUTCString()}</small></p>
                    <a href={url} className="btn btn-dark" target='_blank'>Read More</a> */}
        </div>
      </div>
    </div>
  );
}
