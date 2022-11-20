import { Template } from "../plantilla/template.model";

export interface Rubro {
    "descripcion": string;
    "estado": string;
    "id_rubro": number;
    "nemonico": string;
    'edita_pp': string;
    'edita_pa': string;
    'nota': string;
}

export interface RubroRequest {
    "entry": Rubro[];
    "status": string;
    "template": Template;
}

export interface Indicator {
    "id_indicador": number;
    "nombre": string;
    "descripcion": string;
    "tipo": string;
    "formula": string;
    "publico": string;
    "id_plantilla": string;
    "orden": string;
    "expresado": string;
    "estado": string;
    'icono': string;
}

export interface IndicatorRequest {
    "indicator": Indicator[];
    "status": string;
}