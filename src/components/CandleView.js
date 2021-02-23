import { React, useEffect, useState } from "react";

export const CandleView = (props) => {
  const [ticker, setTicker] = useState("Ticker Symbol");

  const start = 1614069000 / 1000;

  let end = Math.trunc(new Date() / 1000);

  console.log("end", end);

  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${props.ticker}/range/1/minute/2021-02-12/2021-02-12?unadjusted=true&sort=asc&limit=50000&apiKey=yJzK3sWL5v0tUxElpFaT4O0ed8ZJzN58`;
  const finUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${props.ticker}&resolution=1&from=${start}&to=${end}&token=c0m5rvn48v6rkav1k8u0`;
  async function getStocks() {
    const response = await fetch(finUrl);
    return response.json();
  }

  const tradeSocketUrl = "wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0";

  // const socket = new WebSocket(
  //   "wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0"
  // );

  // // Connection opened -> Subscribe
  // socket.addEventListener("open", function (event) {
  //   socket.send(JSON.stringify({ type: "subscribe", symbol: "GME" }));
  // });

  // // Listen for messages
  // socket.addEventListener("message", function (event) {
  //   console.log("Message from server ", event.data);
  // });

  // // Unsubscribe
  // const unsubscribe = function (symbol) {
  //   socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  // };

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
