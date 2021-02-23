import { React, useEffect, useState } from "react";

export const CandleView = (props) => {
  const [ticker, setTicker] = useState("Ticker Symbol");

  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${props.ticker}/range/1/minute/2021-02-12/2021-02-12?unadjusted=true&sort=asc&limit=50000&apiKey=yJzK3sWL5v0tUxElpFaT4O0ed8ZJzN58`;
  async function getStocks() {
    const response = await fetch(apiUrl);
    return response.json();
  }

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
