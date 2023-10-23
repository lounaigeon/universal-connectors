import { TextField, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setDescription, setVersion, setAPIVersion } from '../slices/connectorSlice';

  export default function Description() {
    const description = useAppSelector((state) => state.connector.description);
    const connectorVersion = useAppSelector((state) => state.connector.version);
    const apiVersion = useAppSelector((state) => state.connector.api.info.version);
    const dispatch = useAppDispatch();

    const handleDescriptionChange = (value: string) => {
        dispatch(setDescription(value));
    }

    const handleConnectorVersionChange = (value: string) => {
        dispatch(setVersion(value));
    }
    
    const handleAPIVersionChange = (value: string) => {
        dispatch(setAPIVersion(value));
    }

    return (
        <Box>
            <Typography variant="h2" component="div" gutterBottom>Description</Typography>
            <TextField
                id="background-color"
                style={{ width: "70%", marginBottom: "10px", marginTop: "10px", marginRight: "10px" }}
                label="Connector Version"
                value={connectorVersion}
                onChange = {(e) => handleConnectorVersionChange(e.target.value)}
                required
                InputLabelProps={{
                    shrink: true,
                }}
            />  
            <TextField
                id="background-color"
                style={{ width: "70%", marginBottom: "10px", marginTop: "10px", marginRight: "10px" }}
                label="API Version"
                value={apiVersion}
                required
                onChange = {(e) => handleAPIVersionChange(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />    
            <TextField
                id="description"
                style={{ width: "70%", marginBottom: "10px", marginTop: "10px", marginRight: "10px" }}
                label="Description"
                multiline
                rows={4}
                required
                defaultValue={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                helperText="Give your custom connector a short description"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Box>
    )
}
