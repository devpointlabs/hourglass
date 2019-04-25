import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { TimerProvider } from "./providers/TimerProvider";
import "semantic-ui-css/semantic.min.css";
import { initMiddleware } from "devise-axios";
import { CircleCountProvider } from "./providers/CircleCountProvider";

initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <TimerProvider>
      <CircleCountProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CircleCountProvider>
    </TimerProvider>
  </AuthProvider>,
  document.getElementById("root")
);
