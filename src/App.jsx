import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/HomePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import MainLayout from "./layouts/MainLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import DashboardPosts from "./components/dashboard/DashboardPosts";
import DashboardDrafts from "./components/dashboard/DashboardDrafts";
import UserListTable from "./components/super-admin/UserListTable";
import DashboardPostForm from "./components/dashboard/DashboardPostForm";
import LoginForm from "./components/auth/loginForm";
import RegisterForm from "./components/auth/registerForm";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/:id" element={<PostDetailsPage />} />
        </Route>
        <Route element={<DashBoardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/create-post"
            element={<DashboardPostForm />}
          />
          <Route path="/dashboard/user" element={<UserListTable />} />
          <Route path="/dashboard/drafts" element={<DashboardDrafts />} />
          <Route path="/dashboard/all-posts" element={<DashboardPosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
