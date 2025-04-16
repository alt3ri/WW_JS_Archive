"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    var i,
      l = arguments.length,
      a =
        l < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, r, o);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (i = e[s]) && (a = (l < 3 ? i(a) : 3 < l ? i(t, r, a) : i(t, r)) || a);
    return 3 < l && a && Object.defineProperty(t, r, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCasterStationary = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  BulletCasterCommon_1 = require("./BulletCasterCommon"),
  BulletCasterFactory_1 = require("./BulletCasterFactory");
let BulletCasterStationary = class BulletCasterStationary extends BulletCasterCommon_1.BulletCasterCommon {
  constructor() {
    super(...arguments), (this.Aec = "radius");
  }
  OnStart() {}
  SetEffectParam(e) {
    var t = new EffectParameterNiagara_1.EffectParameterNiagara();
    (t.UserParameterFloat = [
      [
        FNameUtil_1.FNameUtil.GetDynamicFName(this.Aec),
        this.CasterConfig.WarningWidth,
      ],
    ]),
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t);
  }
  StartImmediately() {
    const e = this.PlayWarningEffect(),
      t =
        (EffectSystem_1.EffectSystem.IsValid(e) &&
          this.WarningEffectHandles.add(e),
        TimerSystem_1.TimerSystem.Delay(() => {
          EffectSystem_1.EffectSystem.IsValid(e) &&
            EffectSystem_1.EffectSystem.StopEffectById(
              e,
              "[BulletCaster] WarnEnd",
              !1,
            ),
            this.WarningEffectHandles.delete(e),
            this.BulletWaitWarningTimers.delete(t),
            this.Pec();
        }, this.CasterConfig.WarningTime));
    t && this.BulletWaitWarningTimers.add(t),
      this.SetTimeDilationRespectOwnerEntity();
  }
  Pec() {
    var e = this.OwnerEntity.GetComponent(1).ActorTransform,
      e = this.CasterRelTransform.ToUeTransform().op_Multiply(e),
      t =
        ControllerHolder_1.ControllerHolder.BulletController.GetSceneBulletOwner();
    if (!t?.IsInit)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            72,
            "Bullet生成错误, 找场景子弹owner还未初始化",
            ["OwnerEntityId", this.OwnerEntity.Id],
            ["sceneBulletOwner", t],
            ["MovementType", IComponent_1.EBatchBulletMovementType.Stationary],
          ),
        -1
      );
    t =
      ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
        t.Entity,
        this.CasterConfig.BulletType.toString(),
        e,
        { InitTargetLocation: e.GetLocation() },
        this.BulletContextId,
      );
    if (!t?.Valid)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            72,
            "Bullet生成错误",
            ["OwnerEntityId", this.OwnerEntity.Id],
            ["BulletContextId", this.BulletContextId],
            ["MovementType", IComponent_1.EBatchBulletMovementType.Stationary],
          ),
        -1
      );
    const r = t.Id;
    ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(
      r,
      0,
    );
    e = TimerSystem_1.TimerSystem.Delay(() => {
      this.DestroyBulletTimers.delete(r),
        ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(
          r,
          !1,
        );
    }, this.CasterConfig.FlyTime);
    return e && this.DestroyBulletTimers.set(r, e), r;
  }
};
(BulletCasterStationary = __decorate(
  [
    BulletCasterFactory_1.BulletCasterClassFactory.Register(
      IComponent_1.EBatchBulletMovementType.Stationary,
    ),
  ],
  BulletCasterStationary,
)),
  (exports.BulletCasterStationary = BulletCasterStationary);
//# sourceMappingURL=BulletCasterStationary.js.map
