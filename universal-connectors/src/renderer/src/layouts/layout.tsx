import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { AppBar, CssBaseline, Typography } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { pages } from "../routes/pages";
import { useAppDispatch, useAppSelector } from "../hooks";
import CircleIcon from "@mui/icons-material/Circle";
import { addEndpoint } from "../slices/connectorSlice";
// import { ipcRenderer } from "electron";

const drawerWidth = 240;

export default function ClippedDrawerContent() {
  const connector = useAppSelector((state) => state.connector);
  const dispatch = useAppDispatch();

  const location = useLocation();

  const handleClick = (pagePath: string) => {
    console.log(pagePath);
  };

  const handleAddEndpoint = () => {
    const newEndpoint = `/Endpoint${Object.keys(connector.api.paths).length}`;
    dispatch(addEndpoint(newEndpoint));
  };

  const handleSave = () => {
    window.electron.save(connector)
  };

  const handleTranslate = () => {
    window.electron.translate(connector)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {connector?.name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="inherit" onClick={handleTranslate}>
              Translate
            </Button>
            <Button color="inherit" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {pages.map((page) => (
              <ListItem key={page.name} disablePadding>
                <Link
                  to={page.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <ListItemButton
                    selected={page.path === location.pathname}
                    onClick={() => {
                      handleClick(page.path);
                    }}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Add an endpoint"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleAddEndpoint}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            <List>
              {Object.keys(connector.api.paths).map((path, index) => (
                <ListItem key={path} disablePadding>
                  <Link
                    to={`/endpoint/${index}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                    }}
                  >
                    <ListItemButton
                      selected={`/endpoint/${index}` === location.pathname}
                      onClick={() => handleClick(`/endpoint/${index}`)}
                    >
                      <ListItemIcon>
                        <CircleIcon />
                      </ListItemIcon>
                      <ListItemText primary={path} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
