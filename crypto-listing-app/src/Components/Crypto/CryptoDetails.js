import React, { useState } from "react";
import "./cryptoDetails.css";
import { Link } from "react-router-dom";

const CryptoDetails = ({ image, Name, symbol, price, viewed }) => {
  const [buttondata, setbuttonData] = useState(viewed);

  const saveHandler = async () => {
    const body = {
      name: Name,
      symbol: symbol,
      price: price,
      image: image,
    };
    try {
      const response = await fetch("http://localhost:4000/cryptoData/post", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("error");
      }
      setbuttonData(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="cryptoRow">
        <div className="images">
          <img id="image" alt="cryptoImage" src={image} />
        </div>
        <h1 className="fontName">{Name}</h1>
        <p className="Symbol">{symbol}</p>
        <p className="currentPrice">{price.toLocaleString("en-IN")} ₹</p>

        {!buttondata && (
          <button onClick={saveHandler} className="saveData">
            save data
          </button>
        )}

        {buttondata &&   (
          <Link to="/View">
            <button className="saveData" style={{ backgroundColor: "orange" }}>
              View
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CryptoDetails;
