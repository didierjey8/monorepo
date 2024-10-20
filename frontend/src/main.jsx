import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import MainProvider from "./providers/index.jsx";

import "./assets/css/_default.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MainProvider>
    <App />
  </MainProvider>
);
