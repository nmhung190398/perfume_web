import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../service/authentication.service';
import {CONSTANT_PATH} from './../../../comom/constant/base.constant';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../../../service/cart.service';
import {CategoryService} from '../../../service/category.service';
import {Category} from '../../../model/category.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    CONSTANT_PATH = CONSTANT_PATH;
    userLogin: User;
    lengthCartItem = 0;
    categories: Array<Category>;
    changePasswordForm: FormGroup;

    constructor(public authenticationService: AuthenticationService, private cartService: CartService,
                private modalService: NgbModal,
                private categoryService: CategoryService,
                private userService: UserService,
                private fb: FormBuilder) {
        this.initForm();
    }

    get isManager() {
        return this.authenticationService.isEmploy || this.authenticationService.isAdmin;
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(value => {
            if (value) {
                this.userLogin = value.user;
                this.changePasswordForm.get('username').setValue(this.userLogin.username);
                this.cartService.findByUserLogin(this.userLogin.id).subscribe(res => {
                    console.log(res.body);
                });

            } else {
                this.userLogin = null;
            }
        });

        this.cartService.currentCart.subscribe(value => {
            if (value) {
                this.lengthCartItem = value.length;
            } else {
                this.lengthCartItem = 0;
            }
        });

        this.categoryService.filterAll().subscribe(res => {
            this.categories = res.body;
        });


    }

    initForm() {
        this.changePasswordForm = this.fb.group({
            username: [null, [Validators.required]],
            oldPassworld: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
        });
    }

    logout() {
        this.authenticationService.logout();
    }

    changePassword(modal) {
        this.modalService
            .open(modal, {
                ariaLabelledBy: 'modal-basic-title',
                size: 'lg',
                backdrop: 'static'
            })
            .result.then(result => {
            if (result === 'save') {
                this.userService.changePassword(this.changePasswordForm.value).subscribe(res => {
                    if (res.status === 200) {
                        console.log(res.body.msg);
                    }
                });
            }
        });
    }

    changeInfo(modal) {
        this.modalService
            .open(modal, {
                ariaLabelledBy: 'modal-basic-title',
                size: 'lg',
                backdrop: 'static'
            })
            .result.then(result => {
            if (result === 'save') {
                console.log('ahihi');
            }
        });
    }

}
