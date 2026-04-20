// ── Auth ────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  username: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
  userid: number;
  username: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}

// ── Domain ───────────────────────────────────────────────────────────────────
export interface Interest {
  id: number;
  descripcion: string;
}

export interface Client {
  id: number;
  identificacion: string;
  nombre: string;
  apellidos: string;
  telefonoCelular?: string;
  celular?: string;
  otroTelefono?: string;
  direccion?: string;
  fNacimiento?: string;
  fAfiliacion?: string;
  sexo?: string;
  resenaPersonal?: string;
  resennaPersonal?: string;
  imagen?: string;
  interesesId?: number;
  interesFK?: number | string;
  usuarioId?: number;
}

export interface ClientFormValues {
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: string;
  resenaPersonal: string;
  imagen: string;
  interesFK: string | number;
}

export interface ClientFilters {
  identificacion?: string;
  nombre?: string;
  usuarioId?: number;
}

// ── Auth form values ─────────────────────────────────────────────────────────
export interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

// ── Shared ───────────────────────────────────────────────────────────────────
export type Severity = "success" | "error" | "warning" | "info";
export type FormErrors<T = Record<string, unknown>> = Partial<
  Record<keyof T, string | null>
>;
