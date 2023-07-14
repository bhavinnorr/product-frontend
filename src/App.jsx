import { useState } from "react";
import "./App.css";
// import App2 from './components/App'
// import Navbar from './components/Navbar'
// import Login from "./views/public/Login";
// import Register from "./Register";
// import ProductList from "./components/ProductList";
// import Invite from "./components/Invite";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Table from "./views/private/Table";
import PublicRoutes from "./views/public";
import PrivateRoutes from "./views/private";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        {/* <LoadingBar
          color='#f11946'
          progress={progress}
        /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/user/login" />}></Route>
          <Route path="/app/*" element={ <PrivateRoutes/> }></Route>
          <Route path="*" />
          {/* <Route path="/app/" element={<PrivateRoutes />} /> */}
          <Route path="/user/*" element={<PublicRoutes />}></Route>
          {/* <Route path="*" element={<PublicRoutes />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
