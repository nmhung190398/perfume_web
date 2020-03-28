import {Component, Input, OnInit} from '@angular/core';
import {Options, LabelType} from 'ng5-slider';
import {FormBuilder, FormGroup} from '@angular/forms';

const FILTER_CONST = {
    minPrice: 0,
    maxPrice: 1000,
}

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    @Input()
    test;

    filterFormGroup: FormGroup;
    minPrice = FILTER_CONST.minPrice;
    maxPrice = FILTER_CONST.maxPrice;
    options: Options = {
        floor: FILTER_CONST.minPrice,
        ceil: FILTER_CONST.maxPrice,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '<b>Min price:</b> $' + value;
                case LabelType.High:
                    return '<b>Max price:</b> $' + value;
                default:
                    return '$' + value;
            }
        }
    };

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        console.log(this.test);
        this.initFilterForm();
    }

    initFilterForm() {

        this.filterFormGroup = this.fb.group({
            minPrice: [FILTER_CONST.minPrice],
            maxPrice: [FILTER_CONST.maxPrice]
        });
    }

}
