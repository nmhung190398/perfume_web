import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options, LabelType} from 'ng5-slider';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from "../../../../service/category.service";
import {ProducerService} from "../../../../service/producer.service";
import {Category} from "../../../../model/category.model";
import {Producer} from "../../../../model/producer.model";
import {ProductSearch} from "../../../../model/product.model";
import {OderBy} from "../../../../model/base-respone.model";

const FILTER_CONST = {
    minPrice: 0,
    maxPrice: 1000000,
}


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    @Input()
    test;

    oderBys: OderByView[] = [
        {
            label: 'Tất cả',
            value: null
        },
        {
            label: 'Giá giảm dần',
            value: {
                name: 'price',
                type: 'asc'
            }
        },
        {
            label: 'Giá tăng dần',
            value: {
                name: 'price',
                type: 'desc'
            }
        },
        {
            label: 'Bán chạy',
            value: {
                name: 'countCheckoutItem',
                type: 'desc'
            }
        }
    ]
    @Output()
    filter: EventEmitter<ProductSearch> = new EventEmitter<ProductSearch>();

    output: ProductSearch = {};

    filterFormGroup: FormGroup = this.fb.group({
        category: [],
        producer: [],
        oderBy: [null]
    });
    minPrice = FILTER_CONST.minPrice;
    maxPrice = FILTER_CONST.maxPrice;
    options: Options = {
        floor: FILTER_CONST.minPrice,
        ceil: FILTER_CONST.maxPrice,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '<b>Min price:</b>' + value + 'VNĐ';
                case LabelType.High:
                    return '<b>Max price:</b>' + value + 'VNĐ';
                default:
                    return value + 'VNĐ';
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
        this.output.oderBy = this.filterFormGroup.get("oderBy").value
        this.output.producerId = this.filterFormGroup.get("producer")?.value?.id;
        console.log(this.filterFormGroup.value);
        console.log(this.output);
        this.filter.emit(this.output);
    }

    clearFilter() {
        this.filter.emit({});
    }

}


export class OderByView {
    label: string;
    value: OderBy;
}
