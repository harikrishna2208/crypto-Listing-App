import React from "react";

const List = ({ image, Name, symbol, price, id, parentCallback }) => {
  const DeteleHandle = async () => {
    const response = await fetch(`http://localhost:4000/cryptoData/${id}`, {
      method: "DELETE",
    }).then((res) => {
      parentCallback(Name);
    });
    console.log(response);
  };

  return (
    <div>
      <div className="container">
        <div className="cryptoRow">
          <div className="images">
            <img id="image" alt="cryptoImage" src={image} />
          </div>
          <h1 className="fontName">{Name}</h1>
          <p className="Symbol">{symbol}</p>
          <p className="currentPrice">{price} ₹</p>
          <button onClick={DeteleHandle} className="saveData">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
