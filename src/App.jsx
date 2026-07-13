import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PostDetailsPage from "./pages/PostDetailsPage";
import MainLayout from "./layouts/MainLayout";
import UserDashBoardLayout from "./layouts/UserDashboardLayout";
import UserDashboardPosts from "./components/dashboard/user/UserDashboardPosts";
import UserDashboardDrafts from "./components/dashboard/user/UserDashboardDrafts";
import UserListTable from "./components/super-admin/UserListTable";
import UserDashboardPostForm from "./components/dashboard/user/UserDashboardPostForm";
import LoginForm from "./components/auth/loginForm";
import RegisterForm from "./components/auth/registerForm";
import HomePage from "./pages/HomePage2";
import UserDashboardAnalytics from "./components/dashboard/user/UserDashboardAnalytics";
import UserDashboardAllPosts from "./components/super-admin/UserDashboardAllPosts";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "super_admin"]} />
          }
        >
          <Route element={<UserDashBoardLayout />}>
            <Route
              path="/dashboard/user/create-post"
              element={<UserDashboardPostForm />}
            />
            <Route
              path="/dashboard/user"
              element={<UserDashboardAnalytics />}
            />
            <Route
              path="/dashboard/user/drafts"
              element={<UserDashboardDrafts />}
            />
            <Route
              path="/dashboard/user/all-posts"
              element={<UserDashboardPosts />}
            />

            <Route
              element={
                <ProtectedRoute allowedRoles={["admin", "super_admin"]} />
              }
            >
              <Route
                path="/dashboard/user/user-posts"
                element={<UserDashboardAllPosts />}
              />
              <Route
                path="/dashboard/admin/users"
                element={<UserListTable />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
