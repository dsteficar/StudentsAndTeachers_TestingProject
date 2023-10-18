import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard-view/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    SharedModule,
    //DashboardRoutingModule,
    // MatCardModule,
    // CommonModule,
    // MatButtonModule
  ],
  exports: [
    HeroSearchComponent
  ]
})
export class DashboardModule { }
