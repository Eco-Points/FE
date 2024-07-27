import { FacebookIcon, InstagramIcon, LeafIcon, TwitterIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { registerSchema, RegisterSchema } from "@/utils/types/auth";
import { userRegister } from "@/utils/apis/auth";

export default function Register() {
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      repassword: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const response = await userRegister(data);
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-4 px-4 md:py-8">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <LeafIcon className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-green-700">EcoPoints</h1>
          </div>
          <p className="text-gray-500 mb-6">Silakan daftar untuk membuat akun baru.</p>
          <Form {...form}>
            <form data-testid="form-login" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField control={form.control} name="fullname" label="Nama Lengkap">
                {(field) => (
                  <Input
                    data-testid="input-full-name"
                    placeholder="John Doe"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="email" label="Email">
                {(field) => (
                  <Input
                    data-testid="input-email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="password" label="Password">
                {(field) => (
                  <Input
                    data-testid="input-password"
                    placeholder="Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="repassword" label="Konfirmasi Password">
                {(field) => (
                  <Input
                    data-testid="input-repassword"
                    placeholder="Konfirmasi Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <Button
                data-testid="btn-submit"
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                Buat Akun
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-green-500">
              Sudah punya akun?{" "}
              <Link to={"/login"} className="text-green-500 hover:text-green-600 font-medium">
                Masuk di sini.
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center text-gray-500">
            <p>&copy; 2023 EcoPoints. Ikuti kami di:</p>
            <div className="flex justify-center mt-2">
              <Link to={"/"} className="mx-2">
                <FacebookIcon className="w-5 h-5 text-green-500 hover:text-green-600" />
              </Link>
              <Link to={"/"} className="mx-2">
                <TwitterIcon className="w-5 h-5 text-green-500 hover:text-green-600" />
              </Link>
              <Link to={"/"} className="mx-2">
                <InstagramIcon className="w-5 h-5 text-green-500 hover:text-green-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
