import React, { Children } from "react";

import "../styles/button.css";
const Button = (props) => {
  const { children, logo } = props;
  return (
    <>
      <div className="btn-box">
        <button className="btn">
          {" "}
          <span className="btn-logo">{logo}</span>
          {children}
        </button>
      </div>
    </>
  );
};

export default Button;
