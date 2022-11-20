export interface UserRespose {
    id_usuario?: number;
    usuario?: string;
    email?: string;
    nombres?: string;
    apellidos?: string;
    movil?: string;
    sexo?: string;
    direccion?: string;
    ubi_codigo?: string;
    fecha_nacimiento?: string;
    fecha_registro?: string;
    foto?: string;
    tipo?: string;
    estado?: string;
    id_empresa?: number;
    empresa_nombre?: string;
    default?: string;
    pais?: string;
    ciudad?: string;
    codigo?: string;
}

export interface PasswordResponse {
    passwordPrevious?: string;
    password?: string;
    confirmPassword?: string;
}