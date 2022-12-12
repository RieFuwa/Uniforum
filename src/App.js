import './App.css';
import Home from './pages/Home.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import University from './pages/University';
import Navbar from './layout/Navbar';
import { Outlet } from 'react-router-dom';


function App() {
  const WithNavbar = () =>
    <> 
    <Navbar>
    </Navbar>
      <Outlet>
      </Outlet>
    </>

  return (
    <div class="container-sm ">
      <Router>
        <Routes>
          <Route element={<WithNavbar></WithNavbar>}>
            <Route exact path="/" element={<Home></Home>}> </Route>
            <Route exact path="/university/:universityId" element={<University></University>}></Route>
          </Route>
          <Route exact path="/signin" element={<SignIn></SignIn>}> </Route>
          <Route exact path="/register" element={<Register></Register>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
