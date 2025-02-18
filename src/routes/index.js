import ProductDetail from "../pages/ProductDetail";
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import ProductCategory from "../pages/ProductCategory";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import FormPayment from "../components/FormPayment";
import PaymentNotify from "../components/PaymentNotify";
import OrderDetail from "../pages/OrderDetail";
import AllOrders from "../pages/AllOrders";
import UserDetail from "../pages/UserDetail";
import UserChangePassword from "../pages/UserChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import OtpPassword from "../pages/OtpPassword";
import ResetPassword from "../pages/ResetPassword";
import LayoutAdmin from "../layout/LayoutAdmin";
import DashBoard from "../pages/Admin/Dashboard";
import ManageProduct from "../pages/Admin/ManageProduct";
import ProductDetailAdmin from "../pages/Admin/ProductDetail";
import CreateProduct from "../pages/Admin/CreateProduct";
import EditProduct from "../pages/Admin/EditProduct";
import ManageCategory from "../pages/Admin/ManageCategory";
import CreateCategory from "../pages/Admin/CreateCategory";
import ManageBrand from "../pages/Admin/ManageBrand";
import CreateBrand from "../pages/Admin/CreateBrand";
import ManageOrder from "../pages/Admin/ManageOrder";
import ManageReview from "../pages/Admin/ManageReview";
import ManageAdmin from "../pages/Admin/ManageAdmin";
import Chat from "../pages/Chat";
import AdminChats from "../pages/Admin/AdminChats";
import RoomChatsAdmin from "../pages/Admin/RoomChatsAdmin";

import CreateDiscount from "../pages/Admin/CreateDiscount";
import ManageDiscount from "../pages/Admin/ManageDiscount";
import EditDiscount from "../pages/Admin/EditDiscount";
import Discount from "../pages/Discount";

export const routes=[
  {
    path:"/",
    element:<LayoutDefault/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:":slugCategory",
        element:<ProductCategory/>,
      },
      {
        path:":slugCategory/:slugProduct",
        element:<ProductDetail/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/logout",
        element:<Logout/>
      },
      {
        path:"/payment",
        element:<Payment/>
      },
      {
        path:"/order-confirmation",
        element:<PaymentNotify/>
      },
      {
        path:"/order/order-detail/:orderCode",
        element: <OrderDetail/>
      },
      {
        path:"/order",
        element:<AllOrders/>
      },
      {
        path:"/user/detail",
        element:<UserDetail/>
      },
      {
        path:"/user/change-password",
        element:<UserChangePassword/>
      },
      {
        path:"/forgot-password",
        element:<ForgotPassword/>
      },
      {
        path:"/otp-password",
        element:<OtpPassword/>
      },
      {
        path:"/reset-password",
        element:<ResetPassword/>
      },
      {
        path:"/chats",
        element:<Chat/>
      },
      {
        path:"/discounts",
        element: <Discount/>
      }
      
    ]
  },
  {
    path:"/admin",
    element:<LayoutAdmin/>,
    children:[
      {
        path:"",
        element:<DashBoard/>
      },
      {
        path:"manage-product",
        element:<ManageProduct/>
      },
      {
        path:"manage-product/view/:slug",
        element:<ProductDetailAdmin/>
      },
      {
        path:"create-product",
        element: <CreateProduct/>
      },
      {
        path:"manage-product/edit/:slug",
        element:<EditProduct/>
      },
      {
        path:"manage-category",
        element:<ManageCategory/>
      },
      {
        path:"create-category",
        element:<CreateCategory/>
      },
      {
        path:"manage-brand",
        element:<ManageBrand/>
      },
      {
        path:"create-brand",
        element:<CreateBrand/>
      },
      {
        path:"manage-order",
        element:<ManageOrder/>
      },
      {
        path:"manage-review",
        element:<ManageReview/>
      },
      {
        path:"manage-admin",
        element:<ManageAdmin/>
      },
      {
        path:"chats",
        element:<AdminChats/>
      },
      {
        path:"chats/:roomId",
        element: <RoomChatsAdmin/>
      },
      {
        path:"manage-discounts",
        element:<ManageDiscount />
      },
      {
        path:"create-discount",
        element:<CreateDiscount/>
      },
      {
        path:"edit-discount/:id",
        element:<EditDiscount/>
      }
    ]
  },
]