import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'developer',
    loadChildren: () =>
      import('./features/developer/developer.module').then(
        (m) => m.DeveloperModule
      ),
  },
  {
    path: 'recruiter',
    loadChildren: () =>
      import('./features/recruiter/recruiter.module').then(
        (m) => m.RecruiterModule
      ),
  },
  { path: '', redirectTo: 'developer', pathMatch: 'full' },
  { path: '**', redirectTo: 'developer' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}