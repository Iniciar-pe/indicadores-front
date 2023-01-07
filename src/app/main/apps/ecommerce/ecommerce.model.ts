export interface Plan {
    id: number;
    description: string;
    image: string;
    name: string;
    type: number;
    isInCart?: boolean;
    period: Period[];
    mount?: number;
    selectedPeriod?: number;
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
    price: string;
    start: number;
}

