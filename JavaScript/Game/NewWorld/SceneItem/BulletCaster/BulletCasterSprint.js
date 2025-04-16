"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    var i,
      l = arguments.length,
      s =
        l < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, r, o);
    else
      for (var _ = e.length - 1; 0 <= _; _--)
        (i = e[_]) && (s = (l < 3 ? i(s) : 3 < l ? i(t, r, s) : i(t, r)) || s);
    return 3 < l && s && Object.defineProperty(t, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCasterSprint = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  BulletCasterCommon_1 = require("./BulletCasterCommon"),
  BulletCasterFactory_1 = require("./BulletCasterFactory"),
  WARNING_EFFECT_LENGTH_KEY = "length",
  WARNING_EFFECT_WIDTH_KEY = "width";
let BulletCasterSprint = class BulletCasterSprint extends BulletCasterCommon_1.BulletCasterCommon {
  OnStart() {}
  StartImmediately() {
    if (this.CasterConfig.FlyTime < TimerSystem_1.MIN_TIME)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneItem", 39, "Bullet飞行时间<=0", [
          "OwnerEntityId",
          this.OwnerEntity.Id,
        ]);
    else {
      var e = this.OwnerEntity.GetComponent(1).ActorTransform,
        t = this.CasterRelTransform.ToUeTransform().op_Multiply(e),
        r = MathUtils_1.MathUtils.CommonTempVector,
        e =
          (this.CasterRelTransform.GetRotation()
            .GetForwardVector(r)
            .GetSafeNormal(r, MathUtils_1.MathUtils.SmallNumber),
          r.MultiplyEqual(this.CasterConfig.FlyDistance),
          e.TransformVector(r.ToUeVector())),
        r =
          ControllerHolder_1.ControllerHolder.BulletController.GetSceneBulletOwner();
      if (r?.IsInit) {
        (e = t.GetLocation().op_Addition(e)),
          (r =
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneItem",
                39,
                "Bullet生成",
                ["InitLoc", t.GetLocation()],
                ["TargetLoc", e],
              ),
            ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
              r.Entity,
              this.CasterConfig.BulletType.toString(),
              t,
              { InitTargetLocation: e },
              this.BulletContextId,
            )));
        if (r?.Valid) {
          const o = r.Id;
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Bullet", 39, "创建子弹", ["BulletId", o]);
          t = TimerSystem_1.TimerSystem.Delay(() => {
            this.DestroyBulletTimers.delete(o),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Bullet", 39, "Timer销毁子弹", ["BulletId", o]),
              ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(
                o,
                !1,
              );
          }, this.CasterConfig.WarningTime + this.CasterConfig.FlyTime);
          t && this.DestroyBulletTimers.set(o, t);
          const i =
            this.CasterConfig.FlyDistance /
            (this.CasterConfig.FlyTime *
              CommonDefine_1.SECOND_PER_MILLIONSECOND);
          if (this.CasterConfig.WarningTime < TimerSystem_1.MIN_TIME)
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(
              o,
              i,
            );
          else {
            const l = this.PlayWarningEffect(),
              s =
                (EffectSystem_1.EffectSystem.IsValid(l) &&
                  this.WarningEffectHandles.add(l),
                ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(
                  o,
                  0,
                ),
                TimerSystem_1.TimerSystem.Delay(() => {
                  EffectSystem_1.EffectSystem.IsValid(l) &&
                    EffectSystem_1.EffectSystem.StopEffectById(
                      l,
                      "[BulletCaster] WarnEnd",
                      !1,
                    ),
                    this.WarningEffectHandles.delete(l),
                    this.BulletWaitWarningTimers.delete(s),
                    ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(
                      o,
                      i,
                    );
                }, this.CasterConfig.WarningTime));
            s && this.BulletWaitWarningTimers.add(s);
          }
          this.SetTimeDilationRespectOwnerEntity();
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            39,
            "Bullet生成错误, 找不到场景子弹owner",
            ["OwnerEntityId", this.OwnerEntity.Id],
          );
    }
  }
  SetEffectParam(e) {
    var t = new EffectParameterNiagara_1.EffectParameterNiagara();
    (t.UserParameterFloat = [
      [
        FNameUtil_1.FNameUtil.GetDynamicFName(WARNING_EFFECT_LENGTH_KEY),
        this.CasterConfig.FlyDistance,
      ],
      [
        FNameUtil_1.FNameUtil.GetDynamicFName(WARNING_EFFECT_WIDTH_KEY),
        this.CasterConfig.WarningWidth,
      ],
    ]),
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t);
  }
};
(BulletCasterSprint = __decorate(
  [
    BulletCasterFactory_1.BulletCasterClassFactory.Register(
      IComponent_1.EBatchBulletMovementType.Sprint,
    ),
  ],
  BulletCasterSprint,
)),
  (exports.BulletCasterSprint = BulletCasterSprint);
//# sourceMappingURL=BulletCasterSprint.js.map
