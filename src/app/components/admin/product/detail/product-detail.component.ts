import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    productId;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.productId = this.route.snapshot.paramMap.get('category');
    }

}
