import { React, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const CandleView = (props) => {
  //const [ticker, setTicker] = useState("Ticker Symbol");
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  });
  const [series, setSeries] = useState({
    series: [
      {
        data: [],
      },
    ],
  });
  // [[Timestamp], [O, H, L, C]]
  const testState = {
    series: [
      {
        data: [],
      },
    ],
  };

  const marketOpen = new Date();
  marketOpen.setHours(8);
  marketOpen.setMinutes(30);
  marketOpen.setSeconds(0);
  marketOpen.setMilliseconds(0);
  const start = Math.trunc(marketOpen / 1000);
  // const start = Math.trunc(1614069000);

  let end = Math.trunc(new Date() / 1000);

  //const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${props.ticker}/range/1/minute/2021-02-12/2021-02-12?unadjusted=true&sort=asc&limit=50000&apiKey=yJzK3sWL5v0tUxElpFaT4O0ed8ZJzN58`;
  const finUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${props.ticker}&resolution=1&from=${start}&to=${end}&token=c0m5rvn48v6rkav1k8u0`;
  async function getCandles() {
    const response = await fetch(finUrl);
    return response.json();
  }

  //const tradeSocketUrl = "wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0";

  // useEffect(() => {
  //   getCandles().then((data) => {
  //     console.log(data);
  //   });
  // }, []);
  // console.log(state.series[0].data[0].x);
  // [[Timestamp], [O, H, L, C]]
  useEffect(() => {
    console.log("start");
    const timer = setTimeout(() => {
      getCandles().then((data) => {
        console.log(data);
        for (let i = 0; i < data.o.length; i++) {
          testState.series[0].data.push({});
          testState.series[0].data[i].x = new Date(data.t[i] * 1000);
          testState.series[0].data[i].y = [
            data.o[i],
            data.h[i],
            data.l[i],
            data.c[i],
          ];
        }
        setSeries(testState);
        console.log("teststate", testState);
        setCount(end);
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div>
      <h1>{props.ticker}</h1>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series.series}
          type="candlestick"
          height={350}
        />
      </div>
    </div>
  );
};
