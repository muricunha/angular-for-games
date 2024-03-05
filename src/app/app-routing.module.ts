import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './backoffice/list-users/list-users.component';
import { ChangeUsersComponent } from './backoffice/list-users/change-users/change-users.component';
import { ModalAlterComponent } from './backoffice/list-users/modal-alter/modal-alter.component';

const routes: Routes = [
  {
    path: 'backoffice/listarUsuarios',
    component: ListUsersComponent
  },
  {
    path: 'backoffice/editarUsuarios/:id',
    component: ChangeUsersComponent,
  },
  {
  path: 'backoffice/alterSlide/:id',
  component: ModalAlterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
