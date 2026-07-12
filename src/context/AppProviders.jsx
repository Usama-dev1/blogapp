// AppProviders.jsx
import { PostProvider } from "./postContext";
import { CategoryProvider } from "./categoryContext";
import { AuthProvider } from "./authContext";
import { LikeProvider } from "./likeContext";
import { CommentProvider } from "./commentContext";
export const AppProviders = ({ children }) => (
  <AuthProvider>
    <PostProvider>
      <CategoryProvider>
        <LikeProvider>
          <CommentProvider>{children}</CommentProvider>
        </LikeProvider>
      </CategoryProvider>
    </PostProvider>
  </AuthProvider>
);
