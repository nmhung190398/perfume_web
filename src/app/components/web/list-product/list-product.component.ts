import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {IPaging, Paging} from '../../../model/base-respone.model';
import {CONSTANT_PATH} from '../../../comom/constant/base.constant';
import {Product, ProductSearch} from '../../../model/product.model';
import {ProductService} from '../../../service/product.service';
import {SERVER_API_URL, SERVER_URL} from '../../../app.constants';
import {CartService} from 'src/app/service/cart.service';
import {AuthenticationService} from 'src/app/service/authentication.service';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
    paging: IPaging;
    CONSTANT_PATH = CONSTANT_PATH;
    categoryCode;
    products: Array<Product>;
    SERVER_URL = SERVER_URL;
    quantity = 1;
    filterProduct: ProductSearch = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) {
        // this.categoryCode = this.activatedRoute.snapshot.paramMap.get('category');


        this.activatedRoute.paramMap.subscribe(param => {
            this.categoryCode = param.get('category');
            this.paging = new Paging();
            this.loadAll();
        });
    }

    ngOnInit(): void {

    }

    addCartItem(idVersion, buyNow = false) {
        if (idVersion) {
            if (this.authenticationService.currentUserValue) {
                const user = this.authenticationService.currentUserValue.user;
                this.cartService
                    .create({
                        user: user,
                        version: {
                            id: idVersion
                        }
                    })
                    .subscribe(res => {
                        this.cartService.findByUserLogin(user.id).subscribe(res1 => {

                        });
                        if (buyNow) {
                            this.router.navigate(['/cart']);
                        }
                    });
            } else {
                alert(' bạn chưa đăng nhập vui lòng đăng nhập ');
            }
        } else {
            alert(' Hết Hàng ');
        }
    }

    loadAll() {
        this.filterProduct.categoryCode = this.categoryCode;
        console.log(this.filterProduct);
        this.productService.filterAll(this.filterProduct).subscribe(res => {
            this.products = res.body;
        });
    }

    loadPage(page) {
        console.log(page);
    }

    filter($event) {
        this.filterProduct = $event;
        this.loadAll();
    }


}
