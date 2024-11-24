import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "app/app";
import { Theme } from '@radix-ui/themes';
import { ScrabbleProvider } from 'components/ScrabbleProvider';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
    <ScrabbleProvider>
      <App />
      </ScrabbleProvider>
    </Theme>
  </React.StrictMode>,
);
