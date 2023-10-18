import { NgModule } from '@angular/core';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
  ]
})
export class HeroModule { }
