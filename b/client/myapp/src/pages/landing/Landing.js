import React from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

import "./Landing.css"; // Assuming you have a CSS file for styling
import landingImage from "../../assets/images/landingimage.png"; // Replace with your image path
const Landing = () => {
  return (
   <div className="landingPage">
     <div className="leftSection">
      <div>
        <span className="mainText"> Organise work and life </span>
        
        <span className="finally">finally.</span>
        
      </div>

      <div>
        <p>This is a simple todo application built with React.</p>
      </div>

      <div>
        <p>Use the navigation to explore the app.</p>
      </div>

      <div>
        <Link to="/register" className="registerBtn">Register</Link>
        <Link to="/login" className="loginBtn">Login</Link>
      </div>
    </div>
    <div className="rightSection">
        <img src={landingImage} alt="" />
    </div>
   </div>
  );
};

export default Landing;
