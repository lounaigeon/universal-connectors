import { Routes, Route } from "react-router-dom";
import ClippedDrawer from "../layouts/layout";
import { pages } from "./pages";
import { useAppSelector } from "../hooks";
import CircleIcon from '@mui/icons-material/Circle';
import Endpoint from "../views/Endpoint";

const Routing = () => {
  const paths = useAppSelector((state) => state.connector.api.paths);

  const endpointPages = Object.keys(paths).map((path, index) => ({
    name: path,
    path: `/endpoint/${index}`,
    component: <Endpoint endpointPath={ path } />,
    icon : <CircleIcon />
  }));

  const completePages = [...pages, ...endpointPages];

  console.log(completePages);

  return (
    <Routes>
      <Route element={<ClippedDrawer />}>
        <Route index element={pages[0].component} />
        {completePages.map((page) => (
          <Route path={page.path} element={page.component} />
        ))}
      </Route>
    </Routes>
  );
};

export default Routing;
