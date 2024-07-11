"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageAccumulation = void 0);
const BulletController_1 = require("../../../../../Bullet/BulletController");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class DamageAccumulation extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.aQo = 0),
      (this.hQo = 0),
      (this.lQo = 0),
      (this._Qo = void 0),
      (this.uQo = 0),
      (this.cQo = -0),
      (this.ine = void 0);
  }
  InitParameters(t) {
    var t = t.ExtraEffectParameters;
    const e =
      ((this.hQo = Number(t[0])),
      (this.lQo = Number(t[1])),
      (this._Qo = t[2].split("#").map((t) => BigInt(t))),
      (t[3] ?? "").split("#").map((t) => Number(t)));
    for (const i of e) this.uQo |= 1 << i;
    const s = (t[4] ?? "").split("#").map((t) => Number(t));
    switch (s.length) {
      case 1:
        this.cQo = s[0];
        break;
      case 2:
        (this.ine = s[0]), (this.cQo = s[1]);
    }
  }
  OnCreated() {
    this.mQo(0);
  }
  OnRemoved(t) {
    t ? this.mQo(2) : this.mQo(1);
  }
  OnStackDecreased(t, e, s) {
    t < e && this.mQo(3);
  }
  OnExecute(t, e) {
    t === this.hQo && ((this.aQo += e.Damage), this.mQo(0));
  }
  static ApplyEffects(t, e, s, i) {
    let r;
    let a;
    const h = [s.OwnerBuffComponent, i.OwnerBuffComponent];
    for ([r, a] of h.entries()) {
      const c = h[1 - r];
      for (const f of a.BuffEffectManager.FilterById(19))
        f.Check(e, c) && f.Execute(r, t);
    }
  }
  static GetAccumulation(t) {
    const e = this.dQo.get(t) ?? 0;
    return this.dQo.delete(t), e;
  }
  CQo(t) {
    return !!(this.uQo & (1 << t));
  }
  mQo(t) {
    if (this.CQo(t))
      switch (t) {
        case 0: {
          let t = 0;
          let e;
          (t = this.ine
            ? ((e = this.cQo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
              this.OwnerEntity.GetComponent(156)?.GetBaseValue(this.ine) * e)
            : this.cQo) < this.aQo && this.gQo();
          break;
        }
        default:
          this.gQo();
      }
  }
  gQo() {
    switch (this.lQo) {
      case 1:
        this.fQo();
        break;
      case 0:
        this.pQo();
    }
    this.aQo = 0;
  }
  pQo() {
    const t = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
    if (t?.IsValid())
      for (const e of this._Qo)
        this.OwnerBuffComponent.AddIterativeBuff(
          e,
          t,
          void 0,
          !0,
          `因为其它buff额外效果而移除（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
        );
  }
  fQo() {
    const e = this.OwnerEntity.GetComponent(3)?.ActorTransform;
    const s = this.InstigatorEntity.Entity.GetComponent(3)?.Actor;
    if (e && s) {
      const i = this.Buff.MessageId;
      for (const a of this._Qo)
        for (
          let t = 0;
          t < ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BULLET_TIMES;
          t++
        ) {
          const r =
            BulletController_1.BulletController.CreateBulletCustomTarget(
              s,
              String(a),
              e,
              {},
              i,
            );
          r && DamageAccumulation.dQo.set(r.Id, this.aQo);
        }
    }
  }
}
(exports.DamageAccumulation = DamageAccumulation).dQo = new Map();
// # sourceMappingURL=ExtraEffectDamageAccumulation.js.map
