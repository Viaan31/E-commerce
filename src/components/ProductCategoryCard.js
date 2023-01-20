import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Rating from "@mui/material/Rating";

const ProductCategoryCard = ({ productData, addToCart, type }) => {
  let navigate = useNavigate();
  return (
    <div
      className="card"
      style={{
        width: "900px",
        height: "420px",
        alignItems: "flex-start",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "900px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            height: "400px",
            alignItems: "center",
          }}
        >
          {" "}
          <img
            src={productData?.image}
            className="image"
            style={{ width: "230px", height: "230px" }}
          />
        </div>
        <div
          style={{
            flexGrow: 2,
            height: "400px",
          }}
        >
          <p
            title={productData?.title}
            className="title"
            style={{ whiteSpace: "normal", width: "100%" }}
            onClick={() => {
              navigate(`/product/${productData?.id}`);
            }}
          >
            {productData?.title}
          </p>
          <p
            style={{
              // height: "15%",
              overflow: "hidden",
              WebkitLineClamp: 1,
            }}
          >
            {productData?.description}
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
                width: "350px",
                justifyContent: "right",
                alignItems: "flex-end",
              }}
            >
              <button
                style={{ marginTop: "30px", width: "200px" }}
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

export default ProductCategoryCard;
