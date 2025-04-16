"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var h,
      r = arguments.length,
      a =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (h = t[n]) && (a = (r < 3 ? h(a) : 3 < r ? h(e, i, a) : h(e, i)) || a);
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
    return (this.rJo = this.Entity.GetComponent(173)), !0;
  }
  PreSwitchRemoteFightState(t) {
    var e = t >> 8,
      t = 255 & t,
      i = this.CheckSwitchState(e, t, !1);
    return (
      i ||
        CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `预切换状态失败，${this.IF_(e, t)}，` + this.TF_(),
        ),
      i
    );
  }
  TrySwitchHitState(t, e = !1) {
    if (7 === t) return this.TrySwitchState(4, 0, e);
    if (
      e &&
      this.rJo.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Air
    )
      return this.TrySwitchState(2, 2, e);
    switch (t) {
      case 4:
      case 5:
        return this.TrySwitchState(2, 2, e);
      case 6:
        return this.TrySwitchState(2, 1, e);
    }
    return this.TrySwitchState(2, 0, e);
  }
  TrySwitchSkillState(t, e, i = !1) {
    let s = t;
    return (
      255 < s && (s = 255),
      1 === e.OverrideType
        ? this.TrySwitchState(3, s, i)
        : 2 === e.OverrideType
          ? this.TrySwitchState(5, s, i)
          : 3 === e.OverrideType
            ? this.TrySwitchState(7, s, i)
            : this.TrySwitchState(1, s, i)
    );
  }
  CheckSwitchHitState(t, e = !1) {
    if (7 === t) return this.CheckSwitchState(4, 0, e);
    if (
      e &&
      this.rJo.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Air
    )
      return this.CheckSwitchState(2, 2, e);
    switch (t) {
      case 4:
      case 5:
        return this.CheckSwitchState(2, 2, e);
      case 6:
        return this.CheckSwitchState(2, 1, e);
    }
    return this.CheckSwitchState(2, 0, e);
  }
  SwitchHitState(t, e = !1) {
    if (7 === t) return this.p5r(4, 0, e);
    if (
      e &&
      this.rJo.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Air
    )
      return this.p5r(2, 2, e);
    switch (t) {
      case 4:
      case 5:
        return this.p5r(2, 2, e);
      case 6:
        return this.p5r(2, 1, e);
    }
    return this.p5r(2, 0, e);
  }
  CheckSwitchState(t, e, i = !1) {
    return i
      ? this.f5r(this.CurrentState, this.SubStatePriority, t, e)
      : !this.WaitConfirm ||
          !this.f5r(t, e, this.CurrentState, this.SubStatePriority);
  }
  f5r(t, e, i, s) {
    if (i !== t) return t < i;
    if (s === e)
      switch (i) {
        case 1:
        case 2:
        case 7:
          return !0;
      }
    return e < s;
  }
  TrySwitchState(t, e, i = !1) {
    return this.CheckSwitchState(t, e, i)
      ? (this.p5r(t, e, i), this.CurrentHandle)
      : (CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `切换${i ? "本地" : "远端"}主状态失败，${this.IF_(t, e)}，` +
            this.TF_(),
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
      CombatLog_1.CombatLog.Info(
        "FightState",
        this.Entity,
        `切换${i ? "本地" : "远端"}主状态成功，` + this.TF_(),
      ),
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
          "退出主状态，" + this.TF_(),
        ),
        (this.CurrentState = 0),
        (this.SubStatePriority = 0),
        (this.IsLocal = !1),
        (this.WaitConfirm = !1),
        (this.CurrentHandle = 0))
      : CombatLog_1.CombatLog.Info(
          "FightState",
          this.Entity,
          `退出主状态失败，[handle:${t}]，` + this.TF_(),
        );
  }
  GetFightState() {
    return this.CurrentHandle
      ? (this.CurrentState << 8) | this.SubStatePriority
      : 0;
  }
  TF_() {
    return `[当前状态(${this.CurrentHandle}):${this.bF_(this.CurrentState, this.SubStatePriority)}]`;
  }
  IF_(t, e) {
    return `[目标状态：${this.bF_(t, e)}]`;
  }
  bF_(t, e) {
    let i = "";
    switch (t) {
      case 1:
        i = `普通技能(${t}|${e})`;
        break;
      case 2:
        i = `普通受击(${t}|${e})`;
        break;
      case 3:
        i = `覆盖受击技能(${t}|${e})`;
        break;
      case 4:
        i = `被弹反受击(${t}|${e})`;
        break;
      case 5:
        i = `覆盖被弹反技能(${t}|${e})`;
        break;
      case 6:
        i = `抓取(${t}|${e})`;
        break;
      case 7:
        i = `特殊技能(${t}|${e})`;
        break;
      case 8:
        i = `状态机主状态(${t}|${e})`;
    }
    return i;
  }
};
(CharacterFightStateComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(54)],
  CharacterFightStateComponent,
)),
  (exports.CharacterFightStateComponent = CharacterFightStateComponent);
//# sourceMappingURL=CharacterFightStateComponent.js.map
