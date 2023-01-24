import React from "react";
import "./styles.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  console.log(errors);
  console.log("type", location?.state?.type);
  console.log("Location:", location);
  const TYPE = location?.state?.type;
  const userData = location?.state?.data;
  let navigate = useNavigate();
  const registerHandler = (data) => {
    console.log(data);
    TYPE == "update"
      ? axios
          .put(`https://smallbrushedroof15.conveyor.cloud/api/Users/Update`, {
            AlternativeEmail: data?.email,
            UserName: data?.email,
            Password: data?.password,
            FirstName: data?.firstname,
            LastName: data?.lastname,

            Address: data?.address,
            City: data?.city,
            LandMark: data?.city,

            Pincode: data?.pincode,

            PhoneNumber: data?.phone,
          })
          .then((res) => console.log("Update", res))
      : axios.post(
          `https://smallbrushedroof15.conveyor.cloud/api/Users/Insert`,
          {
            AlternativeEmail: data?.email,
            UserName: data?.email,
            Password: data?.password,
            FirstName: data?.firstname,
            LastName: data?.lastname,

            Address: data?.address,
            City: data?.city,
            LandMark: data?.city,

            Pincode: data?.pincode,

            PhoneNumber: data?.phone,
          }
        );

    navigate(`/`);
  };

  console.log("Userdata:", userData);
  return (
    <div className="login">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="register-container"
        style={{ height: "100%" }}
      >
        <div style={{ width: "500px", borderBottom: "2px solid gray" }}>
          {TYPE == "update" ? (
            <h1 style={{ color: "white" }}>Update Profile</h1>
          ) : (
            <h1 style={{ color: "white" }}>Register</h1>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "65px",
          }}
        >
          <label>First Name</label>
          {TYPE == "update" ? (
            <input
              type="text"
              name="firstname"
              disabled="true"
              placeholder={userData?.data?.data[0]?.firstName}
              style={{ cursor: "not-allowed" }}
              {...register("firstname")}
            />
          ) : (
            <input
              type="text"
              name="firstname"
              // placeholder="First Name"
              {...register("firstname", { required: true })}
            />
          )}
        </div>

        {errors?.firstname?.type === "required" && (
          <p>This field is required</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "65px" }}>
          <label>Last Name</label>
          {TYPE == "update" ? (
            <input
              type="text"
              name="lastname"
              disabled="true"
              placeholder={userData?.data?.data[0]?.lastName}
              style={{ cursor: "not-allowed" }}
              {...register("lastname")}
            />
          ) : (
            <input
              type="text"
              name="lastname"
              // placeholder="Last Name"
              {...register("lastname")}
            />
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <label>Phone Number</label>
          {TYPE == "update" ? (
            <input
              type="text"
              name="phone"
              // placeholder="Phone Number"
              {...register("phone", { minLength: 10, maxLength: 10 })}
            />
          ) : (
            <input
              type="text"
              name="phone"
              // placeholder="Phone Number"
              {...register("phone", {
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
            />
          )}
        </div>
        {errors?.phone?.type === "minLength" && (
          <p>Phone Number has to be of 10 digits</p>
        )}
        {errors?.phone?.type === "maxLength" && (
          <p>Phone Number has to be of 10 digits</p>
        )}
        {errors?.phone?.type === "required" && <p>This field is required</p>}
        {errors?.phone?.type === "maxLength" && (
          <p>Phone number cannot exceed 10 digits</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "85px" }}>
          <label>Address</label>
          {TYPE == "update" ? (
            <input
              type="text"
              name="address"
              // placeholder="Address"
              {...register("address")}
            />
          ) : (
            <input
              type="text"
              name="address"
              // placeholder="Address"
              {...register("address", { required: true })}
            />
          )}
        </div>
        {errors?.address?.type === "required" && <p>This field is required</p>}
        <div style={{ display: "flex", alignItems: "center", gap: "115px" }}>
          <label>City</label>
          {TYPE == "update" ? (
            <input
              type="text"
              name="city"
              // placeholder="City"
              {...register("city")}
            />
          ) : (
            <input
              type="text"
              name="city"
              // placeholder="City"
              {...register("city", { required: true })}
            />
          )}
        </div>
        {errors?.city?.type === "required" && <p>This field is required</p>}
        <div style={{ display: "flex", alignItems: "center", gap: "80px" }}>
          <label>Pin Code</label>
          <input
            type="text"
            name="pincode"
            // placeholder="Pincode"
            {...register("pincode")}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "105px" }}>
          <label>Email</label>
          {TYPE == "update" ? (
            <input
              type="email"
              name="email"
              // placeholder="Email"
              {...register("email", {
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          ) : (
            <input
              type="text"
              name="email"
              // placeholder="Email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          )}
        </div>
        {errors?.email?.type === "required" && <p>This field is required</p>}
        {errors?.email?.type === "pattern" && <p>Please enter correct email</p>}

        {TYPE == "update" ? null : (
          <div style={{ display: "flex", alignItems: "center", gap: "75px" }}>
            <label>Password</label>
            <input
              type="password"
              // placeholder="Enter Password"
              name="password"
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,15}$/,
              })}
            />
          </div>
        )}

        {errors?.password?.type === "required" && <p>This field is required</p>}
        {errors?.password?.type === "pattern" && (
          <p>
            Password has to be between 7 to 15 characters, must contain atleast
            one Uppercase,one Lowercase letter, one digit and one special
            character
          </p>
        )}

        {TYPE == "update" ? null : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              // placeholder="Confirm Password"
              {...register("confirmpassword", {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,15}$/,
              })}
            />
          </div>
        )}

        {errors?.confirmpassword?.type === "required" && (
          <p>This field is required</p>
        )}
        {errors?.confirmpassword?.type === "pattern" && (
          <p>
            Password has to be between 7 to 15 characters, must contain atleast
            one Uppercase,one Lowercase letter, one digit and one special
            character
          </p>
        )}
        <button
          type="submit"
          style={{ marginBottom: "60px", marginTop: "20px" }}
        >
          {TYPE == "update" ? <>Update</> : <>Register</>}
        </button>
      </form>
    </div>
  );
};

export default Register;
