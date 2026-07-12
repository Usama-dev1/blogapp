import { useContext } from "react";
import LikeContext from "../context/likeContext";
export const useLikesHook = () => {
  if (!LikeContext) {
    throw new Error("No Post Context");
  }
  const context = useContext(LikeContext);
  return context;
};
