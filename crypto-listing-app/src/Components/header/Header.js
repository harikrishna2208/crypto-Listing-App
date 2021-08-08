import React from "react";
import "./Header.css";
import Heading from "./Heading";

const Header = ({ change }) => {
  return (
    <div>
      <div className="Minibox">
        <p style={{ paddingBottom: 20, fontSize: 25 }}> Crypto Listing App </p>
        <form>
          <input className="searchBox" type="text" onChange={change} />
        </form>
      </div>
      <Heading />
    </div>
  );
};

export default Header;
