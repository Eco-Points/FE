import { Control, FieldValues, FieldPath, Controller } from "react-hook-form";
import { ReactNode } from "react";

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  description?: string;
  control: Control<T>;
}

interface ChildrenProps<T extends FieldValues> extends Props<T> {
  children: (field: { onChange: (value: any) => void; onBlur: () => void; value: any; name: string; ref: (instance: any) => void }) => ReactNode;
}

const CustomFormField = <T extends FieldValues>(props: ChildrenProps<T>) => {
  const { name, label, description, control, children } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { CustomFormField };
