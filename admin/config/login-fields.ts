import { FormField } from "@/types/form";

export const LOGIN_FIELDS: FormField[] = [
  {
    id: "email",
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "email",
    required: true,
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    required: true,
  },
];