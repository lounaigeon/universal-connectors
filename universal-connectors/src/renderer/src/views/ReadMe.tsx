import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MDEditor from "@uiw/react-md-editor";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setReadMe } from "../slices/connectorSlice";



export default function ReadMe() {
  const readMe = useAppSelector((state) => state.connector.readMe);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setReadMe(value));
  }

  return (
    <Box>
      <Typography variant="h2" component="div" gutterBottom>
        Read Me
      </Typography>
      <MDEditor value={readMe} onChange={handleChange} />
    </Box>
  );
}
