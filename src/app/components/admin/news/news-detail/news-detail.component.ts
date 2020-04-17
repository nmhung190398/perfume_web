import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {News} from '../../../../model/news.model';
import {NewsService} from '../../../../service/news.service';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    public Editor = ClassicEditor;
    newsId;
    isUpdate = false;
    news: News;
    newsFormGroup: FormGroup;

    constructor(protected router: Router,
                protected activatedRoute: ActivatedRoute,
                private modalService: NgbModal,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private newsService: NewsService,
    ) {
        this.activatedRoute.paramMap.subscribe(param => {
            this.newsId = param.get('id');
            this.isUpdate = this.newsId !== null;
            this.loadAll();
        });
    }

    ngOnInit(): void {
        this.newsFormGroup = this.initForm();
    }

    initForm() {
        return this.fb.group({
            id: [],
            title: ['', [Validators.required]],
            content: ['', [Validators.required]],
        });
    }

    loadAll() {
        if (this.isUpdate) {
            if (this.isUpdate) {
                this.newsService.find(this.newsId).subscribe(res => {
                    this.news = res.body;
                    this.addValue(this.news);
                });
            }
        }
    }

    addValue(news: News) {
        this.newsFormGroup.setValue({
            id: news.id,
            title: news.title,
            content: news.content,
        });
    }

}
