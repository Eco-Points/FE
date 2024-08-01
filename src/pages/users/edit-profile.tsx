import { useEffect } from "react";
import Layout from "../../components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { EditProfileSchema, editProfileSchema } from "@/utils/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useToken } from "@/utils/contexts/token";
import { editProfile } from "@/utils/apis/users";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CustomFormField } from "@/components/custom-formfield";

const EditProfile = () => {
  const { user } = useToken();
  const navigate = useNavigate();

  const methods = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullname: user?.fullname ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
      image_url: new File([], ""),
    },
  });

  const { handleSubmit, setValue, control } = methods;

  useEffect(() => {
    setValue("fullname", user?.fullname ?? "");
    setValue("email", user?.email ?? "");
    setValue("phone", user?.phone ?? "");
    setValue("address", user?.address ?? "");
  }, [user, setValue]);

  async function onSubmit(data: EditProfileSchema) {
    try {
      console.log("Data before submission: ", data);
      const response = await editProfile(data);
      toast.success(response.message);
      navigate("/profile");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update profile. Please try again later.");
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("image_url", files[0]);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center my-2 mx-2 md:mx-auto md:my-6">
        <Card className="w-full max-w-[600px] p-2 sm:p-8" data-testid="edit-profile-card">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 font-bold" data-testid="edit-profile-title">
              Edit Profil
            </CardTitle>
            <CardDescription className="text-muted-foreground" data-testid="edit-profile-description">
              Perbarui informasi profilmu
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="edit-profile-form">
                <div className="grid gap-4">
                  <CustomFormField name="fullname" label="Nama Lengkap" control={control} data-testid="fullname-field">
                    {(field) => <Input {...field} placeholder="Masukkan nama lengkap" />}
                  </CustomFormField>
                  <CustomFormField name="email" label="Email" control={control} data-testid="email-field">
                    {(field) => <Input {...field} type="email" placeholder="Masukkan email" />}
                  </CustomFormField>
                  <CustomFormField name="phone" label="Nomor Telepon" control={control} data-testid="phone-field">
                    {(field) => <Input {...field} type="tel" placeholder="Masukkan nomor telepon" />}
                  </CustomFormField>
                  <CustomFormField name="address" label="Alamat" control={control} data-testid="address-field">
                    {(field) => <Textarea {...field} placeholder="Masukkan alamat" />}
                  </CustomFormField>
                </div>
                <CustomFormField
                  control={methods.control}
                  name="image_url"
                  label="Profile Picture"
                  description="Upload your profile picture"
                  data-testid="profile-picture-field"
                >
                  {(field) => (
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16" data-testid="profile-avatar">
                        <AvatarImage src={user?.image_url || "/placeholder-user.jpg"} />
                        <AvatarFallback>{user?.fullname?.[0] ?? "?"}</AvatarFallback>
                      </Avatar>
                      <Input
                        data-testid="input-profile-picture"
                        type="file"
                        disabled={false}
                        aria-disabled={false}
                        onChange={(e) => {
                          field.onChange(e.target.files ? e.target.files[0] : null);
                          handleFileChange(e);
                        }}
                      />
                    </div>
                  )}
                </CustomFormField>
                <CardFooter className="flex justify-end gap-2" data-testid="edit-profile-footer">
                  <Button variant="outline" type="button" onClick={() => navigate("/profile")} data-testid="cancel-button">
                    Batal
                  </Button>
                  <Button className="bg-[#00a65a] text-white hover:bg-[#008d4c]" type="submit" data-testid="save-button">
                    Simpan Perubahan
                  </Button>
                </CardFooter>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EditProfile;
