import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { SDUIBase } from "./Renderer";

const router = createBrowserRouter([
  {
    path: "*",
    element: <SDUIBase />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
