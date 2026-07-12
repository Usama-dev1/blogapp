import { useContext } from "react";
import LikeContext from "../context/LikeContext.jsx";
export const useCategoryHook = () => {
  if (!LikeContext) {
    throw new Error("No Post Context");
  }
  const context = useContext(LikeContext);
  return context;
};
