import {Component, OnInit} from '@angular/core';
import {Checkout} from '../../../model/checkout.model';
import {IPaging, Paging} from '../../../model/base-respone.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PAGING_PER_PAGE} from '../../../comom/constant/base.constant';
import {CheckoutService} from '../../../service/checkout.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {xoaDau} from '../../../comom/utils/base.utils';
import {CHECKOUT_STATUS, PAYMENT_METHOD} from '../../../comom/constant/checkout.constant';
import {__param} from 'tslib';
import {AddressService} from "../../../service/address.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    checkouts: Checkout[] = [];
    paging: IPaging = new Paging();
    checkoutFormGroup: FormGroup;
    selectedCheckout: Checkout;
    txtSearch: string;
    limits = PAGING_PER_PAGE;
    isAcction = true;
    isCustomUri = true;
    checkoutStatus: number;
    nodeDelete;

    constructor(public checkoutService: CheckoutService,
                protected router: Router,
                protected activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private addressService: AddressService,
                private fb: FormBuilder) {
        // this.activatedRoute.snapshot.paramMap.
        // router.events.subscribe(value => {
        //     this.checkoutStatus = this.getStatus(this.activatedRoute.snapshot.paramMap.get('status'));
        //     console.log(this.checkoutStatus);
        // });
        this.activatedRoute.paramMap.subscribe(param => {
            this.checkoutStatus = this.getStatus(param.get('status'));
            if (this.checkoutStatus === null) {
                this.router.navigate(['/404']);
            } else {
                this.loadAll();
            }
        });
    }

    getStatus(statusName: string) {
        let rs = null;
        const keys = Object.keys(CHECKOUT_STATUS);
        keys.some(value => {
            if (value.toLowerCase() === statusName) {
                rs = CHECKOUT_STATUS[value];
                return true;
            }
        })

        return rs;
    }


    ngOnInit(): void {
        this.initTable();
    }


    initTable() {
        this.checkoutFormGroup = this.initForm();
    }

    initForm() {
        return this.fb.group({
            id: [],
            name: ['', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20)]
            ],
            code: ['', [Validators.required, Validators.minLength(8),
                Validators.required, Validators.maxLength(30)
            ]
            ],
            isUpdate: [true],
            isShow: [false]
        });
    }

    search() {
        this.paging.page = 1;
        this.loadAll();
    }

    loadAll() {
        console.log('loadAll');
        // const parameters = {
        //     page: this.paging.page,
        //     limit: this.paging.limit
        // };
        const checkout: Checkout = {};
        checkout.status = this.checkoutStatus;
        this.checkoutService.filter(this.paging, checkout).subscribe(res => {
            if (res.status === 200) {
                this.checkouts = res.body.data;

                this.checkouts.forEach(value => {
                    this.addressService.findAllByWard(value.wardId).subscribe(resAddress => {
                        value.address1 = resAddress.body;
                    });
                });

                console.log(res.body.paging);
                console.log(this.checkouts);
                this.paging.offset = res.body.paging.offset;
                this.paging.total = res.body.paging.total;
            } else {
                console.warn('can not load mail sender');
            }
        });
    }

    loadPage(page: number) {
        if (page !== this.paging.previousPage) {
            this.paging.previousPage = page;
            this.loadAll();
        }
    }

    focusoutName() {
        if (this.isCustomUri) {
            const name: string = this.checkoutFormGroup.get('name').value;
            this.checkoutFormGroup.get('code').setValue(xoaDau(name));
        }
    }

    paymentMethod(checkout: Checkout) {
        let rs = 'Không xác định';
        Object.keys(PAYMENT_METHOD).some(value => {
            if (PAYMENT_METHOD[value].value === checkout.paymentMethod) {
                rs = PAYMENT_METHOD[value].label;
                return true;
            }
        })
        return rs;
    }

    addressTrue(checkout: Checkout) {
        let rs = '';
        if (checkout.address1) {
            rs += `${checkout.address1.ward.prefix} ${checkout.address1.ward.name}, `;
            rs += `${checkout.address1.district.prefix} ${checkout.address1.district.name}, `;
            rs += `${checkout.address1.province.name}`;
        }
        return rs;
    }

    // transition() {
    //   const parameters = {
    //     offset: this.paging.offset - 1,
    //     limit: this.paging.limit
    //   }
    //   if (this.order.orderBy) {
    //     parameters['orderBy'] = this.order.orderBy;
    //     parameters['orderType'] = this.order.getOrderType();
    //   }
    //   if (this.txtSearch && this.txtSearch.trim().length > 0) {
    //     parameters['search'] = this.txtSearch;
    //   }
    //   this.router.navigate(['/object/mail-sender'], {
    //     queryParams: parameters
    //   });
    //   // this.loadAll();
    // }


    // save(modal, checkout: Checkout) {
    //     this.modalService.open(modal, {
    //         ariaLabelledBy: 'modal-basic-title',
    //         size: 'lg',
    //         backdrop: 'static'
    //     }).result.then((result) => {
    //         if (result === 'save') {
    //             this.isAcction = true;
    //             console.log('save');
    //             if (checkout.id) {
    //                 this.checkoutService..subscribe(res => {
    //                     console.log(res.body);
    //                     this.loadAll();
    //                 });
    //             } else {
    //                 this.checkoutService.create(checkout).subscribe(res => {
    //                     console.log(res.body);
    //                     this.loadAll();
    //                 });
    //             }
    //         }
    //
    //     });
    // }

    changeStatus(checkout) {
        console.log('ahihi');
        console.log(checkout);
        if (checkout.id && this.checkoutStatus >= CHECKOUT_STATUS.ACTIVE && this.checkoutStatus < CHECKOUT_STATUS.DONE) {
            const tmp: Checkout = {
                id: checkout.id,
                status: this.checkoutStatus + 1
            };
            this.checkoutService.update(tmp).subscribe(res => {
                // control.removeAt(index);
                if (res.status === 200) {
                    if ((this.paging.offset + this.checkouts.length) - this.paging.offset === 1 && this.paging.page !== 1) {
                        this.paging.page = this.paging.page - 1;
                        this.loadAll();
                    } else {
                        this.loadAll();
                    }
                }
            });
        }
    }

    remove(modal, checkout: Checkout) {
        this.modalService.open(modal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            backdrop: 'static'
        }).result.then((result) => {
            if (result === 'delete') {
                console.log('delete');
                console.log(this.selectedCheckout);
                if (checkout.id) {
                    const tmp: Checkout = {
                        id: checkout.id,
                        status: CHECKOUT_STATUS.DELETED,
                        note: this.nodeDelete
                    }
                    this.checkoutService.update(tmp).subscribe(res => {
                        // control.removeAt(index);
                        if (res.status === 200) {
                            if ((this.paging.offset + this.checkouts.length) - this.paging.offset === 1 && this.paging.page !== 1) {
                                this.paging.page = this.paging.page - 1;
                                this.loadAll();
                            } else {
                                this.loadAll();
                            }
                        }
                    });
                } else {
                }
            }
        }, (reason) => {
        });
    }

    openViewCertPopup(modal, checkout) {
        this.selectedCheckout = checkout;
        this.modalService.open(modal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            backdrop: 'static'
        }).result.then((result) => {
        }, (reason) => {
        });
    }

    changeLimit() {
        this.paging.page = 1;
        this.loadAll();
    }

    pagingInfo = (paging) => {
        return `Show ${paging.offset + 1} to ${(paging.offset + this.checkouts.length)} of ${paging.total} entries`;
    }


}
