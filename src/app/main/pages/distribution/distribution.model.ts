export interface DistributionModel {
    avatar: string;
    business: number;
    default: string;
    description: string;
    email: string;
    id: number;
    name: string;
    status: string;
    type: string;
    user: string;
    lastName: string;
    group: number;
}

export interface Group {
    id: number;
    name: string;
    start: string;
    end: string;
    cant: number;
    number: number;
    plan: number;
    period: number;
}
