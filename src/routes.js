import Dashboard from "views/Dashboard.jsx";
import UserList from "views/UserList.jsx";
import FunctionalData from "views/FunctionalData.jsx";
import UserProfile from "views/UserProfile.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "pe-7s-home",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/FunctionalData",
    name: "Functional Data",
    icon: "pe-7s-glasses",
    component: FunctionalData,
    layout: "/admin"
  },
  {
    path: "/userlist",
    name: "Userlist",
    icon: "pe-7s-users",
    component: UserList,
    layout: "/admin"
   },
  {
    path: "/user",
    name: "Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  }
];

export default dashboardRoutes;
