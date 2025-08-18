import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({disp=true}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header style={{ display: disp ? "block" : "none" ,
              padding: "10px 20px",
        background: "#282c34",
        color: "white", // good
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h1>Student Portfolio</h1>

      <nav>
        {token ? (
          <>
            <Link to="/dashboard" style={{ marginRight: "15px", color: "white" }}>
              Dashboard
            </Link>
            <Link to="/profile" style={{ marginRight: "15px", color: "white" }}>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/" style={{ color: "white" }}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
