import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../service/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../../../../model/product.model";
import {Category} from "../../../../model/category.model";
import {Version} from "../../../../model/version.model";
import {Producer} from "../../../../model/producer.model";
import {Target} from "../../../../model/target.model";
import * as _ from 'lodash';
import {CategoryService} from "../../../../service/category.service";
import {TargetService} from "../../../../service/target.service";
import {ProducerService} from "../../../../service/producer.service";
import {xoaDau} from "./../../../../comom/utils/base.utils";

@Component({
    selector: 'app-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    productId;
    isUpdate: boolean;
    productFormGroup: FormGroup;
    product: Product;

    imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;
    categories: Array<Category>;
    producers: Array<Producer>;
    targets: Array<Target>;
    versions: Array<Version> = [];
    isHot = true;
    isNew = true;
    isCustomUri = true;
    versionFromGroup: FormGroup;

    constructor(private route: ActivatedRoute,
                public producerService: ProducerService,
                public categoryService: CategoryService,
                public targetService: TargetService,
                public productService: ProductService,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private fb: FormBuilder) {
        this.productFormGroup = this.initForm();
        this.versionFromGroup = this.fb.group({
            id: [null],
            name: [''],
            total: [0],
            price: [0]
        });
        if (!this.isUpdate && !this.isImageSaved) {
            this.imageError = "Chưa chọn ảnh";
        }

    }

    ngOnInit(): void {
        this.loadProperties();
        this.productId = this.route.snapshot.paramMap.get('id');
        this.isUpdate = this.productId !== null;
        if (this.isUpdate) {
            this.productService.find(this.productId).subscribe(res => {
                this.product = res.body;
                this.versions = this.product.versions;
                this.productFormGroup.setValue({
                    id: this.product.id,
                    name: this.product.name,
                    code: this.product.code,
                    highlights: this.product.highlights,
                    MFG: this.product.MFG,
                    EXP: this.product.EXP,
                    image: this.product.image,
                    description: this.product.description,
                    category: this.product.category,
                    versions: this.product.versions,
                    producer: this.product.producer,
                    amount: this.product.amount,
                    fragrant: this.product.fragrant,
                    targets: this.product.targets,
                    imageBase64: null
                });
            });
        }

    }

    loadProperties() {
        this.producerService.filterAll().subscribe(res => {
            this.producers = res.body;
            if (this.producers.length > 0 && !this.isUpdate) {
                this.productFormGroup.get("producer").setValue(this.producers[0]);
            }
        });

        this.categoryService.filterAll().subscribe(res => {
            this.categories = res.body;
            if (this.categories.length > 0 && !this.isUpdate) {
                this.productFormGroup.get("category").setValue(this.categories[0]);
            }
        });
        this.targetService.filterAll().subscribe(res => {
            this.targets = res.body;
        });
    }

    initForm() {
        return this.fb.group({
            id: [],
            name: [null, [Validators.required]],
            code: [null, [Validators.required]],
            highlights: ['', []],
            MFG: [null],
            EXP: [null],
            image: [null],
            description: [null, [Validators.required]],
            category: [null, [Validators.required]],
            versions: [null, []],
            producer: [null, [Validators.required]],
            amount: [null, []],
            fragrant: [null, []],
            targets: [null, [Validators.required]],
            imageBase64: []
        });
    }

    fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 1000;
            const max_width = 1000;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    console.log(img_height, img_width);


                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                        // console.log(this.cardImageBase64);
                        // this.previewImagePath = imgBase64Path;
                    }
                };
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
    }

    save() {
        console.log("click");
        const tmp: Product = this.productFormGroup.value;
        tmp.versions = this.versions;
        tmp.highlights = [];
        console.log({
            new: this.isNew,
            hot: this.isHot
        })
        if (this.isNew) {
            tmp.highlights.push("NEW");
        }
        if (this.isHot) {
            tmp.highlights.push("HOT");
        }
        if (this.isImageSaved) {
            tmp.imageBase64 = this.cardImageBase64;
        }
        console.log(tmp);
        this.productService.create(tmp).subscribe(res => {
            if (res.status === 200) {
                //chuyển hướng
                this.router.navigate(['/admin/product']);
            } else {
                console.log("error");
            }
        });

    }

    addVersion() {
        this.versions.push(this.versionFromGroup.value);
    }

    removeVersion(index) {
        // console.log(index);
        this.versions.splice(index, 1);
    }

    changeHot($event) {
        this.isHot = $event.target.checked;
    }

    changeNew($event) {
        this.isNew = $event.target.checked;
    }

    changeCustomUri($event) {
        this.isCustomUri = $event.target.checked;
    }

    focusoutName() {
        if (this.isCustomUri) {
            const name: string = this.productFormGroup.get("name").value;
            this.productFormGroup.get("code").setValue(xoaDau(name));
        }
    }

    isSave() {
        const tmp = !this.productFormGroup.invalid && (this.isUpdate ? true : this.isImageSaved) && (this.versions.length > 0);
        return tmp;
    }


}
