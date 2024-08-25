import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../components/ui/Button";
import {PasswordField} from "../components/ui/FormFields";
import useMutation from "../hooks/useMutation";
import api from "../utils/api";
import {SubmitHandler, useForm} from "react-hook-form";

// Validation schema using Zod
const schema = z.object({
  oldPassword: z.string().min(4, {message: "Old password must be at least 4 characters."}),
  newPassword: z.string().min(4, {message: "New password must be at least 4 characters."}),
});

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const {mutate, loading} = useMutation<
    ChangePasswordFormValues,
    {message: string; token?: string}
  >(api.changePassword);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    try {
      const responseData = await mutate(data);
      if (responseData) {
        toast.success(responseData.message);
        if (responseData.token) {
          // Handle the new token if needed, e.g., update auth context
        }
        onCancel(); // Close the form after successful password change
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="backdrop-blur-[7px] w-full px-8 py-10 flex flex-col items-center justify-center max-w-[450px] border-2 border-secondary-foreground/50 rounded-lg m-auto mt-4 bg-secondary/35">
      <div className="text-4xl font-bold mb-5">Change Password</div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <PasswordField
          label="Old Password"
          registerProps={{...register("oldPassword")}}
          error={Boolean(errors.oldPassword)}
          helperText={errors.oldPassword?.message ?? ""}
        />
        <PasswordField
          label="New Password"
          registerProps={{...register("newPassword")}}
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword?.message ?? ""}
        />
        <div className="flex gap-4">
          <Button
            variant="standard"
            type="submit"
            label={loading ? "Changing Password..." : "Change Password"}
          />
          <Button variant="danger" type="button" onClick={onCancel} label="Cancel" />
        </div>
      </form>
    </div>
  );
};
