export interface Plan {
    id: number;
    description: string;
    image: string;
    name: string;
    type: number;
    period: Period[];
}

export interface Period {
    id: number;
    description: string;
    number: number;
    range: Range[];
}

export interface Range {
    id: number;
    end: number;
    prince: string;
    start: number;
}
