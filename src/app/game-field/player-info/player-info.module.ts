import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerInfoComponent } from "./player-info.component";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [PlayerInfoComponent],
  exports: [PlayerInfoComponent],
  imports: [CommonModule, MatCardModule],
})
export class PlayerInfoModule {}
