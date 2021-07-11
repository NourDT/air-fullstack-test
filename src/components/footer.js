import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/footer.scss";

function Footer({ to, children }) {
  return (
    <div className="footer">
      <Link to={to} className="link">
        {children}
      </Link>
    </div>
  );
}

export default Footer;
