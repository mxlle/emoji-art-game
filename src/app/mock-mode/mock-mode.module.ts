import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MockModeComponent } from "./mock-mode.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [MockModeComponent],
  exports: [MockModeComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class MockModeModule {}
