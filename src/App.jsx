import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/HomePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import MainLayout from "./layouts/MainLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/:id" element={<PostDetailsPage />} />
        </Route>
        <Route element={<DashBoardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
