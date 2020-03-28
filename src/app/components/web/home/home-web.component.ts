import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {Product, ProductSearch} from "../../../model/product.model";
import {ProductService} from "../../../service/product.service";
import {CONSTANT_PATH, HIGHLIGHT} from "../../../comom/constant/base.constant";
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home-web.component.html',
    styleUrls: ['./home-web.component.scss'],
})
export class HomeWebComponent implements OnInit {
    images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
    productViews: Array<ProductView> = [];
    CONSTANT_PATH = CONSTANT_PATH;
    productHots: Product[] = [];
    productNews: Product[] = [];
    constructor(config: NgbCarouselConfig,
                public productService: ProductService,
                private route: ActivatedRoute,
    ) {
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
        config.pauseOnHover = false;
    }

    ngOnInit(): void {
        this.productViews = [];
        this.productViews.push({
            title: 'test',
            products: []
        })

        this.loadAll();
    }

    loadAll() {
        this.loadProductNew();
        this.loadProductHot();
    }

    loadProductNew() {
        this.productService.filter({
            limit: 20,
            page: 1
        }, {highlights: [HIGHLIGHT.NEW]}).subscribe(res => {
            this.productNews = res.body.data;
        });
    }

    loadProductHot() {
        this.productService.filter({
            limit: 20,
            page: 1
        }, {highlights: [HIGHLIGHT.NEW]}).subscribe(res => {
            this.productHots = res.body.data;
        });
    }

}

interface ProductView {
    title: string;
    products: Array<Product>;
}
