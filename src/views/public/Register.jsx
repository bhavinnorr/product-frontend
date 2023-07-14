import React from "react";
import logo from "../../assets/hi.png";
import lock from "../../assets/lock.svg";
import { Input, Button } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useSearchParams } from "react-router-dom";

// import "./components.css"

function Register() {
  const [searchParams, setSearchParams] = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

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
    name: "",
    email: email,
    password: "",
  };
  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });
  const handleSignUP = async (values) => {
    console.log("register submitted");
    console.log(values);
    let data = await fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });
    let data2 = await data.json();
    alert(data2.message);
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
            {/* <div className="invisible overflow-hidden">Email:- {email}<br/>Token:- {token}</div> */}
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
                Hello Welcome!
              </div>
              <div
                className="text-secondary text-center"
                style={{ fontSize: "12px" }}
              >
                Congrats on the Invitation
                <br />
                Please Enter the following details to proceed
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={signUpSchema}
                onSubmit={(values, actions) => {
                  handleSignUP(values);
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
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter name here"
                            // value={email}
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
                                // color:"red"
                              }}
                              name="name"
                              // component="span"
                              className="error text-danger"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          {/* <label htmlFor="email">Email</label><br/> */}
                          <Field
                            style={{
                              display: "block",
                              width: "100%",
                              background: "#999999",
                              color: "#feeeee",
                              border: "1px solid grey",
                              padding: "5px 10px",
                              marginTop: "20px",
                              //   background: "#900C3F",
                              borderRadius: "7px",
                              //   color: "white",
                              //   fontWeight: "bold",
                              //   cursor: "pointer",
                            }}
                            disabled={true}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email here"
                            // value={email}
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
                            className="error text-danger"
                          />
                        </div>

                        <button
                          //   style={{

                          //   }}
                          type="submit"
                          className={
                            !(dirty && isValid)
                              ? "disabled-btn button-submit-disabled"
                              : "button-submit"
                          }
                          disabled={!(dirty && isValid)}
                          // onClick={submit}
                        >
                          Sign Up
                        </button>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
              <div className="text-center">
                Don't have an account{" "}
                <NavLink to="/user/login">sign in</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
