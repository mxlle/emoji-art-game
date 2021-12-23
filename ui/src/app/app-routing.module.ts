import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameFieldComponent } from './game-field/game-field.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':gameId', component: GameFieldComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
