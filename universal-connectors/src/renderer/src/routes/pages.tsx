import Description from "../views/Description";
import Authentication from "../views/Authentication";
import Connection from "../views/Connection";
import { Description as DescriptionIcon } from "@mui/icons-material";
import { Lock as LockIcon } from "@mui/icons-material";
import ReadMe from "../views/ReadMe";
import InfoIcon from "@mui/icons-material/Info";

export const pages = [
    { name: "Description", path: "/Description", component: <Description />, icon: <DescriptionIcon />},
    { name: "Connection", path: "/Connection", component: <Connection />, icon: <DescriptionIcon />},
    { name: "Authentication", path: "/Authentication", component: <Authentication />, icon: <LockIcon /> },
    { name: "Read Me", path: "/ReadMe", component: <ReadMe />, icon: <InfoIcon /> }
  ]
  