import {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import Button from "../../components/ui/Button";
import {PasswordField, TextField} from "../../components/ui/FormFields";
import useTheme from "../../hooks/useTheme";
import {useNavigate} from "react-router-dom";
import api from "../../utils/api";
import useAuth from "../../hooks/useAuth";

// Schema for form validation using Zod
const schema = z.object({
  email: z.string().email({message: "Please enter a valid email address."}),
  password: z.string().min(4, {message: "Password must be at least 4 characters."}),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(false);
  const {login} = useAuth(); // Destructure setAuthToken from context

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(api.adminLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        login(responseData.token); // Store the token in context
        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="backdrop-blur-[7px] w-full px-8 py-10 flex flex-col items-center justify-center max-w-[450px] border-2 border-secondary-foreground/50 rounded-lg m-auto mt-32 bg-secondary/35">
        <div className="text-4xl font-bold mb-5">Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <TextField
            label="Email"
            type="text"
            registerProps={{...register("email")}}
            error={Boolean(errors.email)}
            helperText={errors.email?.message ?? ""}
          />
          <PasswordField
            label="Password"
            registerProps={{...register("password")}}
            error={Boolean(errors.password)}
            helperText={errors.password?.message ?? ""}
          />

          <div className="flex flex-col mb-4 items-center">
            <div>Don't have an account?</div>
            <div
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register here
            </div>
          </div>
          <Button variant="standard" type="submit" label={loading ? "Logging in..." : "Login"} />
        </form>
      </div>
      <div
        className="fixed w-screen h-screen inset-0 -z-50"
        style={{
          backgroundImage:
            theme === "dark"
              ? "url(http://localhost:4000/uploads/assets/lib-wall-2.jpg)"
              : "url(http://localhost:4000/uploads/assets/lib-wall-light.jpg)",
        }}
      ></div>
    </>
  );
};

export default Login;
