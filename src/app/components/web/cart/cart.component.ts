import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    checkoutForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.checkoutForm = this.formBuilder.group({
            firstname: [],
            lastname: [],
            country: [],
            streetaddress: []
        });
    }

}
