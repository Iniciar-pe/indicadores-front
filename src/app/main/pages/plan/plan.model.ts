export class Plan {
  id_plan: number;
  descripcion: string;
  numero: number;
  precio: string;
  tipo: string;
  estado: string;
}

export class PlanRequest {
  status: string;
  plan: Plan;
}