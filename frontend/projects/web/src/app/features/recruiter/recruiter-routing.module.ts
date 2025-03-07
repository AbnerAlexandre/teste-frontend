import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperListComponent } from './pages/developer-list/developer-list.component';
import { DeveloperDetailsComponent } from './pages/developer-details/developer-details.component';

const routes: Routes = [
  { path: '', component: DeveloperListComponent },
  { path: 'details/:id', component: DeveloperDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}