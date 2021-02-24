import logo from "./logo.svg";
import "./App.css";
import { CandleView } from "./components/CandleView";
import { TradingPrice } from "./components/TradingPrice";

const ticker = "gme";
const tickerUC = ticker.toUpperCase();

function App() {
  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0"
  );

  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({ type: "subscribe", symbol: "GME" }));
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    console.log("Message from server ", event.data);
  });

  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };
  return (
    <div className="App">
      <h1>{tickerUC}</h1>
      <TradingPrice />
      <CandleView ticker={tickerUC} />
    </div>
  );
}

export default App;
