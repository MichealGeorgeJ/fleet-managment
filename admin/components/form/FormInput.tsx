"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FormField } from "@/types/form";

interface FormInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function FormInput({
  field,
  value,
  error,
  onChange,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = field.type === "password";

  const inputType =
    isPassword && showPassword
      ? "text"
      : field.type;

  return (
    <div>
      <label
        htmlFor={field.id}
        className="
          mb-[7px]
          block
          text-[11px]
          font-semibold
          uppercase
          tracking-wide
          text-fleet-muted
        "
      >
        {field.label}
      </label>

      <div className={isPassword ? "relative" : undefined}>
        <input
          id={field.id}
          name={field.name}
          type={inputType}
          autoComplete={field.autoComplete}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`
            w-full
            border-b-[1.5px]
            bg-transparent
            px-0.5
            py-2
            text-[15px]
            text-fleet-primary
            outline-none
            transition-colors
            placeholder:text-fleet-muted
            focus:border-fleet-cyan
            ${
              isPassword
                ? "pr-[30px]"
                : ""
            }
            ${
              error
                ? "border-fleet-error"
                : "border-fleet-border"
            }
            ${field.className ?? ""}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword((value) => !value)
            }
            className="
              absolute
              right-0
              top-1/2
              flex
              -translate-y-1/2
              items-center
              justify-center
              p-1
              text-fleet-muted
              transition-colors
              hover:text-fleet-primary
            "
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-[11.5px] text-fleet-error-text">
          {error}
        </p>
      )}
    </div>
  );
}