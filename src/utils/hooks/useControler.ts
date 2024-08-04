import { useFormContext } from "react-hook-form";

const useController = () => {
  const { control } = useFormContext();
  return control;
};

export default useController;
