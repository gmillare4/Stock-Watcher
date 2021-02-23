import { React, useEffect, useState } from "react";

export const CandleView = (props) => {
  const [ticker, setTicker] = useState("Ticker Symbol");

  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${props.ticker}/range/1/minute/2021-02-12/2021-02-12?unadjusted=true&sort=asc&limit=50000&apiKey=yJzK3sWL5v0tUxElpFaT4O0ed8ZJzN58`;
  async function getStocks() {
    const response = await fetch(apiUrl);
    return response.json();
  }

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
  });

  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  useEffect(() => {
    getStocks().then((data) => {
      console.log(data);
      setTicker(data.ticker);
    });
  }, []);

  return (
    <div>
      <h1>{ticker}</h1>
    </div>
  );
};
