import { configureStore } from "@reduxjs/toolkit";
import connectorReducer from "./slices/connectorSlice";


export const store = configureStore({
  reducer: { connector: connectorReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;