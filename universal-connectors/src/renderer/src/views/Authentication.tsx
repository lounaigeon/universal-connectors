import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  TableCell,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactElement, Key } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setAuthentication, setOauth } from "../slices/connectorSlice";

export default function Authentication() {
  const auth = useAppSelector((state) => state.connector.authentication);
  const dispatch = useAppDispatch();

  const updateAuthentication = (auth: object) => {
    dispatch(setAuthentication(auth));
  };

  const updateOauth = (oauth: object) => { 
    dispatch((setOauth(oauth)))
}

  function createData(parameterLabel: ReactElement, parameterName: string) {
    return { parameterLabel, parameterName };
  }
  const username1 = (
    <TextField
      id="username"
      label="Username"
      variant="outlined"
      required
      InputLabelProps={{ shrink: true }}
    />
  );
  const password1 = (
    <TextField
      id="password"
      label="Password"
      variant="outlined"
      required
      InputLabelProps={{ shrink: true }}
    />
  );
  const rows = [
    createData(username1, "username"),
    createData(password1, "password"),
  ];
  return (
    <Box>
      <Typography variant="h2" component="div" gutterBottom>
        Authentication
      </Typography>
      <FormControl sx={{ minWidth: 120, width: "70%", marginBottom: 5 }}>
        <InputLabel id="auth-label">
          Choose what authentication is implemented by your API
        </InputLabel>
        <Select
          labelId="auth-label"
          id="auth-select"
          value={auth.type}
          label="Choose what authentication is implemented by your API"
          onChange={(event: SelectChangeEvent) => {
            const newType = event.target.value as string;
            const updatedAuth = {
              ...auth,
              type: newType,
            };
            updateAuthentication(updatedAuth);
          }}
        >
          <MenuItem value="None">No authentication</MenuItem>
          <MenuItem value={"Basic"}>Basic authentication</MenuItem>
          <MenuItem value={"APIKey"}>API Key</MenuItem>
          <MenuItem value={"OAuth"}>OAuth 2.0</MenuItem>
        </Select>
      </FormControl>
      {auth.type === "APIKey" && (
        <Box>
          <Typography>
            Users will be required to provide the API Key when creating a
            connection.
          </Typography>
          <TextField
            id="parameter-label"
            label="Parameter Label"
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="parameter-name"
            label="Parameter Name"
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="parameter-location"
            label="Parameter Location"
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
      {auth.type === "Basic" && (
        <Box>
          <Alert style={{ width: "70%", marginBottom: 5 }} severity="warning">
            Do NOT enter secrets here. These fields are used to configure
            display names for connections.
          </Alert>
          <Typography style={{ marginBottom: 5 }}>
            Users will have to provide a valid user name and password before
            using this API.
          </Typography>
          <TableContainer component={Paper} style={{ width: "70%" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Parameter Label</TableCell>
                  <TableCell>Parameter Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.parameterLabel as unknown as Key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.parameterLabel}
                    </TableCell>
                    <TableCell>{row.parameterName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {auth.type === "OAuth" && (
        <Box>
          <TextField
            id="client-id"
            label="Client ID"
            // value={auth.oauth.clientId}
            onChange={(event) => {
                const newClientId = event.target.value as string;
                const updatedOauth = {
                    ...auth.oauth,
                    clientId: newClientId,
                    };
                updateOauth(updatedOauth);
            }}
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="client-secret"
            label="Client Secret"
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="authorization-url"
            label="Authorization URL"
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="token-url"
            label="Token URL"
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="refresh-url"
            label="Refresh URL"
            style={{
              width: "70%",
              marginBottom: "10px",
              marginTop: "10px",
              marginRight: "10px",
            }}
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
