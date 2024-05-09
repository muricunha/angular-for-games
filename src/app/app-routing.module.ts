import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './backoffice/list-users/list-users.component';
import { ChangeUsersComponent } from './backoffice/list-users/change-users/change-users.component';
import { ModalAlterComponent } from './backoffice/list-users/modal-alter/modal-alter.component';
import { CreateUserComponent } from './backoffice/create-user/create-user.component';
import { UserLoginComponent } from './backoffice/user-login/user-login.component';
import { ChooseScreenComponent } from './backoffice/choose-screen/choose-screen.component';
import { CreateProductComponent } from './backoffice-product/create-product/create-product.component';
import { ListProductComponent } from './backoffice-product/list-product/list-product.component';
import { authGuardsGuard } from './guards/auth-guards.guard';
import { DetailProductComponent } from './logged/detail-product/detail-product.component';
import { HomePageComponent } from './logged/home-page/home-page.component';
import { CreateAccountComponent } from './client-area/create-account/create-account.component';
import { LoginUserComponent } from './client-area/login-user/login-user.component';
import {CreditCardComponent} from "./client-area/credit-card/credit-card.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'escolhertela',
    component: ChooseScreenComponent,
  },
  {
    path: 'listarUsuarios',
    component: ListUsersComponent,
    canActivate: [authGuardsGuard],
    data: {grupo: 'ADMIN'}
  },
  {
    path: 'editarUsuarios',
    component: ChangeUsersComponent,
  },
  {
    path: 'listarProduto',
    component: ListProductComponent,
  },
  {
    path: 'inicio',
    component: HomePageComponent
  },
  {
    path: 'produto',
    component: DetailProductComponent
  },
  {
    path: 'cadastro-cliente',
    component: CreateAccountComponent
  },
  {
    path: 'login-user',
    component: LoginUserComponent
  },
  {
    path: 'credit-card',
    component: CreditCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
