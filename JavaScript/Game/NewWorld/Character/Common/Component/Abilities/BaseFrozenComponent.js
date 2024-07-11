"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let o;
    const n = arguments.length;
    let r =
      n < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, i, s);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (o = t[h]) && (r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r);
    return n > 3 && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseFrozenComponent = void 0);
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ETERNAL_DURATION = 1e7;
let BaseFrozenComponent = class BaseFrozenComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComponent = void 0),
      (this.vqr = void 0),
      (this.Qbr = void 0),
      (this.Xbr = void 0),
      (this.$br = void 0),
      (this.Ybr = (t, e) => {
        e && this.ActorComponent.Actor.StopAnimMontage();
      }),
      (this.Jbr = new Map()),
      (this.FrozenLockSet = new Set());
  }
  OnStart() {
    return (
      (this.ActorComponent = this.Entity.CheckGetComponent(3)),
      (this.vqr = this.Entity.CheckGetComponent(51)),
      (this.Qbr = this.Entity.CheckGetComponent(107)),
      this.Zbr(),
      !0
    );
  }
  OnEnd() {
    return (
      this.Xbr && (this.Xbr.EndTask(), (this.Xbr = void 0)),
      this.$br && (this.$br.EndTask(), (this.$br = void 0)),
      !0
    );
  }
  Zbr() {
    const t = this.Entity.CheckGetComponent(185);
    this.Xbr = t.ListenForTagAddOrRemove(2118071836, this.Ybr);
  }
  AddTimeScaleByBuff(t, e, i, s, o) {
    this.Jbr.has(t) ||
      this.vqr.IsImmuneTimeScaleEffect() ||
      ((e = this.Qbr.SetTimeScale(e, i, o, s ?? ETERNAL_DURATION, 6)),
      this.Jbr.set(t, e));
  }
  RemoveTimeScaleByBuff(t) {
    const e = this.Jbr.get(t);
    e && this.Qbr.RemoveTimeScale(e), this.Jbr.delete(t);
  }
  IsFrozen() {
    return !1;
  }
  SetFrozen(t) {}
  RefreshFrozen() {
    this.SetFrozen(this.FrozenLockSet.size > 0);
  }
  LockFrozen(t) {
    this.FrozenLockSet.add(t), this.RefreshFrozen();
  }
  UnlockFrozen(t) {
    this.FrozenLockSet.delete(t), this.RefreshFrozen();
  }
};
(BaseFrozenComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(16)],
  BaseFrozenComponent,
)),
  (exports.BaseFrozenComponent = BaseFrozenComponent);
// # sourceMappingURL=BaseFrozenComponent.js.map
