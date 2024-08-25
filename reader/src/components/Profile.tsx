import {ReactNode, useState} from "react";
import {Moon, Sun} from "../assets/Icons";
import useCurrentUser from "../hooks/useCurrentUser";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {PasswordField} from "./ui/FormFields";
import Button from "./ui/Button";
import {z} from "zod";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface DecodedToken {
  id: string;
  role: string;
  email: string;
  fullName: string;
  proExpiry?: Date;
  iat?: number;
  exp?: number;
  profileImageUrl: string;
}

const Profile = () => {
  const {theme, toggleTheme} = useTheme();
  const {profileImageUrl, email} = useCurrentUser() as DecodedToken;
  const isDark = theme === "dark";
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.error("You have been logged out!");
    navigate("/home");
  };

  return (
    <div className="relative size-10 h-full flex items-center group cursor-pointer">
      <div>
        <img
          className="size-10 rounded-full border border-secondary-foreground/50"
          src={`http://localhost:4000/${profileImageUrl}`}
          alt="Profile"
        />
      </div>

      {/* Dropdown Menu */}
      <div className="hidden min-w-[350px] group-hover:flex absolute flex-col border-2 border-secondary-foreground rounded-xl -translate-x-full left-full top-full backdrop-blur-sm bg-primary/10 overflow-hidden">
        <DropItem onClick={handleLogout}>
          <div className="w-full text-center text-red-500 font-bold">Logout</div>
        </DropItem>
        <DropItem>
          <div>{email}</div>
        </DropItem>
        {/* <DropItem onClick={() => navigate("/change-password")}> */}
        <DropItem>
          <ChangePassword />
        </DropItem>
        <DropItem>
          <div>Change Profile Picture</div>
        </DropItem>
        <DropItem>
          <div className="w-full group/theme flex items-center gap-4" onClick={toggleTheme}>
            {isDark ? <Moon className="size-8" /> : <Sun className="size-8" />}
            <div className="group-hover/theme:hidden">{theme.toLocaleUpperCase()} Mode</div>
            <div className="hidden group-hover/theme:block">Change Theme</div>
          </div>
        </DropItem>
      </div>
    </div>
  );
};

const DropItem = ({children, onClick}: {children: ReactNode; onClick?: () => void}) => {
  return (
    <div
      onClick={onClick}
      className="flex px-4 py-2 justify-start items-center bg-secondary/90 hover:bg-secondary border border-secondary-foreground/50"
    >
      {children}
    </div>
  );
};

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
}
const schema = z.object({
  oldPassword: z.string().min(4, {message: "Old password must be at least 4 characters."}),
  newPassword: z.string().min(4, {message: "New password must be at least 4 characters."}),
});

const ChangePassword = () => {
  const [show, setShow] = useState(false);

  const {authToken} = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/api/user/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
        reset();
        setShow(false);
      } else {
        toast.error(`Error: ${responseData.message}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div
        onClick={() => setShow(true)}
        className={show ? "text-blue-500" : "text-secondary-foreground"}
      >
        Change Password
      </div>
      {show && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <PasswordField
            registerProps={register("oldPassword")}
            label="Old Password"
            error={Boolean(errors.oldPassword)}
            helperText={errors.oldPassword?.message ?? ""}
          />
          <PasswordField
            registerProps={register("newPassword")}
            label="New Password"
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword?.message ?? ""}
          />
          <div className="flex justify-between mb-4">
            <Button variant="danger" label="Cancel" onClick={() => setShow(false)} />
            <Button variant="standard" label="Proceed" type="submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
