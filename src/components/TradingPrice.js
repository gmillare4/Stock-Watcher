import { useState, useEffect } from "react";
import "../App.css";

export const TradingPrice = (props) => {
  const [price, setPrice] = useState(0);
  const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(
      JSON.stringify({ type: "subscribe", symbol: `${props.ticker}` })
    );
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    if (event.data.type !== "ping") {
      let exactPrice;
      if (JSON.parse(event.data).data !== undefined) {
        exactPrice = JSON.parse(event.data).data[0].p;
        setPrice(exactPrice.toFixed(2));
      }
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
