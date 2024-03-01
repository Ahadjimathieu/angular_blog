import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ListRoutingModule, DataTablesModule],
})
export class ListModule {}
