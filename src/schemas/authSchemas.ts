import * as yup from "yup";
import type { TFunction } from "i18next";

export const createLoginSchema = (t: TFunction) =>
  yup.object({
    username: yup
      .string()
      .trim()
      .required(t("auth.validation.username_required")),
    password: yup
      .string()
      .required(t("auth.validation.password_required"))
      .min(8, t("auth.validation.password_min"))
      .max(20, t("auth.validation.password_max"))
      .matches(/[A-Z]/, t("auth.validation.password_uppercase"))
      .matches(/[a-z]/, t("auth.validation.password_lowercase"))
      .matches(/\d/, t("auth.validation.password_number")),
    rememberMe: yup.boolean().default(false),
  });

export const createRegisterSchema = (t: TFunction) =>
  yup.object({
    username: yup
      .string()
      .trim()
      .required(t("auth.validation.username_required")),
    email: yup
      .string()
      .trim()
      .required(t("auth.validation.email_required"))
      .email(t("auth.validation.email_invalid")),
    password: yup
      .string()
      .required(t("auth.validation.password_required"))
      .min(6, t("auth.validation.password_min"))
      .max(20, t("auth.validation.password_max"))
      .matches(/[A-Z]/, t("auth.validation.password_uppercase"))
      .matches(/[a-z]/, t("auth.validation.password_lowercase"))
      .matches(/\d/, t("auth.validation.password_number"))
      .matches(/[^A-Za-z0-9]/, t("auth.validation.password_special")),
  });
