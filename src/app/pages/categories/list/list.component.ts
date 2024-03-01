import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@services/categories/category.service';
import { Subject } from 'rxjs';
import  $ from 'jquery';
import { Options } from '@/DataTable/languageOptions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, AfterViewInit {
  categoryId: any;
  selectedRow: any;
  categories: any = [];
  dtOptions: DataTables.Settings = {}; // Utilisez le type personnalisé
  dtTrigger: Subject<any> = new Subject<any>();
  disabled = true;
  constructor(private service: CategoryService, private router: Router) {}

  onEditPage(): void {
    // Naviguer vers la route /users/:id avec l'ID actuel
    this.router.navigate(['/categories/', this.categoryId]);
  }

  ngOnInit(): void {
    this.dtOptions = {
      ...Options,
      createdRow: (row: any, data: any) => {
        $(row).on('click', () => {
          this.categoryId = data[0]; // L'ID est stocké à l'indice 0
          console.log('ID de la ligne sélectionnée :', this.categoryId);
          this.selectedRow = row;
          // Activer/désactiver les boutons en fonction de la sélection
          this.disabled = false;
          // Désactiver les boutons si la ligne est sélectionnée deux fois
          if ($(row).hasClass('selected')) {
            this.disabled = true;
            this.categoryId = 0;
          }
        });
      },
    };
  }

  ngAfterViewInit(): void {
    this.categoryList();
  }

  categoryList(): void {
    this.service.categories().subscribe((response: any) => {
      this.categories = response.data;
      console.log(this.categories);

      this.dtTrigger.next(null);
    });
  }
}
