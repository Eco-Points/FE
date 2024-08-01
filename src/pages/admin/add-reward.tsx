import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomFormField } from "@/components/custom-formfield";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { addRewardSchema, AddRewardSchema } from "@/utils/types/rewards";
import { addReward } from "@/utils/apis/rewards";

export default function AddReward() {
  const navigate = useNavigate();

  const form = useForm<AddRewardSchema>({
    resolver: zodResolver(addRewardSchema),
    defaultValues: {
      name: "",
      description: "",
      image: new File([], ""),
      point_required: 0,
      stock: 0,
    },
  });

  async function onSubmit(data: AddRewardSchema) {
    try {
      const response = await addReward(data);
      toast.success(response.message);
      navigate("/admin/manage-rewards");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl" data-testid="add-reward-page">
        <div className="bg-background rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-green-700" data-testid="title">
                Tambah Hadiah Baru
              </h1>
              <p className="text-muted-foreground" data-testid="description">
                Tambahkan hadiah baru yang bisa ditukarkan dengan poin oleh pengguna.
              </p>
            </div>
            <Form {...form}>
              <form data-testid="form-add-rewards" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CustomFormField control={form.control} name="name" label="Nama Hadiah">
                  {(field) => (
                    <Input
                      data-testid="input-name"
                      placeholder="Masukkan nama hadiah"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="description" label="Deskripsi">
                  {(field) => (
                    <Textarea
                      data-testid="input-description"
                      placeholder="Masukkan deskripsi hadiah"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="point_required" label="Poin yang Dibutuhkan">
                  {(field) => (
                    <Input
                      data-testid="input-points"
                      placeholder="Masukkan jumlah poin"
                      type="number"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="stock" label="Stok">
                  {(field) => (
                    <Input
                      data-testid="input-stock"
                      placeholder="Masukkan jumlah stok"
                      type="number"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="image" label="Gambar Hadiah">
                  {(field) => (
                    <Input
                      data-testid="input-image"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      multiple={false}
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                    />
                  )}
                </CustomFormField>
                <div className="w-full flex gap-4 justify-end">
                  <Button variant="secondary" className="hover:bg-slate-300" data-testid="button-back">
                    <Link to="/admin/manage-rewards" data-testid="link-back">
                      Kembali
                    </Link>
                  </Button>
                  <Button
                    data-testid="btn-submit"
                    type="submit"
                    className="bg-green-700 hover:bg-green-800 text-white"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  >
                    Tambah hadiah
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
