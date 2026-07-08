import { useContext } from "react";
import CategoryContext from "../context/categoryContext.jsx";
export const useCategoryHook = () => {
  if (!CategoryContext) {
    throw new Error("No Post Context");
  }
  const context = useContext(CategoryContext);
  return context;
};
