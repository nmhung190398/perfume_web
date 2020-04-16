export const CHECKOUT_STATUS = {
    DELETED: 0,
    ACTIVE: 1,
    DELIVERY: 2,
    DONE: 3
}


export const CHECKOUT_ACCTION = {
    DELETED: 'deleted',
    ACTIVE: 'active',
    DELIVERY: 'delivery',
    DONE: 'done'
}

export const PAYMENT_METHOD = {
    COD: {
        label: 'Thanh toán khi giao hàng',
        value: 0
    },
    PAYPAL: {
        label: 'Paypal',
        value: 1
    }
}
