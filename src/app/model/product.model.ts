import {Category} from "./category.model";
import {Producer} from "./producer.model";
import {Fragrant} from "./fragrant.model";
import {Target} from "./target.model";
import {Amount} from "./amount.model";
import {Version} from "./version.model";


export class Product {
    id?: number;
    name?: string;
    code?: string;
    highlight?: Array<string>;
    MFG: any;
    EXP: any;
    image;
    description: any;
    category: Category;
    versions: Array<Version>;
    producer: Producer;
    amount: Amount;
    fragrant: Fragrant;
    targets: Array<Target>;
}
