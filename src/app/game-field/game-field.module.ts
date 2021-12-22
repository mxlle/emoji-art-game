import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameFieldComponent } from "./game-field.component";
import { CardModule } from "../card/card.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { PictureModule } from "../picture/picture.module";
import { DemandPickerModule } from "../demand-picker/demand-picker.module";

@NgModule({
  declarations: [GameFieldComponent],
  exports: [GameFieldComponent],
  imports: [
    CommonModule,
    CardModule,
    MatButtonModule,
    MatCardModule,
    PictureModule,
    DemandPickerModule,
  ],
})
export class GameFieldModule {}
