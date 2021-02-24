import { React, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const CandleView = (props) => {
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

  let end = Math.trunc(new Date() / 1000);

  const finUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${props.ticker}&resolution=1&from=${start}&to=${end}&token=c0m5rvn48v6rkav1k8u0`;
  async function getCandles() {
    const response = await fetch(finUrl);
    return response.json();
  }

  useEffect(() => {
    console.log("start");
    setOptions((options) => ({
      chart: {
        ...options.chart,
      },
      title: {
        ...options.title,
        text: `${props.ticker} Stock Chart`,
      },
      xaxis: {
        ...options.xaxis,
      },
      yaxis: {
        ...options.yaxis,
      },
    }));
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
        props.statusHandler(data.o[0], data.o[data.o.length - 1]);
        setCount(end);
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div>
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
