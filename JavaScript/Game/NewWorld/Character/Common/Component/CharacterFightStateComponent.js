"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, h) {
    var s,
      r = arguments.length,
      a =
        r < 3
          ? e
          : null === h
            ? (h = Object.getOwnPropertyDescriptor(e, i))
            : h;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, h);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (a = (r < 3 ? s(a) : 3 < r ? s(e, i, a) : s(e, i)) || a);
    return 3 < r && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterFightStateComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
let CharacterFightStateComponent = class CharacterFightStateComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this._Xe = 0),
      (this.rJo = void 0),
      (this.CurrentState = 0),
      (this.SubStatePriority = 0),
      (this.IsLocal = !1),
      (this.WaitConfirm = !1),
      (this.CurrentHandle = 0);
  }
  OnStart() {
    return (this.rJo = this.Entity.GetComponent(161)), !0;
  }
  PreSwitchRemoteFightState(t) {
    var e = t >> 8,
      t = 255 & t,
      i = this.g5r(e, t, !1);
    return (
      i ||
        CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `预算切换状态失败，目标[[${e}][${t}]，当前[${this.CurrentState}][${this.SubStatePriority}]`,
        ),
      i
    );
  }
  TrySwitchHitState(t, e = !1) {
    if (7 === t) return this.TrySwitchState(4, 0, e);
    if (
      e &&
      this.rJo.MoveState ===
        CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
      this.rJo.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Air
    )
      return this.TrySwitchState(2, 2, e);
    switch (t) {
      case 4:
        return this.TrySwitchState(2, 2, e);
      case 5:
        return this.TrySwitchState(2, 1, e);
    }
    return this.TrySwitchState(2, 0, e);
  }
  TrySwitchSkillState(t, e = !1) {
    let i = t.InterruptLevel;
    return (
      255 < i && (i = 255),
      1 === t.OverrideType
        ? this.TrySwitchState(3, i, e)
        : 2 === t.OverrideType
          ? this.TrySwitchState(5, i, e)
          : 3 === t.OverrideType
            ? this.TrySwitchState(7, i, e)
            : this.TrySwitchState(1, i, e)
    );
  }
  g5r(t, e, i = !1) {
    return i
      ? this.f5r(this.CurrentState, this.SubStatePriority, t, e)
      : !this.WaitConfirm ||
          !this.f5r(t, e, this.CurrentState, this.SubStatePriority);
  }
  f5r(t, e, i, h) {
    if (i !== t) return t < i;
    if (h === e)
      switch (i) {
        case 1:
        case 2:
        case 7:
          return !0;
      }
    return e < h;
  }
  TrySwitchState(t, e, i = !1) {
    return this.g5r(t, e, i)
      ? (this.p5r(t, e, i),
        CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `切换主状态成功[handle:${this.CurrentHandle}][${t}][${e}][local:${i}]`,
        ),
        this.CurrentHandle)
      : (CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `切换主状态失败，目标[[${t}][${e}][local:${i}]，当前[${this.CurrentState}][${this.SubStatePriority}][local:${this.IsLocal}]`,
        ),
        0);
  }
  p5r(t, e, i = !1) {
    return (
      (this.CurrentState = t),
      (this.SubStatePriority = e),
      (this.IsLocal = i),
      (this.WaitConfirm = i),
      (this.CurrentHandle = ++this._Xe),
      this.CurrentHandle
    );
  }
  ConfirmState(t) {
    this.CurrentHandle === t
      ? (this.WaitConfirm = !1)
      : CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `确认状态失败[handle:${t}]，当前[handle:${this.CurrentHandle}]`,
        );
  }
  ResetState() {
    CombatLog_1.CombatLog.Info(
      "FightState",
      this.Entity,
      `重置主状态[handle:${this.CurrentHandle}]`,
    ),
      (this.CurrentState = 0),
      (this.SubStatePriority = 0),
      (this.IsLocal = !1),
      (this.WaitConfirm = !1),
      (this.CurrentHandle = 0);
  }
  ExitState(t) {
    this.CurrentHandle === t
      ? (CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `退出主状态[handle:${t}][${this.CurrentState}]`,
        ),
        (this.CurrentState = 0),
        (this.SubStatePriority = 0),
        (this.IsLocal = !1),
        (this.WaitConfirm = !1),
        (this.CurrentHandle = 0))
      : CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `退出主状态失败[handle:${t}][${this.CurrentState}]，当前[handle:${this.CurrentHandle}]`,
        );
  }
  GetFightState() {
    return this.CurrentHandle
      ? (this.CurrentState << 8) | this.SubStatePriority
      : 0;
  }
};
(CharacterFightStateComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(48)],
  CharacterFightStateComponent,
)),
  (exports.CharacterFightStateComponent = CharacterFightStateComponent);
//# sourceMappingURL=CharacterFightStateComponent.js.map
