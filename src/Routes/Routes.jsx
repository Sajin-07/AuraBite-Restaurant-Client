import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings"
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import Success from "../pages/Dashboard/PaymentStatus/Success";
import Cancel from "../pages/Dashboard/PaymentStatus/Cancel";
import Fail from "../pages/Dashboard/PaymentStatus/Fail";
import Contact from "../pages/Dashboard/Contact";
import AddReview from "../pages/Dashboard/Review/AddReview";
import Gemini from "../pages/Home/Gemini/Gemini";
import Reservation from "../pages/Dashboard/Reservation/Reservation";
import ReservationHistory from "../pages/Dashboard/Reservation/ReservationHistory";
// import Ballpit from "../pages/Home/Waves/Ballpit";




  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'menu', 
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'gemini',
          element: <Gemini></Gemini>
        },
        // {
        //   path: 'Ballpit',
        //   element: <Ballpit></Ballpit>
        // },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // normal user routes
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path: 'reservationHistory',
          element: <ReservationHistory></ReservationHistory>
        },
        {
          path: 'reservation',
          element: <Reservation></Reservation>
        },
        {
          path: 'Success',
          element: <Success></Success>
        },
        {
          path: 'Cancel',
          element: <Cancel></Cancel>
        },
        {
          path: 'Fail',
          element: <Fail></Fail>
        },
        {
          path: 'Contact',
          element: <Contact></Contact>
        },
        {
          path: 'AddReview',
          element: <AddReview></AddReview>
        },

        // admin only routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'addItems',
          element: <AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path: 'manageItems',
          element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path: 'bookings',
          element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
        },
        // {
        //   path: 'updateItem/:id',
        //   element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        //   loader: ({params}) => fetch(`https://aurabite-restaurant-server.onrender.com/menu/${params.id}`)
        // },
        {
          path: 'updateItem/:id',
          element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params}) => fetch(`https://aurabite-restaurant-server.onrender.com/menu/${params.id}`).then(res => res.json())
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        }

      ]
    }
  ]);