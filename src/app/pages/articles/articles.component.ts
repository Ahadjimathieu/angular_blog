import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ArticleService } from '@services/articles/article.service';
import { CategoryService } from '@services/categories/category.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  articleForm: FormGroup = new FormGroup({
    titre: new FormControl(''),
    contenu: new FormControl(''),
    content: new FormControl(''),
    category_name: new FormControl(''),
    category_id: new FormControl(''),
  });
  isEditMode: boolean = false;
  articleId: any;
  categories: any = [];
  article: any = {
    titre: '',
    content: '',
    contenu: '',
    category_id: '',
  };
  errors: any = {
    titre: '',
    content: '',
    contenu: '',
    category_id: '',
  };

  selectedImageUrl: string | ArrayBuffer | null = '';
  selectedImage: any | null = '';
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get buttonText(): string {
    return this.isEditMode ? 'Modifier' : 'Enregistrer';
  }

  showAlert(icon: any, text: string) {
    Swal.fire({
      icon: icon,
      showConfirmButton: true,
      text: text,
    });
  }

  setImage(base64String: string): void {
    this.selectedImageUrl = `data:image;base64,${base64String}`;
  }
  ngOnInit(): void {
    this.initializeForm();
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.isEditMode = true;
      this.articleService.getArticle(articleId).subscribe(
        (response: any) => {
          this.article = response.data;
          console.log(this.article);
          if (response && response.data) {
            this.articleForm.patchValue({
              titre: response.data.titre,
              category_name: response.data.category_name,
              contenu: response.data.contenu,
              category_id: response.data.category_id,
            });

            // Vérifie s'il y a une image dans le champ content
            if (response.data.content) {
              this.setImage(response.data.content);
            }
          }
        }
        // error: (error: any) => {
        //   console.log(error)
        // },
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = () => {
      this.selectedImageUrl = reader.result;
      console.log(this.selectedImage);
    };
  }
  private initializeForm(): void {
    this.articleForm = this.fb.group({
      titre: [null, Validators.required],
      contenu: [null, Validators.required],
      category_id: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    const articleData: FormData = new FormData();
    articleData.append('content', this.selectedImage);
    articleData.append('contenu', this.articleForm.get('contenu')!.value);
    articleData.append('titre', this.articleForm.get('titre')!.value);
    articleData.append(
      'category_id',
      this.articleForm.get('category_id')!.value
    );
    this.articleService
      .saveArticle(articleData)
      .pipe()
      .subscribe({
        next: (response: any) => {
          this.showAlert('success', response.message);
          this.router.navigateByUrl('/articles');
        },
        error: (error: any) => {
          // Récupérer les erreurs de la réponse
          if (error.status == 422) {
            if (error.error && error.error.message) {
              this.errors = error.error.errors;
            }
          } else if (error.status == 0) {
            this.showAlert('error', 'Erreur  serveur');
          }
        },
      });
  }

  private update(): void {
     this.articleId = this.route.snapshot.paramMap.get('id');
     const articleData: FormData = new FormData();
     articleData.append('id', this.articleId);
     articleData.append('contenu', this.articleForm.get('contenu')!.value);
     articleData.append('titre', this.articleForm.get('titre')!.value);
     articleData.append(
       'category_id',
       this.articleForm.get('category_id')!.value
     );
     articleData.append('_method', 'PUT');

     // Ajoute l'image si elle est définie
     if (this.selectedImage) {
       articleData.append('content', this.selectedImage);
     }
    console.log(this.articleForm.value);
    this.articleService.updateArticle(this.articleId, articleData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.showAlert('success', response.message);
        this.router.navigateByUrl('/articles');
      },
      error: (error) => {
        // Récupérer les erreurs de la réponse
        //console.log(error)
        if (error.status == 422) {
          if (error.error && error.error.message) {
            this.errors = error.error.errors;
          }
        } else if (error.status == 0) {
          this.showAlert('error', 'Erreur  serveur');
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.categoryList();
  }

  categoryList(): void {
    this.categoryService.categories().subscribe((response: any) => {
      this.categories = response.data;
      console.log(this.categories);
    });
  }
}
