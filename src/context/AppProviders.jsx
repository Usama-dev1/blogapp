// AppProviders.jsx
import { PostProvider } from "./postContext";
import { CategoryProvider } from "./categoryContext";
import { AuthProvider } from "./authContext";
export const AppProviders = ({ children }) => (
  <AuthProvider>
    <CategoryProvider>
      <PostProvider>{children}</PostProvider>
    </CategoryProvider>
  </AuthProvider>
);
