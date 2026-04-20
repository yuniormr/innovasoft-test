import type { TFunction } from "i18next";
import type {
  LoginFormValues,
  RegisterFormValues,
  FormErrors,
} from "../../../types";

export const authValidators = {
  username(value: string, t: TFunction): string | null {
    if (!value || !value.trim()) return t("auth.validation.username_required");
    return null;
  },

  email(value: string, t: TFunction): string | null {
    if (!value || !value.trim()) return t("auth.validation.email_required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return t("auth.validation.email_invalid");
    return null;
  },

  password(value: string, t: TFunction): string | null {
    if (!value) return t("auth.validation.password_required");
    if (value.length < 8) return t("auth.validation.password_min");
    if (value.length > 20) return t("auth.validation.password_max");
    if (!/[A-Z]/.test(value)) return t("auth.validation.password_uppercase");
    if (!/[a-z]/.test(value)) return t("auth.validation.password_lowercase");
    if (!/\d/.test(value)) return t("auth.validation.password_number");
    return null;
  },

  validateLogin(
    values: LoginFormValues,
    t: TFunction,
  ): FormErrors<LoginFormValues> {
    const errors: FormErrors<LoginFormValues> = {};
    const usernameError = authValidators.username(values.username, t);
    const passwordError = authValidators.password(values.password, t);
    if (usernameError) errors.username = usernameError;
    if (passwordError) errors.password = passwordError;
    return errors;
  },

  validateRegister(
    values: RegisterFormValues,
    t: TFunction,
  ): FormErrors<RegisterFormValues> {
    const errors: FormErrors<RegisterFormValues> = {};
    const usernameError = authValidators.username(values.username, t);
    const emailError = authValidators.email(values.email, t);
    const passwordError = authValidators.password(values.password, t);
    if (usernameError) errors.username = usernameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    return errors;
  },
};
