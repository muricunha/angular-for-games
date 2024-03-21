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
    component: ChooseScreenComponent
  },
  {
    path: 'listarUsuarios',
    component: ListUsersComponent
  },
  {
    path: 'editarUsuarios',
    component: ChangeUsersComponent,
  },
  {
    path: 'listarProduto',
    component: ListProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
