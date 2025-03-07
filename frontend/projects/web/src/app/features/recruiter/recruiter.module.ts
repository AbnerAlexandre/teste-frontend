import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { DeveloperListComponent } from './pages/developer-list/developer-list.component';
import { DeveloperDetailsComponent } from './pages/developer-details/developer-details.component'

import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    DeveloperListComponent,
    DeveloperDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecruiterRoutingModule,
    FormsModule,
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
    InputTextModule,
    DividerModule
  ]
})
export class RecruiterModule { }
