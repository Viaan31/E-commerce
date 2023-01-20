import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Rating from "@mui/material/Rating";
import { Badge, IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Cart from "./Cart";

const ProductDetailCard = ({ productData }) => {
  let navigate = useNavigate();
  return (
    <div className="main">
      <div style={{ display: "flex" }}>
        <div className="left-container">
          <img
            src={productData?.image}
            style={{ height: "300px", width: "300px" }}
          />
        </div>
        <div className="right-container">
          <h1
            onClick={() => {
              navigate(`/product/${productData?.id}`);
            }}
          >
            {productData?.title}
          </h1>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h5>Category: </h5>
            {productData?.category}
          </p>
          <p>
            <h5>About this product: </h5>
            {productData?.description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p>Price: Rs. {productData?.price}</p>
            <Rating
              name="read-only"
              value={productData?.rating?.rate}
              precision={0.1}
              readOnly
            />
          </div>

          <div>
            <h3>User Reviews: </h3>
            <p>
              (1) I absolutely love this espresso machine! It works so well. I
              love that it has the steamer as well. Just make sure to clean the
              steamer right after you use it so the milk doesn’t stick and clog
              it up. I’ve only had it for a month now but I’m super impressed
              with the quality for the price! And the delivery was real quick
            </p>
            <p>
              (2) I can’t say enough about these headphones. They’re excellent
              for the gym! They don’t fall off and aren’t uncomfortable after a
              while. The sound is amazing and the controls are easy to use
              without needing your phone picked up. They don’t hold moisture or
              water and I just wipe them off after my workout. Very satisfied
              with this purchase, they come in a sturdy zip-up case and with
              their own charging cable. The charge lasts a decent amount of time
              obviously depending on your usage but is well worth the buy! And
              the color is absolutely adorable!
            </p>
            <p>
              (3) I absolutely love this espresso machine! It works so well. I
              love that it has the steamer as well. Just make sure to clean the
              steamer right after you use it so the milk doesn’t stick and clog
              it up. I’ve only had it for a month now but I’m super impressed
              with the quality for the price! And the delivery was real quick
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
