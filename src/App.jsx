import Dashboard, { DashboardLoder, formAction } from "./components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainBord, { MainLoader } from "./components/MainBord";
import { logoutAction } from "./components/Helper";
import Error from "./components/Error";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainBord />,
      loader: MainLoader,

      children: [
        {
          path: "/",
          element: <Dashboard />,
          loader: DashboardLoder,
          action: formAction,
          errorElement: <Error />,
        },

        {
          path: "/contact",
          element: <h1>Contact</h1>,
        },
      ],
     
    },
    {
      path: "logout",
      action: logoutAction,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
