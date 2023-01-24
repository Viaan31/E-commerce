import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import React, { useContext } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ token }) => {
  const { cart, setCart } = useContext(CartContext);
  let navigate = useNavigate();
  const handleAdd = (id) => {
    const add = cart.find((item) => item.id == id);
    if (add) {
      setCart(
        cart?.map((item) =>
          item?.id == id ? { ...add, qty: add.qty + 1 } : item
        )
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart?.map((item) =>
            item?.id == id ? { ...add, qty: add.qty + 1 } : item
          )
        )
      );
    }
  };
  const removeFromCart = (itemId) => {
    const items = cart.filter((cart) => cart.id !== itemId);
    setCart(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };
  const handleDecrease = (id) => {
    const decrease = cart.find((item) => item.id == id);
    if (decrease.qty >= 2) {
      if (decrease) {
        setCart(
          cart?.map((item) =>
            item?.id == id ? { ...decrease, qty: decrease.qty - 1 } : item
          )
        );
        localStorage.setItem(
          "cart",
          JSON.stringify(
            cart?.map((item) =>
              item?.id == id ? { ...decrease, qty: decrease.qty - 1 } : item
            )
          )
        );
      }
    } else {
      return;
    }
  };
  const handleAddOrder = () => {
    console.log("token: ", token);

    axios
      .post(`https://smallbrushedroof15.conveyor.cloud/api/Orders/Insert`, {
        TotalPrice: totalPrice,
        UserID: token,
        ProductInCart: JSON.stringify(cart),
        OrderStatus: "processed",
      })
      .then((result) => console.log(result));
  };
  let totalPrice = cart?.reduce(
    (total, item) => Math.round(total + item.price * item.qty),
    0
  );
  return (
    <div
      style={{
        display: "flex",
        gap: "100px",
        marginLeft: "15px",
        alignItems: "center",
      }}
    >
      <div className="cart-main">
        {cart?.map((item) => (
          <div className="cart">
            <div>
              <img className="image" src={item?.image} alt="" />
            </div>
            <div>
              <h3>{item?.title}</h3>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <button
                className="cart-button"
                onClick={() => {
                  handleDecrease(item.id);
                }}
              >
                -
              </button>
              <p>{item.qty}</p>
              <button
                className="cart-button"
                onClick={() => {
                  handleAdd(item.id);
                }}
              >
                +
              </button>
            </div>
            <div>
              <h3>$ {Math.round(item?.price * item.qty)}</h3>
            </div>
            <div>
              <button
                onClick={() => {
                  removeFromCart(item?.id);
                }}
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart?.length >= 1 ? (
        <div className="total">
          <h3>
            Total MRP:
            {totalPrice}
          </h3>
          <h3> Shipping charge: Free</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: 200, backgroundColor: "black" }}
              style={{ textAlign: "center" }}
              endIcon={<Send />}
              onClick={() => {
                navigate(`/success`);
                handleAddOrder();
                localStorage.removeItem("cart");
                setCart([]);
              }}
            >
              Proceed To Pay
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Cart is empty!!</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
