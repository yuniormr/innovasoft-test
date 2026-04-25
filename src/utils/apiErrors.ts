/**
 * Parsea los errores de validación 422 de FastAPI/Pydantic.
 *
 * El backend retorna keys de traducción cortas en el msg:
 * { "detail": [{ "loc": ["body", "apellidos"], "msg": "Value error, name_only_letters", "type": "value_error" }] }
 *
 * Retorna un mapa { campoFormulario: claveI18n } o null si no es un error de validación.
 * Las claves siguen el formato "server_validation.<slug>" para usarse con t().
 */

// Campos del API que tienen nombre distinto al del formulario
const API_TO_FORM_FIELD: Record<string, string> = {
  telefonoCelular: "celular", // Create usa telefonoCelular, el form usa celular
  resennaPersonal: "resenaPersonal", // Update usa resennaPersonal, el form usa resenaPersonal
};

// Tipos built-in de Pydantic que no pasan por @field_validator
const PYDANTIC_TYPE_TO_KEY: Record<string, string> = {
  string_too_short: "server_validation.string_too_short",
  string_too_long: "server_validation.string_too_long",
  missing: "server_validation.required",
  literal_error: "server_validation.gender_invalid",
  string_type: "server_validation.required",
};

export type ServerFieldErrors = Record<string, string>;

/**
 * Convierte la respuesta 422 de FastAPI en un mapa { field: i18nKey }.
 * Las claves devueltas deben pasarse por t() antes de mostrarlas al usuario.
 */
export function parseValidationErrors(
  error: unknown,
): ServerFieldErrors | null {
  const detail = (error as any)?.response?.data?.detail;
  if (!Array.isArray(detail) || detail.length === 0) return null;

  const fieldErrors: ServerFieldErrors = {};

  for (const err of detail) {
    const loc: string[] = err.loc ?? [];
    // loc = ["body", "fieldName"] — tomamos el último segmento
    const rawField = loc[loc.length - 1];
    if (!rawField || typeof rawField !== "string") continue;

    const formField = API_TO_FORM_FIELD[rawField] ?? rawField;

    const type = String(err.type ?? "");
    const rawMsg = String(err.msg ?? "");

    let translationKey: string;

    if (type === "value_error") {
      // El backend envía: "Value error, <slug>"  →  extraemos el slug
      const slug = rawMsg.replace(/^Value error,\s*/i, "");
      translationKey = `server_validation.${slug}`;
    } else if (PYDANTIC_TYPE_TO_KEY[type]) {
      translationKey = PYDANTIC_TYPE_TO_KEY[type];
    } else {
      // Fallback: mensaje raw (no debería ocurrir con el backend bien configurado)
      translationKey = rawMsg.replace(/^Value error,\s*/i, "");
    }

    if (!fieldErrors[formField]) {
      fieldErrors[formField] = translationKey;
    }
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
}
