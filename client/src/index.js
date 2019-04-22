import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { TimerProvider } from "./providers/TimerProvider";
import "semantic-ui-css/semantic.min.css";
import { initMiddleware } from "devise-axios";

initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <TimerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TimerProvider>
  </AuthProvider>,
  document.getElementById("root")
);
