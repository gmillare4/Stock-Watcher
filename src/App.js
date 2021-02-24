import { useState } from "react";
import "./App.css";
import { CandleView } from "./components/CandleView";
import { TradingPrice } from "./components/TradingPrice";

const ticker = "gme";
const tickerUC = ticker.toUpperCase();

function App() {
  const [status, setStatus] = useState("neutral");
  function statusHandler(open, close) {
    console.log("open and close", open, close);
    if (open > close) {
      setStatus("down");
    } else if (open < close) {
      setStatus("up");
    } else {
      setStatus("neutral");
    }
  }
  return (
    <div className="App">
      <h1>{tickerUC}</h1>
      <TradingPrice ticker={tickerUC} />
      <h1>{status}</h1>
      <CandleView ticker={tickerUC} statusHandler={statusHandler} />
    </div>
  );
}

export default App;
