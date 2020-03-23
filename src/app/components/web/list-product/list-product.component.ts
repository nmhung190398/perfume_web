import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPaging, Paging} from "../../../model/base-respone.model";

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
    paging: IPaging;

    constructor(private route: ActivatedRoute) {
        console.log(this.route.snapshot.paramMap.get('category'));
        this.paging = new Paging();
    }

    ngOnInit(): void {
    }

    loadPage(page) {
        console.log(page);
    }

}
