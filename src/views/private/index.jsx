import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../public/Login";
import Register from "../public/Register";
import Invite from "./Invite";
import Navbar from "./Navbar";
import Table from "./Table";
import ProductList from "./ProductList";

// import FallbackUI from "../../helpers/SuspenseFallback";
// import { HOME_URL } from "./../../config/const";
// import Profile from "./profile";
// // import RegistrationSuccessful from "./registration_successful";
// import InviteDrawerComponent from './InviteDrawer';
// import Vdrawer from "./Vdrawer";
// import ChangePasswordDrawer from "./ChangePasswordDrawer";

const LoginComponent = React.lazy(() => import("../public/Login"));
const RegisterComponent = React.lazy(() => import("../public/Register"));
// const RegistrationSuccessful = React.lazy(() =>
//   import("./registration_successful")
// );
// const ForgetPassword = React.lazy(() =>
//   import("./forget-password/forget_password")
// );
// const PasswordMailSent = React.lazy(() =>
//   import("./forget-password/password_mailsent")
// );
// const SetPassword = React.lazy(() => import("./forget-password/set-password"));
// const PasswordUpdated = React.lazy(() =>
//   import("./forget-password/password-updated")
// );

// const AssociatesList = React.lazy(() => import("../private/associates_list"));

const PrivateRoutes = () => {
  return (
    // <Suspense fallback={<FallbackUI />}>
    <>
    <Navbar/>
    <Routes>
      <Route path="users" element={<Invite/> } />
      <Route path="products" exact element={<ProductList/>} />
      {/* <Route path="products" exact element={<ProductLi/>} /> */}
      <Route path="product-edit" element={<Table/> } />
    </Routes>
    </>
    //   <Outlet />
    // </Suspense>
  );
};

export default PrivateRoutes;
