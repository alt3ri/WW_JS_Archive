"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCasterBase = exports.BulletCasterInitParam = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  BulletCasterUtils_1 = require("./BulletCasterUtils");
class BulletCasterInitParam {
  constructor(t, s, e, i, r) {
    (this.OwnerEntity = t),
      (this.CasterConfig = s),
      (this.CasterRelTransform = e),
      (this.BulletContextId = i),
      (this.WarningEffect = r);
  }
}
exports.BulletCasterInitParam = BulletCasterInitParam;
class BulletCasterBase {
  constructor(t) {
    (this.BulletCasterInitParam = t),
      (this.OwnerEntity = void 0),
      (this.CasterConfig = void 0),
      (this.CasterRelTransform = void 0),
      (this.BulletContextId = BigInt(0)),
      (this.WarningEffect = ""),
      (this.sCl = []),
      (this.OwnerEntity = t.OwnerEntity),
      (this.CasterConfig = t.CasterConfig),
      (this.CasterRelTransform = t.CasterRelTransform),
      (this.BulletContextId = t.BulletContextId),
      (this.WarningEffect = t.WarningEffect);
  }
  Start() {
    var t;
    !this.CasterConfig.DelayTime ||
    this.CasterConfig.DelayTime <= TimerSystem_1.MIN_TIME
      ? this.StartImmediately()
      : (t = TimerSystem_1.TimerSystem.Delay(() => {
          this.sCl.pop(), this.StartImmediately();
        }, this.CasterConfig.DelayTime)) && this.sCl.push(t),
      this.SetTimeDilationRespectOwnerEntity(),
      this.OnStart();
  }
  Stop() {
    for (const t of this.sCl) t.Valid() && t.Remove();
    (this.sCl.length = 0), this.OnStop();
  }
  SetTimeDilationRespectOwnerEntity() {
    var t = this.OwnerEntity.GetComponent(120),
      t = this.OwnerEntity.TimeDilation * (t?.CurrentTimeScale ?? 1);
    this.SetTimeDilation(t);
  }
  SetTimeDilation(t) {
    for (const s of this.sCl)
      s.Valid() &&
        BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(s, t);
    this.OnSetTimeDilation(t);
  }
  PlayWarningEffect() {
    var t;
    return 0 === this.WarningEffect.length
      ? 0
      : ((t = this.OwnerEntity.GetComponent(1).ActorTransform),
        (t = this.CasterRelTransform.ToUeTransform().op_Multiply(t)),
        (t = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          t,
          this.WarningEffect,
          "[BatchBulletCasterComponent] PlayWarningEffect",
          new EffectContext_1.EffectContext(this.OwnerEntity.Id),
        )),
        this.SetEffectParam(t),
        t);
  }
}
exports.BulletCasterBase = BulletCasterBase;
//# sourceMappingURL=IBulletCaster.js.map
