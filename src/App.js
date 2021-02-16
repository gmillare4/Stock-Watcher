import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

const apiUrl = `https://api.polygon.io/v2/aggs/ticker/GME/range/1/minute/2020-10-14/2020-10-14?unadjusted=true&sort=asc&limit=50000&apiKey=yJzK3sWL5v0tUxElpFaT4O0ed8ZJzN58`;
async function getStocks() {
  const response = await fetch(apiUrl);
  return response.json();
}

function App() {
  useEffect(() => {
    getStocks().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
