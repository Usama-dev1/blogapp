// AppProviders.jsx
import { PostProvider } from "./postContext";
import { CategoryProvider } from "./categoryContext";
import { AuthProvider } from "./authContext";
import { LikeProvider } from "./likeContext";
export const AppProviders = ({ children }) => (
  <AuthProvider>
    <CategoryProvider>
      <PostProvider>
        <LikeProvider>{children}</LikeProvider>
      </PostProvider>
    </CategoryProvider>
  </AuthProvider>
);
