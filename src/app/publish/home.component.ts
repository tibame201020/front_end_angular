import { Article } from './../model/article';
import { ArticleService } from './../share/article.service';
import { CodeNmModel } from './model/CodeNmModel';
import { PublishService } from './publish.service';
import { SideBarService } from '../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { PUBLISH_SIDE_BAR_CONFIG } from './side-bar-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from '../auth.service';
import { Base64UploadAdapter } from './base64-upload-adapter';
import { ckeditorConfig } from './ck-editor-config';
import Swal from 'sweetalert2';
import { StockCodeValidator } from '../share/validators/stock-code-nm-validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Editor = ClassicEditor;
  public config = ckeditorConfig;
  codeNmLs: CodeNmModel[] = [];
  submitMsg = 'Publish';
  title = 'Publish';
  editData?: any;
  form: FormGroup = this.formBuilder.group({
    visibility: ['all', Validators.required],
    codeNm: ['', Validators.required, this.StockCodeValidator.validate.bind(this.StockCodeValidator)],
    title: ['', Validators.required],
    ckContent: ['', Validators.required]
  });

  constructor(private SideBarService: SideBarService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private PublishService: PublishService,
    private ArticleService: ArticleService,
    private StockCodeValidator: StockCodeValidator,
    private router: Router,) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
    if (window.location.pathname == '/publish/edit') {
      this.editData = this.ArticleService.getEditData();
      if (this.editData) {
        this.ArticleService.clearEditData();
        this.form = this.formBuilder.group({
          visibility: [this.editData.visibility, Validators.required],
          codeNm: [this.editData.codeNm],
          title: [this.editData.title, Validators.required],
          ckContent: [this.editData.ckContent, Validators.required]
        });
        this.submitMsg = 'Save this Aritcle';
        this.title = 'Edit Article';
      } else {
        this.router.navigate(['/publish/manage']);
      }

    }
  }

  onSubmit(form: FormGroup) {
    if (window.location.pathname == '/publish/edit') {
      this.form.value.account = this.editData.account;
      this.form.value.id = this.editData.id;
      this.ArticleService.save(form.value).subscribe(
        (res) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'the article was edit',
            })
            this.form = this.formBuilder.group({
              visibility: ['all', Validators.required],
              codeNm: ['', Validators.required, this.StockCodeValidator.validate.bind(this.StockCodeValidator)],
              title: ['', Validators.required],
              ckContent: ['', Validators.required]
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'the article publish was failed, plz contact us',
            })
          }
          this.router.navigate(['/publish/manage']);
        }
      );
    } else {
      form.value.account = this.AuthService.userValue.account;
      this.ArticleService.save(form.value).subscribe(
        (res) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'the article is published',
            });
            this.form = this.formBuilder.group({
              visibility: ['all', Validators.required],
              codeNm: ['', Validators.required, this.StockCodeValidator.validate.bind(this.StockCodeValidator)],
              title: ['', Validators.required],
              ckContent: ['', Validators.required]
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'the article publish was failed, plz contact us',
            })
          }
        }
      );
    }
  }

  selectCodeNmLs(): void {
    if (!this.form.value.codeNm.length) {
      return;
    }
    if (this.form.value.codeNm.trim().length) {
      this.PublishService.getCodeNmLs(this.form.value.codeNm.trim()).subscribe(
        res => {
          this.codeNmLs = res;
        })
    }
  }

  checkSellRole(): boolean {
    return JSON.stringify(this.AuthService.userValue.roles).indexOf('Seller') != -1
  }

  onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );

    editor.plugins.get('FileRepository').createUploadAdapter = function (loader: any) {
      return new Base64UploadAdapter(loader);
    };
  }
}

