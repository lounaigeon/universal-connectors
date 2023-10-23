import { TextField, Typography, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, SelectChangeEvent } from '@mui/material';
import  { setHost } from '../slices/connectorSlice';
import { useAppDispatch, useAppSelector } from '../hooks';


const Connection = () => {
    const url = useAppSelector((state) => (state.connector.api.servers as any)[0].url);
    const host = url.split("/")[2];
    const baseURL = "/".concat(url.split("/").slice(3, ).join("/"));
    const scheme = url.split("/")[0].slice(0, -1);

    const dispatch = useAppDispatch();

    const handleChangeScheme = (event: SelectChangeEvent) => {
        const newUrl = event.target.value.toLowerCase() + "://" + baseURL + host;
        dispatch(setHost(newUrl));
    };

    const handleChangeBaseURL = (event: SelectChangeEvent) => {
        const newUrl = scheme + "://" + event.target.value.toLowerCase() + host;
        dispatch(setHost(newUrl));
    }

    const handleChangeHost = (event: SelectChangeEvent) => {
        const newUrl = scheme + "://" + baseURL + event.target.value.toLowerCase();
        dispatch(setHost(newUrl));
    }

    return (
        <Box display="flex" flexDirection={"column"}>
            <Typography variant="h2" component="div" gutterBottom>Connection</Typography>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Scheme</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="scheme"
                    name="scheme"
                >
                    <FormControlLabel value={scheme === "https"} onClick={() => handleChangeScheme} control={<Radio />} label="HTTPS" />
                    <FormControlLabel value={scheme === "http"} onClick={() => handleChangeScheme} control={<Radio />} label="HTTP" />
                </RadioGroup>
            </FormControl>
            <TextField
                id="host"
                style={{ width: "70%", marginBottom: "10px", marginTop: "10px", marginRight: "10px" }}
                label="Host"
                value={host}
                required
                onChange = {() => handleChangeHost}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="base-url"
                style={{ width: "70%", marginBottom: "10px", marginTop: "10px", marginRight: "10px" }}
                label="Base URL"
                value={baseURL}
                required
                onChange = {() => handleChangeBaseURL}
                InputLabelProps={{
                    shrink: true,
                }}
            />        
        </Box>
    )
}

export default Connection;