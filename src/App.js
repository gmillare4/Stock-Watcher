import { useState } from "react";
import "./App.css";
import { CandleView } from "./components/CandleView";
import { TradingPrice } from "./components/TradingPrice";
import { TickerSearch } from "./components/TickerSearch";

const ticker = "gme";
const tickerUC = ticker.toUpperCase();

function App() {
  const [status, setStatus] = useState("neutral");
  const [diff, setDiff] = useState(0);
  const [percDiff, setPercDiff] = useState(0);
  function statusHandler(open, close) {
    console.log("open and close", open, close);
    if (open > close) {
      setStatus("down");
    } else if (open < close) {
      setStatus("up");
    } else {
      setStatus("neutral");
    }
    setDiff((close - open).toFixed(2));
    setPercDiff((((close - open) / close) * 100).toFixed(2));
    console.log(diff, percDiff);
  }
  return (
    <div className="App">
      <h1>{tickerUC}</h1>
      <TradingPrice ticker={tickerUC} />
      <h1 className={status}>
        {status === "up" ? "📈" : "📉"} ${diff} ({percDiff}%) Today
      </h1>
      <CandleView
        ticker={tickerUC}
        statusHandler={statusHandler}
        status={status}
      />
      <TickerSearch />
    </div>
  );
}

export default App;
