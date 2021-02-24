import { useState, useEffect } from "react";
import "../App.css";

export const TradingPrice = () => {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(1);

  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0"
  );

  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({ type: "subscribe", symbol: "GME" }));
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    console.log("Message from server ", event.data);
    console.log("hahaha poopy stinky");
    console.log("testing data ", JSON.parse(event.data));
    if (event.data.type !== "ping") {
      const exactPrice = JSON.parse(event.data).data[0].p;
      setPrice(exactPrice.toFixed(2));
    }
  });

  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  useEffect(() => {
    setPrevPrice(price);
  }, [price]);

  return (
    <div>
      <h1 className={prevPrice > price ? "down" : "up"}>${price}</h1>
    </div>
  );
};
