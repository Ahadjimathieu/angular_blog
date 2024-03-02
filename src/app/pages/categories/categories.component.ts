import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@services/categories/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    libelle: new FormControl(''),
  });
  isEditMode: boolean = false;
  categoryId: any;
  constructor(
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

  ngOnInit(): void {
    this.initializeForm();
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditMode = true;
      this.categoryService
        .getCategory(categoryId)
        .subscribe((response: any) => {
          console.log(response.categorie.libelle);
          this.categoryForm.controls['libelle'].patchValue(
            response.categorie.libelle
          );
        });
    }
  }

  private initializeForm(): void {
    this.categoryForm = this.fb.group({
      libelle: ['', Validators.required],
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
    const categoryData = this.categoryForm.value;
    this.categoryService
      .saveCategory(categoryData)
      .subscribe((response: any) => {
        this.showAlert('success', response.message);
        console.log(response.data);
        this.router.navigateByUrl('/admin/categories');
      });
  }

  private update(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    const categoryData = { id: categoryId, ...this.categoryForm.value };
    this.categoryService
      .updateCategory(categoryId, categoryData)
      .subscribe((response: any) => {
        this.showAlert('success', response.message);
        this.router.navigateByUrl('/admin/categories');
      });
  }
}
