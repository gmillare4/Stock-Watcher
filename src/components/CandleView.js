import { React, useEffect } from "react";

const apiUrl = `https://api.polygon.io/v2/aggs/ticker/GME/range/1/minute/2020-10-14/2020-10-14?unadjusted=true&sort=asc&limit=50000&apiKey=yJzK3sWL5v0tUxElpFaT4O0ed8ZJzN58`;
async function getStocks() {
  const response = await fetch(apiUrl);
  return response.json();
}

export const CandleView = () => {
  useEffect(() => {
    getStocks().then((data) => {
      console.log(data);
    });
  }, []);
  console.log("candleview");
  return (
    <div>
      <h1>CandleView</h1>
    </div>
  );
};
