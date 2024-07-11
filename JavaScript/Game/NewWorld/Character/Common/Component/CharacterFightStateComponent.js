"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, h) {
    let r;
    const s = arguments.length;
    let a =
      s < 3 ? e : h === null ? (h = Object.getOwnPropertyDescriptor(e, i)) : h;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, e, i, h);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (r = t[n]) && (a = (s < 3 ? r(a) : s > 3 ? r(e, i, a) : r(e, i)) || a);
    return s > 3 && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterFightStateComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let CharacterFightStateComponent = class CharacterFightStateComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.zKe = 0),
      (this.aYo = void 0),
      (this.CurrentState = 0),
      (this.SubStatePriority = 0),
      (this.IsLocal = !1),
      (this.WaitConfirm = !1),
      (this.CurrentHandle = 0);
  }
  OnStart() {
    return (this.aYo = this.Entity.GetComponent(158)), !0;
  }
  PreSwitchRemoteFightState(t) {
    const e = t >> 8;
    var t = 255 & t;
    const i = this.G5r(e, t, !1);
    return (
      i ||
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "FightState",
          this.Entity,
          `预算切换状态失败，目标[[${e}][${t}]，当前[${this.CurrentState}][${this.SubStatePriority}]`,
        ),
      i
    );
  }
  TrySwitchHitState(t, e = !1) {
    if (t === 7) return this.TrySwitchState(4, 0, e);
    if (
      e &&
      this.aYo.MoveState ===
        CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
      this.aYo.PositionState ===
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
      i > 255 && (i = 255),
      t.OverrideType === 1
        ? this.TrySwitchState(3, i, e)
        : t.OverrideType === 2
          ? this.TrySwitchState(5, i, e)
          : t.OverrideType === 3
            ? this.TrySwitchState(7, i, e)
            : this.TrySwitchState(1, i, e)
    );
  }
  G5r(t, e, i = !1) {
    return i
      ? this.N5r(this.CurrentState, this.SubStatePriority, t, e)
      : !this.WaitConfirm ||
          !this.N5r(t, e, this.CurrentState, this.SubStatePriority);
  }
  N5r(t, e, i, h) {
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
    return this.G5r(t, e, i)
      ? (this.O5r(t, e, i),
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "FightState",
          this.Entity,
          `切换主状态成功[handle:${this.CurrentHandle}][${t}][${e}][local:${i}]`,
        ),
        this.CurrentHandle)
      : (CombatDebugController_1.CombatDebugController.CombatInfo(
          "FightState",
          this.Entity,
          `切换主状态失败，目标[[${t}][${e}][local:${i}]，当前[${this.CurrentState}][${this.SubStatePriority}][local:${this.IsLocal}]`,
        ),
        0);
  }
  O5r(t, e, i = !1) {
    return (
      (this.CurrentState = t),
      (this.SubStatePriority = e),
      (this.IsLocal = i),
      (this.WaitConfirm = i),
      (this.CurrentHandle = ++this.zKe),
      this.CurrentHandle
    );
  }
  ConfirmState(t) {
    this.CurrentHandle === t
      ? ((this.WaitConfirm = !1),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "FightState",
          this.Entity,
          `确认状态[handle:${t}]`,
        ))
      : CombatDebugController_1.CombatDebugController.CombatInfo(
          "FightState",
          this.Entity,
          `确认状态失败[handle:${t}]，当前[handle:${this.CurrentHandle}]`,
        );
  }
  ResetState() {
    CombatDebugController_1.CombatDebugController.CombatInfo(
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
      ? (CombatDebugController_1.CombatDebugController.CombatInfo(
          "FightState",
          this.Entity,
          `退出主状态[handle:${t}][${this.CurrentState}]`,
        ),
        (this.CurrentState = 0),
        (this.SubStatePriority = 0),
        (this.IsLocal = !1),
        (this.WaitConfirm = !1),
        (this.CurrentHandle = 0))
      : CombatDebugController_1.CombatDebugController.CombatInfo(
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
  [(0, RegisterComponent_1.RegisterComponent)(46)],
  CharacterFightStateComponent,
)),
  (exports.CharacterFightStateComponent = CharacterFightStateComponent);
// # sourceMappingURL=CharacterFightStateComponent.js.map
