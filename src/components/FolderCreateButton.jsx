"use client";
import { useTodoContext } from "@/context/TodoContext";
import { Button } from "./ui/button";
import { TbFolderPlus } from "react-icons/tb";

const FolderCreateButton = () => {
  const { setCreateFolder } = useTodoContext();
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => setCreateFolder((prev) => !prev)}
    >
      <TbFolderPlus width={"25px"} height={"25px"} />
    </Button>
  );
};

export default FolderCreateButton;
