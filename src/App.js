import logo from "./logo.svg";
import "./App.css";
import { CandleView } from "./components/CandleView";

const ticker = "gme";
const tickerUC = ticker.toUpperCase();

function App() {
  return (
    <div className="App">
      <CandleView ticker={tickerUC} />
    </div>
  );
}

export default App;
