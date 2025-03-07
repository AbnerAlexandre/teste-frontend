import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeveloperRoutingModule } from './developer-routing.module';
import { ProfileCreateComponent } from './pages/profile-create/profile-create.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    ProfileCreateComponent,
    ProfileEditComponent,
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DeveloperRoutingModule,
    DividerModule,
    FormsModule
  ]
})
export class DeveloperModule { }
