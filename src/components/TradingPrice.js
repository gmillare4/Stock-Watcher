import { useState, useEffect } from "react";
import "../App.css";

export const TradingPrice = (props) => {
  const [price, setPrice] = useState(0);

  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0"
  );

  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(
      JSON.stringify({ type: "subscribe", symbol: `${props.ticker}` })
    );
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    // console.log("Message from server ", event.data);
    // console.log("testing data ", JSON.parse(event.data));
    if (event.data.type !== "ping") {
      let exactPrice;
      if (JSON.parse(event.data).data !== undefined) {
        exactPrice = JSON.parse(event.data).data[0].p;
      } else {
        exactPrice = price;
      }
      setPrice(exactPrice.toFixed(2));
    }
  });

  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  return (
    <div>
      <h1>${price}</h1>
    </div>
  );
};
