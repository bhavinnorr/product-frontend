import React, { useEffect } from "react";
import logo from "../../assets/hi.png";
import lock from "../../assets/lock.svg";
import { Input, Button } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
// import "./components.css"

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app/products");
    }
  }, []);
  // let userSchema = object({
  //     // name: string().required(),
  //     // age: number().required().positive().integer(),
  //     email: string().email(),
  //     password: string().password(),
  //     // website: string().url().nullable(),
  //     // createdOn: date().default(() => new Date()),
  //   });
  //   const user = await userSchema.validate(await fetchUser());
  const initialValues = {
    email: "",
    password: "",
  };
  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });
  const handleSignIn = async (values) => {
    console.log(values);
    const data = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const data2 = await data.json();
    console.log(data2);
    if (data2.token) {
      localStorage.setItem("token", data2.token);
      console.log(data2.token);
      navigate("/app/products");
    }
    if (data2.status == false) {
      alert("Invalid Credentials");
    }
    // else {
    //   alert(data2.access_token);
    //   localStorage.setItem('access_token', data2.access_token);
    //   navigate("/product-list")
    // }
  };
  return (
    <>
      <div className="">
        <div className="row ">
          <div className="col-lg-5">
            <div className="scrolling-images">
              {/* <img src="" alt="" /> */}
            </div>
          </div>
          <div className="col-lg-7">
            <div
              className="my-auto height-content container"
              style={{ width: "50%", margin: "auto" }}
            >
              <div
                className="logo mx-auto"
                style={{ width: "300px", height: "fit-content" }}
              >
                <img src={logo} alt="" width={"100%"} className="mx-auto" />
              </div>
              <div className="fw-bold text-center" style={{ fontSize: "35px" }}>
                Hello Again!
              </div>
              <div
                className="text-secondary text-center"
                style={{ fontSize: "12px" }}
              >
                Lorem ipsum dolor sit amet consectetur
                <br />
                adipisicing elit. Maxime, tenetur?
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={signInSchema}
                onSubmit={(values) => {
                  handleSignIn(values);
                }}
              >
                {(formik) => {
                  const { errors, touched, isValid, dirty } = formik;
                  return (
                    <div className="container">
                      {/* <h1>Sign in to continue</h1> */}
                      <Form>
                        <div className="form-row">
                          {/* <label htmlFor="email">Email</label><br/> */}
                          <Field
                            style={{
                              display: "block",
                              width: "100%",
                              border: "1px solid grey",
                              padding: "5px 10px",
                              marginTop: "20px",
                              //   background: "#900C3F",
                              borderRadius: "7px",
                              //   color: "white",
                              //   fontWeight: "bold",
                              //   cursor: "pointer",
                            }}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email here"
                            className={
                              errors.email && touched.email
                                ? "input-error"
                                : null
                            }
                          />
                          <div>
                            <ErrorMessage
                              style={{
                                display: "block",
                                height: "20px",
                              }}
                              name="email"
                              // component="span"
                              className="error"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          {/* <label htmlFor="password">Password</label> */}
                          <Field
                            style={{
                              width: "100%",
                              //   marginBottom:"20px",
                              border: "1px solid grey",
                              padding: "5px 10px",
                              //   background: "#900C3F",
                              borderRadius: "7px",
                              //   color: "white",
                              //   fontWeight: "bold",
                              //   cursor: "pointer",
                              marginTop: "20px",
                            }}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            className={
                              errors.password && touched.password
                                ? "input-error"
                                : null
                            }
                          />
                          <ErrorMessage
                            name="password"
                            component="span"
                            className="error"
                          />
                        </div>

                        <button
                          // style={{
                          //   marginTop:"20px",
                          //   width: "100%",
                          //   background: "#900C3F",
                          //   borderRadius: "7px",
                          //   color: "white",
                          //   fontWeight: "bold",
                          //   cursor: "pointer",
                          //   padding:"2px 0 2px 0",
                          // }}
                          type="submit"
                          className={
                            !(dirty && isValid)
                              ? "disabled-btn button-submit-disabled"
                              : "button-submit"
                          }
                          disabled={!(dirty && isValid)}
                        >
                          Sign In
                        </button>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
              {/* <div className="text-center">
                Don't have an account{" "}
                <NavLink to="/user/register">sign up</NavLink>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
