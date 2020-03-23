import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPaging, Paging} from "../../../model/base-respone.model";
import {CONSTANT_PATH} from "../../../comom/constant/base.constant";

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
    paging: IPaging;
    CONSTANT_PATH = CONSTANT_PATH;
    categoryCode;

    constructor(private route: ActivatedRoute) {
        this.categoryCode = this.route.snapshot.paramMap.get('category');
        this.paging = new Paging();
    }

    ngOnInit(): void {

    }

    loadPage(page) {
        console.log(page);
    }

}
