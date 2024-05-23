import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './backoffice/user-login/user-login.component';
import { ListUsersComponent } from './backoffice/list-users/list-users.component';
import { FooterComponent } from './logged/footer/footer.component';
import { HeaderComponent } from './logged/header/header.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ChangeUsersComponent } from './backoffice/list-users/change-users/change-users.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ModalAlterComponent } from './backoffice/list-users/modal-alter/modal-alter.component';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './backoffice/create-user/create-user.component';
import { ChooseScreenComponent } from './backoffice/choose-screen/choose-screen.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateProductComponent } from './backoffice-product/create-product/create-product.component';
import { ListProductComponent } from './backoffice-product/list-product/list-product.component';
import { ChangeProductComponent } from './backoffice-product/change-product/change-product.component';
import { DetailProductComponent } from './logged/detail-product/detail-product.component';
import { HomePageComponent } from './logged/home-page/home-page.component';
import { CardProductComponent } from './logged/card-product/card-product.component';
import {MatCardModule} from '@angular/material/card';
import { ContainerComponent } from './logged/container/container.component';
import { CreateAccountComponent } from './client-area/create-account/create-account.component';
import { LoginUserComponent } from './client-area/login-user/login-user.component'
import {CreditCardComponent} from "./client-area/credit-card/credit-card.component";
import { ChangeClientComponent } from './client-area/change-client/change-client.component';
import {ListOrdersComponent} from "./backoffice/list-orders/list-orders.component";

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ListUsersComponent,
    ChangeUsersComponent,
    FooterComponent,
    ModalAlterComponent,
    CreateUserComponent,
    ChooseScreenComponent,
    CreateProductComponent,
    ListProductComponent,
    ChangeProductComponent,
    DetailProductComponent,
    HeaderComponent,
    HomePageComponent,
    CardProductComponent,
    ContainerComponent,
    CreateAccountComponent,
    LoginUserComponent,
    CreditCardComponent,
    ChangeClientComponent,
    ListOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [provideNgxMask(),
  MatSlideToggle,
  ListUsersComponent,
  HttpClientModule,
  MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
