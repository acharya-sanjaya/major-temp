import React, {useState} from "react";
import {cn} from "../../utils/cn";
import {PasswordEye} from "../../assets/Icons";

interface TextFieldProps {
  label: string;
  type?: "text" | "number" | "email";
  registerProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: boolean;
  helperText?: string;
}

export const TextField = ({
  label,
  type = "text",
  registerProps,
  error,
  helperText,
}: TextFieldProps) => (
  <div className="mb-5 w-full">
    <label
      className={cn("font-bold text-lg", error ? "text-red-500" : "text-secondary-foreground")}
    >
      {label}
    </label>
    <input
      className={cn(
        "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 bg-secondary/60 text-secondary-foreground transition-colors",
        error ? "border-red-500" : "border-secondary-foreground"
      )}
      type={type}
      {...registerProps}
    />
    {helperText && <p className="mt-1 text-red-500 text-sm">{helperText}</p>}
  </div>
);

interface PasswordFieldProps {
  label: string;
  registerProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: boolean;
  helperText?: string;
}

export const PasswordField = ({label, registerProps, error, helperText}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-5 w-full">
      <label
        className={cn("font-bold text-lg", error ? "text-red-500" : "text-secondary-foreground")}
      >
        {label}
      </label>
      <div className="relative w-full mt-2">
        <input
          className={cn(
            "w-full h-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:border-blue-500 bg-secondary/60 text-secondary-foreground transition-colors",
            error ? "border-red-500" : "border-secondary-foreground"
          )}
          type={showPassword ? "text" : "password"}
          {...registerProps}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 h-full flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <PasswordEye closed={!showPassword} className="size-7" thickness={1} />
        </div>
      </div>
      {helperText && <p className="mt-1 text-red-500 text-sm">{helperText}</p>}
    </div>
  );
};

interface SwitchFieldProps {
  label: string;
  registerProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: boolean;
  helperText?: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  registerProps,
  error,
  helperText,
}) => (
  <div className="mb-5 flex items-center">
    <label className={error ? "text-red-500" : "text-secondary-foreground"}>{label}</label>
    <input type="checkbox" className="sr-only peer" {...registerProps} />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-500 transition-colors duration-200 ease-in-out relative">
      <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full transform peer-checked:translate-x-full transition-transform duration-200 ease-in-out"></div>
    </div>
    {helperText && <p className="mt-1 text-red-500 text-sm">{helperText}</p>}
  </div>
);

interface FileInputFieldProps {
  label: string;
  registerProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: boolean;
  helperText?: string;
  accept?: string;
}

export const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  registerProps,
  error,
  helperText,
  accept,
}) => (
  <div className="mb-5">
    <label className={error ? "text-red-500" : "text-secondary-foreground"}>{label}</label>
    <input
      type="file"
      className={cn(
        "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 bg-secondary text-secondary-foreground transition-colors",
        error ? "border-red-500" : "border-secondary-foreground"
      )}
      accept={accept}
      {...registerProps}
    />
    {helperText && <p className="mt-1 text-red-500 text-sm">{helperText}</p>}
  </div>
);
