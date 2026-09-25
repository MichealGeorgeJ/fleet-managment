"use client";

import { FormInput } from "./FormInput";
import type { FormField } from "@/types/form";

interface DynamicFormProps {
  fields: FormField[];
  values: Record<string, string>;
  errors: Record<string, string | undefined>;
  onChange: (
    name: string,
    value: string
  ) => void;
}

export function DynamicForm({
  fields,
  values,
  errors,
  onChange,
}: DynamicFormProps) {
  return (
    <>
      {fields.map((field) => (
        <FormInput
          key={field.id}
          field={field}
          value={values[field.name] ?? ""}
          error={errors[field.name]}
          onChange={(value) =>
            onChange(field.name, value)
          }
        />
      ))}
    </>
  );
}