import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { shuffleArray } from '../../../game-tools/random-util';

@Component({
  selector: 'app-emoji-list-preview',
  templateUrl: './emoji-list-preview.component.html',
  styleUrls: ['./emoji-list-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmojiListPreviewComponent implements OnInit {
  @Input() emojis: string[] = [];
  @Input() visible: number = 3;
  @Input() shuffle: boolean = true;

  visibleEmojis: string[] = [];

  ngOnInit(): void {
    if (this.shuffle) {
      this.visibleEmojis = shuffleArray([...this.emojis]).slice(0, this.visible);
    } else {
      this.visibleEmojis = [...this.emojis].slice(0, this.visible);
    }
  }
}
