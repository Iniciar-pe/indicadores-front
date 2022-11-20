export interface Template {
    id_plantilla: number;
    descripcion:  string;
    nombre_documento: string; 
    estado: string;
}

export interface TemplateRequest {
    status: string;
    template: Template
}