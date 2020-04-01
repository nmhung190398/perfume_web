export class Province {
    id?: number;
    name?: string;
    code?: string;
}

export class District {
    id?: number;
    name?: string;
    prefix?: string;
    provinceId?: number;
}

export class Ward {
    id?: number;
    name?: string;
    prefix?: string;
    districtId?: number;
}

