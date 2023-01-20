import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
const ViewOrders = () => {
  const [data, setData] = useState([]);
  const getOrders = () => {
    axios.get(`https://fakestoreapi.com/carts`).then((res) => {
      setData(res.data);
      console.log(res);
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h1>All past Orders:</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll",
          marginRight: "20px",
        }}
      >
        <div className="vieworder">
          {data?.map((item) => (
            <div className="vieworder-container">
              <div>
                <h4>Order ID: {item.id}</h4>
              </div>
              <div>User ID: {item.userId}</div>
              <p>Products: </p>
              {console.log("Products", item?.products)}
              {item?.products?.map((productdata) => (
                <div style={{ display: "flex", gap: "5px" }}>
                  <p>Product Id: {productdata.productId}</p>
                  <p>Quantity : {productdata.quantity}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewOrders;
