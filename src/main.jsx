import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataContextProvider } from "./context/Context.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Details from "./component/Details/Details.jsx";
import Wishlist from "./Wishlist/Wishlist.jsx";
import Compare from "./component/Compare/Compare.jsx";

let router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/details", element: <Details /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/compare", element: <Compare /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <DataContextProvider>
    {" "}
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </DataContextProvider>
);
