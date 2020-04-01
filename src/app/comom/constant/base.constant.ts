import {Category} from "../../model/category.model";

export const PAGING_PER_PAGE = [
    {label: 5, value: 5},
    {label: 10, value: 10},
    {label: 20, value: 20},
    {label: 50, value: 50},
    {label: 100, value: 100}];

export const CATEGORIES_DEFAUT: Array<Category> = [
    {
        id: 1,
        code: 'hot',
        name: 'Hàng Hot'
    },
    {
        id: 2,
        code: 'ban-chay',
        name: 'Bán Chạy'
    }
]

export const CONSTANT_PATH = {
    LIST_PRODUCT: 'products',
    DETAIL_PRODUCT: 'product',
    CHECKOUT: 'checkout',
    CART: 'cart',
    BLOG: 'blog',
    ABOUT: 'about',
    LOGIN: 'login',
    REGISTER: 'register',
    CONTACT: 'contact',
    HOME: 'home'
}

export const HIGHLIGHT = {
    HOT: 'HOT',
    NEW: 'NEW'
}

export class ResponData {
    status: number;
    msg: string;
    data: any;
}


