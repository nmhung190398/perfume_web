import {Category} from "../../model/category.model";

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
