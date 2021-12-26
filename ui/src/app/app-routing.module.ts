import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameViewComponent } from './game-view/game-view.component';
import { CardOverviewComponent } from './card-overview/card-overview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cards', component: CardOverviewComponent },
  { path: ':gameId', component: GameViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
