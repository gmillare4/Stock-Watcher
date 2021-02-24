import { useState } from "react";

export const TradingPrice = () => {
  const [price, setPrice] = useState(0);

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
    console.log("hahaha poopy stiny");
    console.log("testing data ", JSON.parse(event.data));
    if (JSON.parse(event.data).data[0].p) {
      const exactPrice = JSON.parse(event.data).data[0].p;
      setPrice(exactPrice.toFixed(2));
      console.log("price, ", price);
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
