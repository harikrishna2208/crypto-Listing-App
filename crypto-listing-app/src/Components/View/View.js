import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List/List";
import "./View.css";
import Heading from "../header/Heading";

const View = () => {
  const [dataHold, setDataHOld] = useState(() => []);

  useEffect(() => {
    try {
      fetch("http://localhost:4000/cryptoData/getcrypto")
        .then((result) => {
          return result.json();
        })
        .then((res) => {
          setDataHOld(res);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deletedElement = (name) => {
    setDataHOld((previous) => {
      const updated = previous.filter((data) => data.Name !== name);
      return updated;
    });
  };

  return (
    <div className="List-Page">
      <div className="BackNavigation">
        <p className="saved">Saved List</p>
        <Link to="/home">
          <button className="homebtn">Back to Home Page</button>
        </Link>
      </div>

      <Heading />

      <div className="List-items">
        {dataHold.map((ele) => (
          <List
            key={ele._id}
            id={ele._id}
            image={ele.Image}
            Name={ele.Name}
            price={ele.Price}
            symbol={ele.Symbol}
            parentCallback={deletedElement}
          />
        ))}
      </div>
    </div>
  );
};

export default View;
