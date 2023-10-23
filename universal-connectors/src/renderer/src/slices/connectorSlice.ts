import { OpenAPIV3 } from "openapi-types";
import openapi from "../data/openapi.json";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialConnector = {
  name: "Summary Care Record",
  description: "An example description.",
  version: "3.0",
  authentication: "None",
  iconColor: "#000000",
  version: 3,
  authentication: {type: "None"},
  api: openapi as OpenAPIV3.Document,
  readMe: "**Hello world!!!**",
};

console.log(initialConnector.api);

export interface ConnectorState {
  name: string;
  description: string;
  version: string;
  authentication: string;
  iconColor: string;
  version: number;
  authentication: {
    oauth2?: {
      clientId: string;
      clientSecret: string;
      authorizationUrl: string;
      tokenUrl: string;
      refreshUrl: string;
    };
    basic?: {
      username: string;
      password: string;
    };
  };
  api: OpenAPIV3.Document;
  readMe: string;
  iconColor: string;
}

export const connectorSlice = createSlice({
  name: "connector",
  initialState: initialConnector,
  reducers: {
    setAll: (state: ConnectorState, action: PayloadAction<ConnectorState>) => {
      state = action.payload;
    },
    setDescription: (state: ConnectorState, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setColor: (state: ConnectorState, action: PayloadAction<string>) => {
      state.iconColor = action.payload;
    },
    setName: (state: ConnectorState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setVersion: (state: ConnectorState, action: PayloadAction<string>) => {
      state.version = action.payload;
    },
    setAPIVersion: (state: ConnectorState, action: PayloadAction<string>) => {
      state.api.info.version = action.payload;
    },
    setAuthentication: (
      state: ConnectorState,
      action: PayloadAction<string>
    ) => {
      state.authentication = action.payload;
    },
    setHost: (state: ConnectorState, action: PayloadAction<string>) => {
      state.api.servers[0].url = action.payload;
    },
    setApi: (
      state: ConnectorState,
      action: PayloadAction<OpenAPIV3.Document>
    ) => {
      state.api = action.payload;
    },
    setReadMe: (state: ConnectorState, action: PayloadAction<string>) => {
      state.readMe = action.payload;
    },
    addEndpoint: (state: ConnectorState, action: PayloadAction<string>) => {
      state.api.paths[action.payload] = {};
    },
    setEndpointPath: (
      state: ConnectorState,
      action: PayloadAction<{ path: string; newPath: string }>
    ) => {
      state.api.paths = renameObjKey({
        oldObj: state.api.paths,
        oldKey: action.payload.path,
        newKey: action.payload.newPath,
      });
    },
    setEndpoint: (
      state: ConnectorState,
      action: PayloadAction<{ path: string; newEndpoint: object }>
    ) => {
      state.api.paths[action.payload.path] = action.payload.newEndpoint;
    },
    setOperationType: (
      state: ConnectorState,
      action: PayloadAction<{
        path: string;
        method: string;
        newOperation: string;
      }>
    ) => {
      state.api.paths[action.payload.path] = renameObjKey({
        oldObj: state.api.paths[action.payload.path],
        oldKey: action.payload.method,
        newKey: action.payload.newOperation,
      });
    },
    deleteEndpoint: (state: ConnectorState, action: PayloadAction<string>) => {
      delete state.api.paths[action.payload];
    },
    deleteOperation: (
      state: ConnectorState,
      action: PayloadAction<{ path: string; method: string }>
    ) => {
      delete state.api.paths[action.payload.path][action.payload.method];
    },
    setAuthentication: (
      state: ConnectorState,
      action: PayloadAction<{
        oauth2: {
          clientId: string;
          clientSecret: string;
          authorizationUrl: string;
          tokenUrl: string;
          refreshUrl: string;
        };
      }>
    ) => {
      state.authentication = action.payload;
    },
    setOauth: (state: ConnectorState, action:PayloadAction<{oauth2: {
      clientId: string;
      clientSecret: string;
      authorizationUrl: string;
      tokenUrl: string;
      refreshUrl: string;
    };}>) => {
      state.authentication.oauth2 = action.payload.oauth2;
    }
  },
});

const renameObjKey = ({
  oldObj,
  oldKey,
  newKey,
}: {
  oldObj: any;
  oldKey: string;
  newKey: string;
}) => {
  const keys = Object.keys(oldObj);
  const newObj = keys.reduce((acc, val) => {
    if (val === oldKey) {
      acc[newKey] = oldObj[oldKey];
    } else {
      acc[val] = oldObj[val];
    }
    return acc;
  }, {});

  return newObj;
};

export const {
  setAll,
  setDescription,
  setName,
  setColor,
  setVersion,
  setAPIVersion,
  setAuthentication,
  setHost,
  setApi,
  setReadMe,
  addEndpoint,
  setEndpointPath,
  setEndpoint,
  setOperationType,
  deleteEndpoint,
  deleteOperation,
  setOauth
} = connectorSlice.actions;

export default connectorSlice.reducer;
