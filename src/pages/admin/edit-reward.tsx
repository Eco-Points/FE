import { Link, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomFormField } from "@/components/custom-formfield";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { editRewardSchema, EditRewardSchema, IReward } from "@/utils/types/rewards";
import { getRewards, updateReward } from "@/utils/apis/rewards";

export default function EditReward() {
  const [data, setData] = useState<IReward[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<EditRewardSchema>({
    resolver: zodResolver(editRewardSchema),
    defaultValues: {
      name: "",
      description: "",
      image: new File([], ""),
      point_required: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const reward = data.find((reward) => reward.reward_id === Number(params.reward_id));
    if (reward) {
      form.setValue("name", reward.name);
      form.setValue("description", reward.description);
      form.setValue("point_required", reward.point_required);
      form.setValue("stock", reward.stock);
    }
  }, [data, params.reward_id]);

  async function onSubmit(data: EditRewardSchema) {
    try {
      const response = await updateReward(Number(params.reward_id), data);
      toast.success(response.message);
      navigate("/admin/manage-rewards");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function fetchData() {
    try {
      const response = await getRewards();
      setData(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-background rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-green-700" data-testid="page-title">
                Edit Hadiah
              </h1>
            </div>
            <Form {...form}>
              <form data-testid="form-edit-rewards" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      data-testid="button-back"
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
                  <Button variant={"secondary"} className="hover:bg-slate-300">
                    <Link to="/admin/manage-rewards" data-testid="button-back">
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
                    Simpan hadiah
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
