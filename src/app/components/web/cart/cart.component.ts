import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../../service/cart.service';
import {Cart} from '../../../model/cart.model';
import {ProductService} from '../../../service/product.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {User} from '../../../model/user';
import {SERVER_API_URL, SERVER_URL} from '../../../app.constants';
import {District, Province, Ward} from '../../../model/address.model';
import {AddressService} from '../../../service/address.service';
import validate = WebAssembly.validate;
import {CheckoutService} from "../../../service/checkout.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    checkoutForm: FormGroup;
    cartItems: Cart[] = [];
    userLogin: User;
    SERVER_URL = SERVER_URL;

    wards: Ward[] = [];
    districts: District[] = [];
    provinces: Province[] = [];
    coupon;

    constructor(private fb: FormBuilder, private cartService: CartService, private productService: ProductService,
                private authenticationService: AuthenticationService,
                private addressService: AddressService,
                private checkoutService: CheckoutService,
    ) {
    }

    ngOnInit(): void {
        this.userLogin = this.authenticationService.currentUserValue.user;
        console.log(this.userLogin);
        this.checkoutForm = this.fb.group({
            firstname: [this.userLogin?.firstname],
            lastname: [this.userLogin?.lastname],
            address: [this.userLogin?.address],
            email: [this.userLogin?.email],
            phone: [this.userLogin?.phone],
            coupon: [null],
            provinceId: [null],
            districtId: [null],
            wardId: [null]
        });
        console.log(this.checkoutForm.value);
        this.loadAll();
        this.loadProvinces();
    }

    loadProvinces() {
        this.addressService.findProvince().subscribe(res => {
            this.provinces = res.body;
        });
    }

    loadDistricts() {
        this.checkoutForm.get('districtId').setValue(null);
        this.checkoutForm.get('wardId').setValue(null);
        if (this.checkoutForm.get('provinceId').value) {
            this.addressService.findDistrict(this.checkoutForm.get('provinceId').value).subscribe(res => {
                this.districts = res.body;
            });
        }
    }

    loadWards() {
        this.checkoutForm.get('wardId').setValue(null);
        if (this.checkoutForm.get('districtId').value) {
            this.addressService.findWard(this.checkoutForm.get('districtId').value).subscribe(res => {
                this.wards = res.body;
            });
        }
    }


    loadAll() {
        this.cartService.filterAll({userId: this.userLogin.id}).subscribe(res => {
            this.cartItems = res.body;
            this.cartService.setCartItem(this.cartItems);
            this.cartService.setCartItem(this.cartItems);
            this.cartItems.forEach(value => {
                this.productService.filterAll({
                    versionId: value.version.id
                }).subscribe(resProduct => {
                    value.version.product = resProduct.body[0];
                });
            });
        });
    }

    removeCartItem(id) {
        this.cartService.delete(id).subscribe(res => {
            this.loadAll();
        });
    }

    getUrlBackground(image) {
        return `url(${this.SERVER_URL}/${image})`;
    }

    get subtotal() {
        let rs = 0;
        this.cartItems.forEach(item => {
            rs += item.version.price * item.quantity;
        });
        return rs;
    }

    get total() {
        const rs = this.subtotal;
        return rs;
    }

    addCheckout() {
        console.log(this.checkoutForm.value);
        this.checkoutService.create(this.checkoutForm.value).subscribe(res => {
            console.log(res.body);
            if (res.body.status === 200) {
                alert("Thành công");
                this.loadAll();
            } else {
                alert(res.body.msg);
            }
        });
    }

}
