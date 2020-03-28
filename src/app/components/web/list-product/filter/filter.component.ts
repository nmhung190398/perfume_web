import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options, LabelType} from 'ng5-slider';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from "../../../../service/category.service";
import {ProductService} from "../../../../service/product.service";
import {ProducerService} from "../../../../service/producer.service";
import {Category} from "../../../../model/category.model";
import {Producer} from "../../../../model/producer.model";
import {ProductSearch} from "../../../../model/product.model";

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

    @Output()
    filter: EventEmitter<ProductSearch> = new EventEmitter<ProductSearch>();

    output: ProductSearch = {};

    filterFormGroup: FormGroup = this.fb.group({
        category: [],
        producer: []
    });
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

    categories: Category[] = [];
    producers: Producer[] = [];

    constructor(private fb: FormBuilder,
                private categoryService: CategoryService,
                private producerService: ProducerService
    ) {
    }

    ngOnInit(): void {
        console.log(this.test);
        this.loadAll();
    }

    loadAll() {
        this.categoryService.filterAll().subscribe(res => {
            this.categories = res.body;
        });
        this.producerService.filterAll().subscribe(res => {
            this.producers = res.body;
        });
    }


    filterAction() {
        this.output.maxPrice = this.maxPrice;
        this.output.minPrice = this.minPrice;

        this.output.producerId = this.filterFormGroup.get("producer")?.value?.id;
        console.log(this.filterFormGroup.value);
        console.log(this.output);
        this.filter.emit(this.output);
    }

    clearFilter() {
        this.filter.emit({});
    }

}
