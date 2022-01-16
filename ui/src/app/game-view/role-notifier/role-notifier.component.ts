import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { GamePhase, Role } from '../../../game-logic';

@Component({
  selector: 'app-role-notifier',
  templateUrl: './role-notifier.component.html',
  styleUrls: ['./role-notifier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleNotifierComponent implements OnInit {
  @Input() set role(role: Role | undefined) {
    if (this._role && role !== this._role) this.triggerAnimation();
    this._role = role;
  }
  get role(): Role | undefined {
    return this._role;
  }
  private _role?: Role;

  @Input() set phase(phase: GamePhase) {
    if ([GamePhase.Evaluate, GamePhase.Init].includes(this._phase) && GamePhase.Demand === phase) this.triggerAnimation();
    this._phase = phase;
  }
  private _phase: GamePhase = GamePhase.Init;

  @HostBinding('class.visible') visible: boolean = false;

  @Output() isVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  initialized: boolean = false;

  private readonly _animationMillis: number = 2000;
  private _timeoutRef?: number;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initialized = false;
    this.triggerAnimation();
  }

  triggerAnimation() {
    if (!this._timeoutRef) {
      requestAnimationFrame(() => {
        this.visible = true;
        this.isVisible.emit(true);
        this._cdr.markForCheck();

        this._timeoutRef = window.setTimeout(() => {
          this.visible = false;
          this.isVisible.emit(false);
          this.initialized = true;
          delete this._timeoutRef;
          this._cdr.markForCheck();
        }, this._animationMillis);
      });
    }
  }
}
