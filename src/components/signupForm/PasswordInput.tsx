import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FormField } from "./FormField";

export function PasswordInput({ form }: { form: any }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <FormField
        form={form}
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        }
      />
      <FormField
        form={form}
        name="confirmPassword"
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm your password"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        }
      />
    </>
  );
}