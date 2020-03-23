import {Component, OnInit} from '@angular/core';
import {CONSTANT_PATH} from "../../../comom/constant/base.constant";

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

    CONSTANT_PATH = CONSTANT_PATH;

    constructor() {
    }

    ngOnInit(): void {
    }

}
