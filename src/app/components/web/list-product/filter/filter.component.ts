import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options, LabelType} from 'ng5-slider';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from '../../../../service/category.service';
import {ProducerService} from '../../../../service/producer.service';
import {Category} from '../../../../model/category.model';
import {Producer} from '../../../../model/producer.model';
import {ProductSearch} from '../../../../model/product.model';
import {OderBy} from '../../../../model/base-respone.model';
import {AmountService} from '../../../../service/amount.service';
import {FragrantService} from '../../../../service/fragrant.service';
import {Fragrant} from '../../../../model/fragrant.model';
import {Amount} from '../../../../model/amount.model';

const FILTER_CONST = {
    minPrice: 0,
    maxPrice: 1000000,
};


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
            name: 'Tất cả',
            value: null
        },
        {
            name: 'Giá giảm dần',
            value: {
                name: 'price',
                type: 'asc'
            }
        },
        {
            name: 'Giá tăng dần',
            value: {
                name: 'price',
                type: 'desc'
            }
        },
        {
            name: 'Bán chạy',
            value: {
                name: 'countCheckoutItem',
                type: 'desc'
            }
        }
    ];
    @Output()
    filter: EventEmitter<ProductSearch> = new EventEmitter<ProductSearch>();

    output: ProductSearch = {};

    filterFormGroup: FormGroup = this.fb.group({
        category: [null],
        producer: [null],
        amount: [null],
        fragrant: [null],
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
    fragrants: Fragrant[] = [];
    amounts: Amount[] = [];

    constructor(private fb: FormBuilder,
                private categoryService: CategoryService,
                private producerService: ProducerService,
                private amountService: AmountService,
                private fragrantService: FragrantService,
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
        this.amountService.filterAll().subscribe(res => {
            this.amounts = res.body;
        });
        this.fragrantService.filterAll().subscribe(res => {
            this.fragrants = res.body;
        });
    }


    filterAction() {
        this.output.maxPrice = this.maxPrice;
        this.output.minPrice = this.minPrice;
        this.output.oderBy = this.filterFormGroup.get('oderBy').value;
        this.output.producerId = this.filterFormGroup.get('producer')?.value?.id;
        console.log(this.filterFormGroup.value);
        console.log(this.output);
        this.filter.emit(this.output);
    }

    clearFilter() {
        Object.keys(this.filterFormGroupValue).forEach(key => {
            this.filterFormGroup.get(key).setValue(null);
        });
        this.clearFilterPrice();
        this.filter.emit({});
    }

    get filterFormGroupValue() {
        return this.filterFormGroup.value;
    }

    get isFilterPrice() {
        return this.maxPrice !== FILTER_CONST.maxPrice || this.minPrice !== FILTER_CONST.minPrice;
    }

    clearFilterPrice() {
        this.maxPrice = FILTER_CONST.maxPrice;
        this.minPrice = FILTER_CONST.minPrice;
    }

    cleanFilterForm(key) {
        this.filterFormGroup.get(key).setValue(null);
    }

}


export class OderByView {
    name: string;
    value: OderBy;
}
