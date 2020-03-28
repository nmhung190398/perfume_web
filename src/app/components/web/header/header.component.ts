import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../service/authentication.service';
import {CONSTANT_PATH} from './../../../comom/constant/base.constant';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../../../service/cart.service';
import {CategoryService} from '../../../service/category.service';
import {Category} from '../../../model/category.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    CONSTANT_PATH = CONSTANT_PATH
    userLogin: User;
    lengthCartItem = 0;
    categories: Array<Category>;

    constructor(private authenticationService: AuthenticationService, private cartService: CartService,
                private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(value => {
            if (value) {
                this.userLogin = value.user;
                this.cartService.findByUserLogin(this.userLogin.id).subscribe(res => {
                    console.log(res.body);
                });
            } else {
                this.userLogin = null;
            }
        });

        this.cartService.currentCart.subscribe(value => {
            if (value) {
                this.lengthCartItem = value.length;
            } else {
                this.lengthCartItem = 0;
            }
        });

        this.categoryService.filterAll().subscribe(res => {
            this.categories = res.body;
        });
    }

    logout() {
        this.authenticationService.logout();
    }

}
