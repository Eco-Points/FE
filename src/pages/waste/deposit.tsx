import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { CustomFormDatePicker, CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { depositSchema, DepositSchema } from "@/utils/types/admin-waste-deposit";
import { createDeposit } from "@/utils/apis/admin-waste-deposit";
import { IGetLocation } from "@/utils/types/waste-location";
import { getlocation } from "@/utils/apis/waste-location";
import { TRASH_OPTIONS } from "@/utils/const";

export default function WasteDeposit() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locations, setLocations] = useState<IGetLocation[]>([]);

  const form = useForm<DepositSchema>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      trash_id: undefined,
      location_id: undefined,
      quantity: 0,
      date_time: new Date(),
    },
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getlocation();
      setLocations(response || []);
    } catch (error) {
      toast.error("Gagal mengambil data lokasi.");
    }
  };

  const handleSubmit = async (data: DepositSchema) => {
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
      <div className="w-full max-w-md mx-auto py-8 border shadow-md my-4 md:my-8 px-2 md:px-8 rounded-lg" data-testid="waste-deposit-form-container">
        <h1 className="text-2xl font-bold text-green-700 mb-6" data-testid="form-title">
          Setor Sampah
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" data-testid="waste-deposit-form">
            <CustomFormField control={form.control} name="trash_id" label="Jenis Sampah">
              {(field) => (
                <Select
                  value={field.value?.toString() || ""}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={isSubmitting}
                  data-testid="select-trash-type"
                >
                  <SelectTrigger>{field.value ? TRASH_OPTIONS.find((option) => option.value === field.value)?.label : "Pilih Jenis Sampah"}</SelectTrigger>
                  <SelectContent>
                    {TRASH_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="quantity" label="Jumlah Satuan">
              {(field) => (
                <Input {...field} type="number" placeholder="Masukkan jumlah" disabled={isSubmitting} value={field.value || ""} data-testid="input-quantity" />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="location_id" label="Lokasi Penyetoran">
              {(field) => (
                <Select
                  value={field.value?.toString() || ""}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={isSubmitting}
                  data-testid="select-location"
                >
                  <SelectTrigger>
                    {field.value ? locations.find((option) => option.id === field.value)?.address || "Lokasi Tidak Diketahui" : "Pilih Lokasi Penyetoran"}
                  </SelectTrigger>
                  <SelectContent style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {locations.map((option) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CustomFormField>
            <CustomFormDatePicker
              control={form.control}
              name="date_time"
              label="Tanggal dan Waktu"
              placeholder="Masukkan Tanggal Penyetoran"
              data-testid="datepicker-date-time"
            />
            <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800" disabled={isSubmitting} data-testid="submit-button">
              {isSubmitting ? "Mengirim..." : "Setor"}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
