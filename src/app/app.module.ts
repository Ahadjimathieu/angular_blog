import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FooterfrontComponent } from './components/ui/footerfront/footerfront.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { GuestlayoutComponent } from './components/ui/guestlayout/guestlayout.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    FooterfrontComponent,
    HeaderComponent,
    GuestlayoutComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild({
      /* options */
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
