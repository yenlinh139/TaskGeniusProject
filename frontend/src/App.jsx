import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./common/constants";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import WrapperLogin from "./pages/login/WrapperLogin";
import WrapperProjects from "./pages/projects/WrapperProjects";
import SettingUser from "./pages/setting/SettingUser";
import WrapperTask from "./pages/tasks/WrapperTask";
import Users from "./pages/users/WrapperUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<WrapperLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.home} element={<Dashboard />} />
          <Route path={ROUTES.users} element={<Users />} />
          <Route path={ROUTES.tasks} element={<WrapperTask />} />
          <Route path={ROUTES.projects} element={<WrapperProjects />} />
          <Route path={ROUTES.setting} element={<SettingUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
