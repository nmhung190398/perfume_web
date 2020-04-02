import {User} from "./user";
import {Version} from "./version.model";

export class Checkout {
    id?: number;
    user?: User;
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    address?: string;
    paymentMethod?: number;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
    note?;
    status?;
    checkoutItems?: Array<any>;
    coupon?: any;
}
