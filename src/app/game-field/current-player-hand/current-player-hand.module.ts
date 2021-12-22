import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CurrentPlayerHandComponent } from "./current-player-hand.component";
import { PictureModule } from "../../picture/picture.module";

@NgModule({
  declarations: [CurrentPlayerHandComponent],
  exports: [CurrentPlayerHandComponent],
  imports: [CommonModule, PictureModule],
})
export class CurrentPlayerHandModule {}
