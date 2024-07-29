import { Control, FieldValues, FieldPath, Controller } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ReactNode } from "react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";

import useController from "@/utils/hooks/useControler";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  description?: string;
  control: Control<T>;
}

interface ChildrenProps<T extends FieldValues> extends Props<T> {
  children: (field: { onChange: (value: any) => void; onBlur: () => void; value: any; name: string; ref: (instance: any) => void }) => ReactNode;
}

const CustomFormField = <T extends FieldValues>({ name, label, description, children }: ChildrenProps<T>) => {
  const control = useController();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormField
          name={name}
          render={() => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>{children(field)}</FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    />
  );
};

const CustomFormSelect = <T extends FieldValues>(props: {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options: { value: string | number; label: string }[];
  description?: string;
  control: Control<T>;
}) => {
  const { name, label, placeholder = "Pilih opsi", options, description, control } = props;

  return (
    <CustomFormField<T> name={name} label={label} description={description} control={control}>
      {(field) => (
        <Select onValueChange={(value) => field.onChange(value)} value={field.value as string}>
          <SelectTrigger>{field.value ? options.find((option) => option.value === field.value)?.label : placeholder}</SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </CustomFormField>
  );
};

const CustomFormDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { name, label, placeholder = "Pilih tanggal", description, control } = props;

  return (
    <CustomFormField<T> name={name} label={label} description={description} control={control}>
      {(field) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={`relative w-full h-12 pl-3 pr-10 justify-start ${!field.value ? "text-muted-foreground" : ""}`}>
              {field.value ? format(field.value, "dd MMM yyyy") : <span>{placeholder}</span>}
              <CalendarIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date("1900-01-01")} initialFocus />
          </PopoverContent>
        </Popover>
      )}
    </CustomFormField>
  );
};

export { CustomFormField, CustomFormSelect, CustomFormDatePicker };
