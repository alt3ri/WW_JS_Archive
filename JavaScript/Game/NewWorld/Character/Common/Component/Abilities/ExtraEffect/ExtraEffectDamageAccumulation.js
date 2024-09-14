"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageAccumulation = void 0);
const BulletController_1 = require("../../../../../Bullet/BulletController"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase"),
  ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class DamageAccumulation extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.rXo = 0),
      (this.nXo = 0),
      (this.sXo = 0),
      (this.aXo = void 0),
      (this.hXo = 0),
      (this.lXo = -0),
      (this.ine = void 0);
  }
  InitParameters(t) {
    var t = t.ExtraEffectParameters,
      e =
        ((this.nXo = Number(t[0])),
        (this.sXo = Number(t[1])),
        (this.aXo = t[2].split("#").map((t) => BigInt(t))),
        (t[3] ?? "").split("#").map((t) => Number(t)));
    for (const i of e) this.hXo |= 1 << i;
    var s = (t[4] ?? "").split("#").map((t) => Number(t));
    switch (s.length) {
      case 1:
        this.lXo = s[0];
        break;
      case 2:
        (this.ine = s[0]), (this.lXo = s[1]);
    }
  }
  OnCreated() {
    this._Xo(0);
  }
  OnRemoved(t) {
    t ? this._Xo(2) : this._Xo(1);
  }
  OnStackDecreased(t, e, s) {
    t < e && this._Xo(3);
  }
  OnExecute(t, e) {
    t === this.nXo && ((this.rXo += e.Damage), this._Xo(0));
  }
  static ApplyEffects(t, e, s, i) {
    var r,
      a,
      h = [s.OwnerBuffComponent, i.OwnerBuffComponent];
    for ([r, a] of h.entries()) {
      var c = h[1 - r];
      for (const f of a.BuffEffectManager.FilterById(19))
        f.Check(e, c) && f.Execute(r, t);
    }
  }
  static GetAccumulation(t) {
    var e = this.uXo.get(t) ?? 0;
    return this.uXo.delete(t), e;
  }
  cXo(t) {
    return !!(this.hXo & (1 << t));
  }
  _Xo(t) {
    if (this.cXo(t))
      switch (t) {
        case 0: {
          let t = 0;
          var e;
          (t = this.ine
            ? ((e = this.lXo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
              this.OwnerEntity.GetComponent(159)?.GetBaseValue(this.ine) * e)
            : this.lXo) < this.rXo && this.mXo();
          break;
        }
        default:
          this.mXo();
      }
  }
  mXo() {
    switch (this.sXo) {
      case 1:
        this.dXo();
        break;
      case 0:
        this.CXo();
    }
    this.rXo = 0;
  }
  CXo() {
    var t = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
    if (t?.IsValid())
      for (const e of this.aXo)
        this.OwnerBuffComponent.AddIterativeBuff(
          e,
          t,
          void 0,
          !0,
          `因为其它buff额外效果而移除（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
        );
  }
  dXo() {
    var e = this.OwnerEntity.GetComponent(3)?.ActorTransform,
      s = this.InstigatorEntity.Entity.GetComponent(3)?.Actor;
    if (e && s) {
      var i = this.Buff.MessageId;
      for (const a of this.aXo)
        for (
          let t = 0;
          t < ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BULLET_TIMES;
          t++
        ) {
          var r = BulletController_1.BulletController.CreateBulletCustomTarget(
            s,
            String(a),
            e,
            {},
            i,
          );
          r && DamageAccumulation.uXo.set(r.Id, this.rXo);
        }
    }
  }
}
(exports.DamageAccumulation = DamageAccumulation).uXo = new Map();
//# sourceMappingURL=ExtraEffectDamageAccumulation.js.map
