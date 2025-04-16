"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (s = t[a]) && (n = (r < 3 ? s(n) : 3 < r ? s(e, i, n) : s(e, i)) || n);
    return 3 < r && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleHitComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BaseHitComponent_1 = require("../../Character/Common/Component/BaseHitComponent");
let VehicleHitComponent = class VehicleHitComponent extends BaseHitComponent_1.BaseHitComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Qr_ = void 0),
      (this.ph_ = void 0),
      (this.vHr = void 0),
      (this.hXs = void 0);
  }
  OnStart() {
    (this.Hte = this.Entity.GetComponent(231)),
      (this.Qr_ = this.Entity.GetComponent(19)),
      (this.ph_ = this.Entity.GetComponent(234)),
      (this.vHr = this.Entity.GetComponent(120));
    var t = this.Hte?.Actor.CharRenderingComponent;
    return (
      t && (this.hXs = new BaseHitComponent_1.OnHitMaterialAction(t, this.vHr)),
      !0
    );
  }
  OnHit(t, e) {
    var i = t.DamageId,
      i =
        (1 <= i &&
          ((o = e.ContextId),
          this.Qr_?.ExecuteBulletDamage(
            t.BulletEntityId,
            {
              DamageDataId: i,
              SkillLevel: t.SkillLevel,
              Attacker: t.Attacker,
              HitPosition: t.HitPosition.ToUeVector(),
              IsAddEnergy: !1,
              IsCounterAttack: !1,
              ForceCritical: !1,
              IsBlocked: !1,
              PartId: -1,
              ExtraRate: 1,
              BulletId: t.BulletId,
            },
            o,
          )),
        this.ph_?.CheckCanPerformHit() ?? !0),
      o =
        (i && (this.ph_?.OnBulletHit(t, e), this.ProcessOnHitMaterial(t)),
        e.AttackerCreatureDataComp?.GetCreatureDataId() ?? 0);
    this.HitRequest(e.Entity, o, t);
  }
  ProcessOnHitMaterial(e) {
    if (ModelManager_1.ModelManager.BulletModel.OpenHitMaterial && this.hXs) {
      var i = e.ReBulletData.Render.OnHitMaterialEffect;
      if (!StringUtils_1.StringUtils.IsNothing(i)) {
        var o = e.Attacker,
          e = e.BulletEntityId,
          s = o.Id;
        if (this.hXs.ComparePriority(e, s)) {
          this.hXs.Stop(!0);
          let t = void 0;
          o = o?.GetComponent(3);
          o && (t = o?.GetReplaceEffect(i)),
            this.hXs.Start(
              t || i,
              ModelManager_1.ModelManager.BulletModel.OnHitMaterialMsDelay,
              e,
              s,
              void 0,
            );
        }
      }
    }
  }
};
(VehicleHitComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(269)],
  VehicleHitComponent,
)),
  (exports.VehicleHitComponent = VehicleHitComponent);
//# sourceMappingURL=VehicleHitComponent.js.map
