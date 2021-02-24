import "./App.css";
import { CandleView } from "./components/CandleView";
import { TradingPrice } from "./components/TradingPrice";

const ticker = "gme";
const tickerUC = ticker.toUpperCase();

function App() {
  return (
    <div className="App">
      <h1>{tickerUC}</h1>
      <TradingPrice ticker={tickerUC} />
      <CandleView ticker={tickerUC} />
    </div>
  );
}

export default App;
