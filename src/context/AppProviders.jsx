// AppProviders.jsx
import { PostProvider } from "./postContext";
import { AuthProvider } from "./authContext";
export const AppProviders = ({ children }) => (
  <AuthProvider>
    <PostProvider>{children}</PostProvider>
  </AuthProvider>
);
