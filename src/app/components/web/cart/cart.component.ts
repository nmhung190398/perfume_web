import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../../service/cart.service";
import {Cart} from "../../../model/cart.model";
import {ProductService} from "../../../service/product.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {User} from "../../../model/user";
import {SERVER_API_URL, SERVER_URL} from '../../../app.constants';

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

    constructor(private formBuilder: FormBuilder, private cartService: CartService, private productService: ProductService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.userLogin = this.authenticationService.currentUserValue.user;
        this.checkoutForm = this.formBuilder.group({
            firstname: [],
            lastname: [],
            country: [],
            streetaddress: []
        });
        this.loadAll();
    }


    loadAll() {
        this.cartService.filterAll({userId: this.userLogin.id}).subscribe(res => {
            this.cartItems = res.body;
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

}
