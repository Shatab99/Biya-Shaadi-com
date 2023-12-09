import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Roots from './Roots';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Components/Pages/home/Home';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LogIn from './Components/Pages/SignInOut/LogIn';
import SignUp from './Components/Pages/SignInOut/SignUp';
import AuthProvider from './Components/Provider/AuthProvider';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import Biodatas from './Components/Pages/Biodata/Biodatas';
import BioDataDetails from './Components/Pages/Biodata/BioDataDetails';
import Dashboard from './Components/Pages/DashBoard/Dashboard';
import UserHome from './Components/Pages/DashBoard/UserHome';
import EditBiodata from './Components/Pages/DashBoard/EditBiodata';
import MyContactsReq from './Components/Pages/DashBoard/MyContactsReq';
import Favourites from './Components/Pages/DashBoard/Favourites';
import FullBiodata from './Components/Pages/DashBoard/FullBiodata';
import FullbioDataViaFavourites from './Components/Pages/DashBoard/FullbioDataViaFavourites';
import ManageUsers from './Components/Pages/DashBoard/Admin/ManageUsers';
import AdminRoutes from './Components/PrivateRoutes/AdminRoutes';
import FullBioDataUser from './Components/Pages/Biodata/FullBioDataUser';
import CheckOut from './Components/Pages/Payment/CheckOut';
import PremiumRequets from './Components/Pages/DashBoard/Admin/PremiumRequets';
import ContactUs from './Components/Pages/ContactUs/ContactUs';
import AboutUs from './Components/Pages/AboutUS/AboutUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path:'biodata',
        element:<PrivateRoutes><Biodatas/></PrivateRoutes>
      },
      {
        path:'biodata/:id',
        element : <PrivateRoutes><BioDataDetails/></PrivateRoutes>,
        loader : ({params})=> fetch(`https://shaadi-server.vercel.app/members/details/${params.id}`) 
      },
      {
        path:'contactus',
        element:<ContactUs/>
      },
      {
        path:'aboutus',
        element:<AboutUs/>
      }
    ]
  },
  {
    path: 'login',
    element: <LogIn />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path:'dashboard',
    element:<PrivateRoutes><Dashboard/></PrivateRoutes>,
    children:[
      {
        path : 'userhome',
        element: <PrivateRoutes><UserHome/></PrivateRoutes>
      },
      {
        path : 'editbiodata',
        element: <PrivateRoutes><EditBiodata/></PrivateRoutes>
      },
      {
        path:'mycontacts',
        element:<PrivateRoutes><MyContactsReq/></PrivateRoutes>
      },
      {
        path: 'favourites',
        element: <PrivateRoutes><Favourites/></PrivateRoutes>
      },
      {
        path:'fullbiodata/:id',
        element: <PrivateRoutes><FullBiodata/></PrivateRoutes>,
        loader : ({params})=> fetch(`https://shaadi-server.vercel.app/requests/seebio/${params.id}`)
      },
      {
        path : 'fullbiodataviafav/:id',
        element: <PrivateRoutes><FullbioDataViaFavourites/></PrivateRoutes>,
        loader : ({params}) => fetch(`https://shaadi-server.vercel.app/requests/seebio/${params.id}`)
      },
      {
        path:'fullbiodatauser/:email',
        element : <PrivateRoutes><FullBioDataUser/></PrivateRoutes>,
        loader : ({params}) => fetch(`https://shaadi-server.vercel.app/members/biodata/${params.email}`)
      },
      {
        path : 'checkout',
        element:<PrivateRoutes><CheckOut/></PrivateRoutes>
      },
      //admin routes
      {
        path:'manageusers',
        element: <AdminRoutes><ManageUsers/></AdminRoutes>
      },
      {
        path: 'premiumrequests',
        element : <AdminRoutes><PremiumRequets/></AdminRoutes>
      }
    ]
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
