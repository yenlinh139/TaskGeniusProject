import { Navigate, Outlet } from "react-router-dom";
import Header from "../pages/theme/Header/Header";
import LeftMenu from "../pages/theme/LeftMenu/LeftMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_INFO } from "../store/constants";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute() {
  const accessToken = localStorage.getItem("access_token");
  const { userInfo } = useSelector((state) => state.authStore);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  if (accessToken) {
    if (!userInfo) {
      dispatch({
        type: SET_USER_INFO,
        payload: jwtDecode(accessToken),
      });
    }

    return (
      <>
        <Header openSidebar={() => setSidebarOpen(true)} />
        <div className="d-flex w-100">
          <LeftMenu
            sidebarOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
