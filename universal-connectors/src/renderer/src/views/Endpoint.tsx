import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setEndpointPath,
  setEndpoint,
  setOperationType,
  deleteEndpoint,
  deleteOperation,
} from "../slices/connectorSlice";

export default function Endpoint({ endpointPath }: { endpointPath: string }) {
  const endpoint = useAppSelector(
    (state) => state.connector.api.paths[endpointPath]
  )!;
  const endpoints = useAppSelector((state) => state.connector.api.paths);
  const dispatch = useAppDispatch();

  const setPath = (path: string) => {
    dispatch(setEndpointPath({ path: endpointPath, newPath: path }));
  };

  const updateEndpoint = (endpoint: object) => {
    console.log(endpoint);
    dispatch(setEndpoint({ path: endpointPath, newEndpoint: endpoint }));
  };

  const updateOperationType = (
    path: string,
    method: string,
    newType: string
  ) => {
    dispatch(
      setOperationType({ path: path, method: method, newOperation: newType })
    );
  };

  const handleDeleteEndpoint = () => {
    if (Object.keys(endpoints).length === 1) {
      alert("You cannot delete the last endpoint!");
      return;
    }
    dispatch(deleteEndpoint(endpointPath));
  }

  const handleDeleteOperation = (path: string, method: string) => {
    dispatch(deleteOperation({ path: path, method: method }));
  }


  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h2" component="div" gutterBottom>
          Endpoint {endpointPath}
        </Typography>
      <Button
        style={{ marginLeft: 10, marginBottom: 10, width: 170 }}
        color="error"
        variant="contained"
        onClick={() => handleDeleteEndpoint()}
      >
        Delete Endpoint
      </Button>
      </Box>
      <TextField
        id="endpoint-path"
        style={{
          width: "70%",
          marginBottom: "10px",
          marginTop: "10px",
          marginRight: "10px",
        }}
        label="Path"
        value={endpointPath.substring(1)}
        onChange={(e) => setPath(`/${e.target.value}`)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">/</InputAdornment>,
        }}
      />
      {Object.entries(endpoint).map(([method, methodDetails], index) => (
        <Box
          key={index}
          sx={{
            marginBottom: 4,
            backgroundColor: "rgba(66, 139, 240, 0.2)",
            padding: 2,
            borderRadius: "5px !important",
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography style={{ padding: 0.5, marginBottom: "10px" }}>
              {methodDetails.operationId}
            </Typography>
            <Button
              variant="contained"
              style={{ height: 36, width: 160 }}
              size="small"
              color="error"
              onClick={() => handleDeleteOperation(endpointPath, method)}
            >
              Delete operation
            </Button>
          </Box>
          <TextField
            id={`op-id-${index}`}
            style={{
              width: "60%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            label="Operation ID"
            value={methodDetails.operationId}
            onChange={(event) =>
              updateEndpoint({
                ...endpoint,
                [method]: { ...methodDetails, operationId: event.target.value },
              })
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl sx={{ minWidth: 120, width: "60%" }}>
            <InputLabel id={`auth-label-${index}`}>
              Type of operation
            </InputLabel>
            <Select
              labelId={`auth-label-${index}`}
              id={`auth-select-${index}`}
              value={method.toUpperCase()}
              required
              label="Type of operation"
              onChange={(event) =>
                updateOperationType(
                  endpointPath,
                  method,
                  event.target.value as string
                )
              }
            >
              <MenuItem value={"GET"}>GET</MenuItem>
              <MenuItem value={"POST"}>POST</MenuItem>
              <MenuItem value={"PUT"}>PUT</MenuItem>
              <MenuItem value={"DELETE"}>DELETE</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id={`op-desc-${index}`}
            style={{
              width: "60%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            label="Description"
            multiline
            rows={4}
            value={methodDetails.description}
            onChange={(event) =>
              updateEndpoint({
                ...endpoint,
                [method]: { ...methodDetails, description: event.target.value },
              })
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
