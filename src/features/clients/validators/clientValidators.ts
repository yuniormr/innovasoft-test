import type { TFunction } from "i18next";
import type { ClientFormValues, FormErrors } from "../../../types";

export const clientValidators = {
  validate(
    values: ClientFormValues,
    t: TFunction,
  ): FormErrors<ClientFormValues> {
    const errors: FormErrors<ClientFormValues> = {};
    const v = values;

    if (!v.nombre || !v.nombre.trim())
      errors.nombre = t("clients.validation.name_required");
    else if (v.nombre.length > 50)
      errors.nombre = t("clients.validation.name_max");

    if (!v.apellidos || !v.apellidos.trim())
      errors.apellidos = t("clients.validation.lastname_required");
    else if (v.apellidos.length > 100)
      errors.apellidos = t("clients.validation.lastname_max");

    if (!v.identificacion || !v.identificacion.trim())
      errors.identificacion = t("clients.validation.id_required");
    else if (v.identificacion.length > 20)
      errors.identificacion = t("clients.validation.id_max");

    if (!v.celular || !v.celular.trim())
      errors.celular = t("clients.validation.mobile_required");
    else if (v.celular.length > 20)
      errors.celular = t("clients.validation.mobile_max");

    if (v.otroTelefono && v.otroTelefono.length > 20)
      errors.otroTelefono = t("clients.validation.other_phone_max");

    if (!v.direccion || !v.direccion.trim())
      errors.direccion = t("clients.validation.address_required");
    else if (v.direccion.length > 200)
      errors.direccion = t("clients.validation.address_max");

    if (!v.fNacimiento)
      errors.fNacimiento = t("clients.validation.birth_date_required");

    if (!v.fAfiliacion)
      errors.fAfiliacion = t("clients.validation.affiliation_date_required");

    if (!v.sexo) errors.sexo = t("clients.validation.gender_required");

    if (!v.resenaPersonal || !v.resenaPersonal.trim())
      errors.resenaPersonal = t("clients.validation.bio_required");
    else if (v.resenaPersonal.length > 200)
      errors.resenaPersonal = t("clients.validation.bio_max");

    if (!v.interesFK)
      errors.interesFK = t("clients.validation.interests_required");

    return errors;
  },
};
