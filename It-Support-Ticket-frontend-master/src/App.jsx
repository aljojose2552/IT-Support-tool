import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Layout from "./Pages/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectRoute from "./Components/ProtectRoute/ProtectRoute";
import Users from "./Pages/Users/Users";
import Engineers from "./Pages/Engineers/Engineers";
import { useSelector } from "react-redux";
import { userState } from "./redux/auth/authSlice";
import Tickets from "./Pages/Tickets/Tickets";
import Profile from "./Pages/Profile/Profile";

function App() {
  // const { user } = useSelector(userState);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute allowedRoles={["admin", "user", "engineer"]}>
                <Layout />
              </ProtectRoute>
            }
          >
            <Route
              index
              element={
                <ProtectRoute allowedRoles={["admin", "user", "engineer"]}>
                  <Dashboard />
                </ProtectRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectRoute allowedRoles={["admin", "user", "engineer"]}>
                  <Tickets />
                </ProtectRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <Users />
                </ProtectRoute>
              }
            />
            <Route
              path="engineers"
              element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <Engineers />
                </ProtectRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectRoute allowedRoles={["user", "engineer"]}>
                  <Profile />
                </ProtectRoute>
              }
            />
            <Route path="*" element={<h2>not found this page</h2>} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
