import * as yup from "yup";
import type { TFunction } from "i18next";

export const createClientSchema = (t: TFunction) =>
  yup.object({
    nombre: yup
      .string()
      .trim()
      .required(t("clients.validation.name_required"))
      .max(50, t("clients.validation.name_max")),
    apellidos: yup
      .string()
      .trim()
      .required(t("clients.validation.lastname_required"))
      .max(100, t("clients.validation.lastname_max")),
    identificacion: yup
      .string()
      .trim()
      .required(t("clients.validation.id_required"))
      .max(20, t("clients.validation.id_max")),
    telefonoCelular: yup
      .string()
      .trim()
      .required(t("clients.validation.mobile_required"))
      .max(20, t("clients.validation.mobile_max")),
    otroTelefono: yup
      .string()
      .max(20, t("clients.validation.other_phone_max"))
      .default(""),
    direccion: yup
      .string()
      .trim()
      .required(t("clients.validation.address_required"))
      .max(200, t("clients.validation.address_max")),
    fNacimiento: yup
      .string()
      .required(t("clients.validation.birth_date_required")),
    fAfiliacion: yup
      .string()
      .required(t("clients.validation.affiliation_date_required")),
    sexo: yup.string().required(t("clients.validation.gender_required")),
    resenaPersonal: yup
      .string()
      .trim()
      .required(t("clients.validation.bio_required"))
      .max(200, t("clients.validation.bio_max")),
    imagen: yup.string().default(""),
    interesFK: yup
      .mixed<string | number>()
      .test(
        "is-selected",
        t("clients.validation.interests_required"),
        (val) => val !== "" && val != null,
      )
      .required(t("clients.validation.interests_required")),
  });
