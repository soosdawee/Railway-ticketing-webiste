import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="left-side">
        <h1>Welcome to RailwayMaster</h1>
        <div className="buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>

      <div className="right-side">
        <img src={process.env.PUBLIC_URL + "/landing.jpg"} alt="Background" />
      </div>
    </div>
  );
}

export default LandingPage;
