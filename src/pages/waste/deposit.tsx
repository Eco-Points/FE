import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { CustomFormDatePicker, CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { depositSchema, DepositSchema } from "@/utils/types/admin-waste-deposit";
import { createDeposit } from "@/utils/apis/admin-waste-deposit";
import { LOCATION_OPTIONS, TRASH_OPTIONS } from "@/utils/const";

export default function WasteDeposit() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DepositSchema>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      trash_id: undefined,
      location_id: undefined,
      quantity: 0,
      date_time: new Date(),
    },
  });

  const onSubmit = async (data: DepositSchema) => {
    setIsSubmitting(true);
    try {
      await createDeposit(data);
      toast.success("Sampah berhasil disetor.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Gagal menyetor sampah.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto py-8 border shadow-md my-4 md:my-8 px-2 md:px-8 rounded-lg">
        <div className="text-start mb-6">
          <h1 className="text-2xl font-bold text-green-700">Setor Sampah</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <CustomFormField control={form.control} name="trash_id" label="Jenis Sampah">
                {(field) => (
                  <>
                    <Select value={field.value ? field.value.toString() : ""} onValueChange={(value) => field.onChange(Number(value))} disabled={isSubmitting}>
                      <SelectTrigger>{field.value ? TRASH_OPTIONS.find((option) => option.value === field.value)?.label : "Pilih Jenis Sampah"}</SelectTrigger>
                      <SelectContent>
                        {TRASH_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </CustomFormField>
            </div>
            <div>
              <CustomFormField control={form.control} name="quantity" label="Jumlah Satuan">
                {(field) => (
                  <>
                    <Input {...field} type="number" placeholder="Masukkan jumlah" disabled={isSubmitting} value={field.value ? field.value.toString() : ""} />
                  </>
                )}
              </CustomFormField>
            </div>
            <div>
              <CustomFormField control={form.control} name="location_id" label="Lokasi Penyetoran">
                {(field) => (
                  <>
                    <Select value={field.value ? field.value.toString() : ""} onValueChange={(value) => field.onChange(Number(value))} disabled={isSubmitting}>
                      <SelectTrigger>
                        {field.value ? LOCATION_OPTIONS.find((option) => option.value === field.value)?.label : "Pilih Lokasi Penyetoran"}
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </CustomFormField>
            </div>
            <div>
              <CustomFormDatePicker control={form.control} name="date_time" label="Tanggal dan Waktu" placeholder="Masukkan Tanggal Penyetoran" />
            </div>
            <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Setor"}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
