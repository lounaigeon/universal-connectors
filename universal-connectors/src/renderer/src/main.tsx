import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { loadInitialData, setAll, setApi, setAuthentication, setColor, setDescription, setName, setReadMe, setVersion } from "./slices/connectorSlice.ts";

const dispatch = store.dispatch;
const response = await window.electron.load();
const parsedData = JSON.parse(response);

// Dispatch actions to set the initial state based on the parsed data
dispatch(setName(parsedData.name));
dispatch(setDescription(parsedData.description));
dispatch(setColor(parsedData.iconColor));
dispatch(setVersion(parsedData.version));
dispatch(setAuthentication(parsedData.authentication));
dispatch(setApi(parsedData.api));
dispatch(setReadMe(parsedData.readMe));

// dispatch(setAll(parsedData))

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
