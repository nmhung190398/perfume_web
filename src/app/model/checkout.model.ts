import {User} from "./user";

export class Checkout {
    id?: number;
    user?: User;
    phone?: string;
    email?: string;
    paymentMethod?: number;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
    checkoutItems?: Array<any>;
    coupon?: any;
}
