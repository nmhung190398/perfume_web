import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPaging, Paging} from '../../../model/base-respone.model';
import {CONSTANT_PATH} from '../../../comom/constant/base.constant';
import {Product} from "../../../model/product.model";
import {ProductService} from "../../../service/product.service";
import {SERVER_API_URL, SERVER_URL} from "../../../app.constants";


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

    constructor(private route: ActivatedRoute, private productService: ProductService) {
        this.categoryCode = this.route.snapshot.paramMap.get('category');
        this.paging = new Paging();
    }

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll() {
        this.productService.filterAll().subscribe(res => {
            this.products = res.body.map(item => {
                item.image = SERVER_URL + item.image;
                return item;
            });
        });
    }

    loadPage(page) {
        console.log(page);
    }

}
