import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const Profile = ({ token, setToken }) => {
  let navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const getDetails = () => {
    axios.get(`https://fakestoreapi.com/users/1`).then((res) => {
      setdata(res.data);
      console.log(res);
    });
  };
  const getOrders = () => {
    axios.get(`https://fakestoreapi.com/carts/user/1`).then((result) => {
      setOrderData(result.data);
      console.log(result);
    });
  };
  useEffect(() => {
    getDetails();
    getOrders();
  }, []);

  return (
    <>
      <div className="profile">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            alignSelf: "flex-start",
            marginTop: "40px",
            marginLeft: "20px",
          }}
        >
          <Avatar src="/broken-image.jpg" sx={{ height: 200, width: 200 }} />
        </div>
        <div className="profile-left-container">
          <div style={{ borderBottom: "1px solid gray" }}>
            <h2>Your Details: </h2>
            <h5 style={{ marginBottom: "8px" }}>Personal Information </h5>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
              }}
            >
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Name:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.name?.firstname} {data?.name?.lastname}
                </p>
              </div>

              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Email:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.email}
                </p>
              </div>
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Phone Number:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.phone}
                </p>
              </div>
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Address:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.address?.number}, {data?.address?.street}
                </p>
              </div>
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  City:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.address?.city}-{data?.address?.zipcode}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => {
                navigate(`/register`, {
                  state: { type: "update", data: { data } },
                });
              }}
              style={{
                width: "200px",
                height: "35px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              Update Profile
            </button>

            <button
              style={{
                width: "200px",
                height: "35px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              onClick={() => {
                setToken("");
                localStorage.clear();
              }}
            >
              Log out
            </button>
          </div>
        </div>

        <div className="profile-right-container">
          <Accordion sx={{ width: 400 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Customer Service
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Contact Details</Typography>
              <Typography>Call us on : 9999999999</Typography>
              <Typography>Email : fakestore@fakemail.com</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: 400, marginBottom: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ fontWeight: "bold" }}>Return Policy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Products must be returned within 7 days.</Typography>
              <Typography> Product must contain the original tags</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div>
        <h2>Past orders</h2>
        <div className="pastorder">
          {orderData.map((orderData) => (
            <div
              key={"order" + orderData.id}
              className="profileorder-container"
            >
              <h3>Order {orderData.id}</h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  <CheckCircle />
                  Delivered
                </p>
              </div>
              <p>Date & Time: {orderData.date}</p>
              <p>Products: </p>
              {console.log("Products", orderData?.products)}
              {orderData.products.map((item) => (
                <div style={{ display: "flex", gap: "5px" }}>
                  <p key={item.productId + orderData.id}>
                    Product Id: {item.productId}
                  </p>
                  <p>Quantity : {item.quantity}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
