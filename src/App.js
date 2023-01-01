import './App.css';
import Home from './pages/Home.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import University from './pages/University';
import Navbar from './layout/Navbar';
import { Outlet } from 'react-router-dom';
import User from './pages/User';


function App() {
  const WithNavbar = () =>
    <>
      <Navbar>
      </Navbar>
      <Outlet>
      </Outlet>
    </>

  function authControl() {
    return localStorage.getItem("signedUserId") != null
  }

  function decidePath(desiredPath) {
    return authControl() ? <Navigate to="/" /> : desiredPath;
  }

  return (
    <div className="container-sm ">
      <Router>
        <Routes>
          <Route element={<WithNavbar></WithNavbar>}>
            <Route exact path="/" element={<Home></Home>}> </Route>
            <Route exact path="/university/:universityId" element={<University></University>}></Route>
            <Route exact path="/user/:userId" element={<User></User>}></Route>
            <Route exact path={'/profile/:userId'} element={<User></User>}></Route>
          </Route>
          <Route exact path="/signin" element={decidePath(<SignIn />)} ></Route>
          <Route exact path="/register" element={decidePath(<Register></Register>)}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
