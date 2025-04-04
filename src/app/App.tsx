import "./styles/index.css";
import { RouterProvider } from "react-router";
import { ROUTER } from "@/app/data/router/router";

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;
