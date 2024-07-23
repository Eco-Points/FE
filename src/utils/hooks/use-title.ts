import { useEffect } from "react";

function useTitle(newTitle: string) {
  const changeTitle = () => {
    document.title = newTitle;
  };

  useEffect(() => {
    document.title = newTitle ?? "Eco Points";
  }, [newTitle]);

  return changeTitle;
}

export default useTitle;
