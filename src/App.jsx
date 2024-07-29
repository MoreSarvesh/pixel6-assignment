import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import CustomerForm from "./pages/CustomerForm";
import { customerLoader } from "./utils/customerLoader.js";
import CustomerDetails from "./pages/CustomerDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <CustomerForm />,
        loader: customerLoader,
      },
      {
        path: "customers",
        element: <CustomerDetails />,
        loader: customerLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
