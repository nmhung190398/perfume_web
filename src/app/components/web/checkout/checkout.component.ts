import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
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
