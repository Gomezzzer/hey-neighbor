import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "outline" | "filled";
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = "default",
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      <div className="relative">
        <input
          className={`w-full rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 border ${
            variant === "outline" ? "border-gray-300" : "border-transparent bg-gray-100"
          } ${
            variant === "filled" ? "bg-gray-100" : ""
          } ${className}`}
          {...props}
        />
        {icon && <div className="absolute inset-y-0 right-3 flex items-center">{icon}</div>}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
