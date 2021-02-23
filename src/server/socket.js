const socket = new WebSocket("wss://ws.finnhub.io?token=c0m5rvn48v6rkav1k8u0");

// Connection opened -> Subscribe
socket.addEventListener("open", function (event) {
  socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

// Unsubscribe
var unsubscribe = function (symbol) {
  socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
};
