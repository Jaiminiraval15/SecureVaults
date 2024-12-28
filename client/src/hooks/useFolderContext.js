import { useContext } from "react";
import { FolderContext } from "../context/FolderContext";
export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolderContext must be used within a FolderProvider");
  }
  return context;
};