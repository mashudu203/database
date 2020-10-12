import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {path : '',redirectTo : '/landing', pathMatch : 'full'},
  {path : 'landing', component :LandingComponent},
  {path : 'details/:ref', component :DetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
