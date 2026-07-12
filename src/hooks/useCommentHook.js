import { useContext } from "react";
import { CommentContext } from "../context/commentContext";
export const useCommentHook = () => {
  if (!CommentContext) {
    throw new Error("No Post Context");
  }
  const context = useContext(CommentContext);
  return context;
};
