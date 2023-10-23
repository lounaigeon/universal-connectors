import { HashRouter } from "react-router-dom";
import Routing from "./routes/routing";

function App() {
  return (
    <>
      <HashRouter>
        <Routing />
      </HashRouter>
    </>
  );
}

export default App;
