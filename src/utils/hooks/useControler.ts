// useController.ts
import { useFormContext } from "react-hook-form";

const useController = () => {
  const { control } = useFormContext(); // Menggunakan useFormContext untuk akses control
  return control;
};

export default useController;
