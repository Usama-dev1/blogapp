import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/HomePage";
import PostDetailsPage from "./pages/PostDetailsPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/:id" element={<PostDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
