import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Rating from "@mui/material/Rating";

const ProductCard = ({ productData, addToCart}) => {
  let navigate = useNavigate();
  return (
    <div className="card">
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1, height: "200px" }}>
          {" "}
          <img src={productData?.image} className="image" />
        </div>
        <div style={{ flexGrow: 2, height: "230px" }}>
          <p
            title={productData?.title}
            className="title"
            onClick={() => {
              navigate(`/product/${productData?.id}`);
            }}
          >
            {productData?.title}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h3>$ {productData?.price}</h3>
            <Rating
              name="read-only"
              value={productData?.rating?.rate}
              precision={0.1}
              readOnly
            />
            <div
              style={{
                display: "flex",
                width: "270px",
                justifyContent: "right",
                alignItems: "flex-end",
              }}
            >
              <button
                style={{ marginTop: "30px" }}
                onClick={() => addToCart(productData)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
