import { useContext } from "react";
import PostContext from "../context/postContext.jsx";
export const usePostHook = () => {
  if (!PostContext) {
    throw new Error("No Post Context");
  }
  const context = useContext(PostContext);
  return context;
};
