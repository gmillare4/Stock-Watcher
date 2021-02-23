import { React, useEffect, useState } from "react";

export const CandleView = (props) => {
  //const [ticker, setTicker] = useState("Ticker Symbol");
  const [count, setCount] = useState(0);

  const marketOpen = new Date();
  marketOpen.setHours(8);
  marketOpen.setMinutes(30);
  marketOpen.setSeconds(0);
  marketOpen.setMilliseconds(0);
  const start = Math.trunc(marketOpen / 1000);

  let end = Math.trunc(new Date() / 1000);

  //const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${props.ticker}/range/1/minute/2021-02-12/2021-02-12?unadjusted=true&sort=asc&limit=50000&apiKey=yJzK3sWL5v0tUxElpFaT4O0ed8ZJzN58`;
  const finUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${props.ticker}&resolution=1&from=${start}&to=${end}&token=c0m5rvn48v6rkav1k8u0`;
  async function getCandles() {
    const response = await fetch(finUrl);
    return response.json();
  }

  //const tradeSocketUrl = "wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0";

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
    console.log("start");
    const timer = setTimeout(() => {
      getCandles().then((data) => {
        console.log(data);
        setCount(end);
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div>
      <h1>{props.ticker}</h1>
    </div>
  );
};
