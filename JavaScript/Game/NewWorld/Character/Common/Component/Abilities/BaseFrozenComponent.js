"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      n = arguments.length,
      r =
        n < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (r = (n < 3 ? o(r) : 3 < n ? o(e, i, r) : o(e, i)) || r);
    return 3 < n && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseFrozenComponent = void 0);
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ETERNAL_DURATION = 1e7;
let BaseFrozenComponent = class BaseFrozenComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComponent = void 0),
      (this.$br = void 0),
      (this.ybr = void 0),
      (this.Ibr = void 0),
      (this.Tbr = void 0),
      (this.Lbr = (t, e) => {
        e && this.ActorComponent.Actor.StopAnimMontage();
      }),
      (this.Dbr = new Map()),
      (this.FrozenLockSet = new Set());
  }
  OnStart() {
    return (
      (this.ActorComponent = this.Entity.CheckGetComponent(3)),
      (this.$br = this.Entity.CheckGetComponent(52)),
      (this.ybr = this.Entity.CheckGetComponent(109)),
      this.Ubr(),
      !0
    );
  }
  OnEnd() {
    return (
      this.Ibr && (this.Ibr.EndTask(), (this.Ibr = void 0)),
      this.Tbr && (this.Tbr.EndTask(), (this.Tbr = void 0)),
      !0
    );
  }
  Ubr() {
    var t = this.Entity.CheckGetComponent(188);
    this.Ibr = t.ListenForTagAddOrRemove(2118071836, this.Lbr);
  }
  AddTimeScaleByBuff(t, e, i, s, o) {
    this.Dbr.has(t) ||
      this.$br.IsImmuneTimeScaleEffect() ||
      ((e = this.ybr.SetTimeScale(e, i, o, s ?? ETERNAL_DURATION, 6)),
      this.Dbr.set(t, e));
  }
  RemoveTimeScaleByBuff(t) {
    var e = this.Dbr.get(t);
    e && this.ybr.RemoveTimeScale(e), this.Dbr.delete(t);
  }
  IsFrozen() {
    return !1;
  }
  SetFrozen(t) {}
  RefreshFrozen() {
    this.SetFrozen(0 < this.FrozenLockSet.size);
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
//# sourceMappingURL=BaseFrozenComponent.js.map
