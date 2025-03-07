import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCreateComponent } from './pages/profile-create/profile-create.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'create', component: ProfileCreateComponent },
  { path: 'edit/:id', component: ProfileEditComponent },
  { path: 'view/:id', component: ProfileViewComponent },
  { path: '', redirectTo: 'create', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
})
export class DeveloperRoutingModule {}