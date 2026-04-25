import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Single-page app — all sections live in HomeComponent via scroll
const routes: Routes = [
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
