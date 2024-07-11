"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionTimeScale = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PawnTimeScaleComponent_1 = require("../../Pawn/Component/PawnTimeScaleComponent"),
  BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionTimeScale extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.V5o = -0), (this.H5o = void 0), (this.j5o = -0);
  }
  OnExecute() {
    if (this.BulletInfo.BulletDataMain.TimeScale.TimeScaleWithAttacker)
      this.H5o = this.BulletInfo.Attacker.GetComponent(107);
    else {
      (this.BulletInfo.TimeScaleList = new PriorityQueue_1.PriorityQueue(
        PawnTimeScaleComponent_1.PawnTimeScaleComponent.CompareScalePriority,
      )),
        (this.BulletInfo.TimeScaleMap = new Map()),
        (this.BulletInfo.TimeScaleId = 1);
      var t = Time_1.Time.WorldTimeSeconds,
        i = ModelManager_1.ModelManager.BulletModel.PersistentTimeScaleMap;
      for (const o of i.values()) {
        var e = t - o.StartTime;
        if (e >= o.Duration) i.delete(o.TimeScaleId);
        else {
          if (o.CenterLocation) {
            var s = this.BulletInfo.CollisionInfo.LastFramePosition;
            if (!s) continue;
            if (
              Math.abs(s.X - o.CenterLocation.X) > o.Radius ||
              Math.abs(s.Y - o.CenterLocation.Y) > o.Radius ||
              Math.abs(s.Z - o.CenterLocation.Z) > o.Radius
            )
              continue;
          }
          BulletUtil_1.BulletUtil.SetTimeScale(
            this.BulletInfo,
            o.Priority,
            o.TimeDilation,
            o.Curve,
            o.Duration,
            o.SourceType,
            e,
            o.TimeScaleId,
          );
        }
      }
    }
  }
  OnTick(t) {
    var i,
      e = this.BulletInfo.Entity.TimeDilation;
    if (this.BulletInfo.BulletDataMain.TimeScale.TimeScaleWithAttacker)
      return (
        (i = this.H5o),
        (this.V5o = i.Active ? i.CurrentTimeScale : 1),
        this.j5o === this.V5o
          ? void 0
          : ((this.j5o = this.V5o),
            (this.BulletInfo.Actor.CustomTimeDilation = this.V5o),
            void BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
              this.BulletInfo.EffectInfo,
              this.V5o * e,
            ))
      );
    for (
      var s = Time_1.Time.WorldTimeSeconds;
      !this.BulletInfo.TimeScaleList.Empty &&
      (this.BulletInfo.TimeScaleList.Top.EndTime <= s ||
        this.BulletInfo.TimeScaleList.Top.MarkDelete);

    ) {
      var o = this.BulletInfo.TimeScaleList.Pop();
      this.BulletInfo.TimeScaleMap.delete(o.Id);
    }
    this.BulletInfo.TimeScaleList.Empty
      ? (this.V5o = 1)
      : (this.V5o = this.BulletInfo.TimeScaleList.Top.CalculateTimeScale()),
      (e *= this.V5o),
      this.j5o !== e &&
        ((this.j5o = e),
        (this.BulletInfo.Actor.CustomTimeDilation = this.V5o),
        BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
          this.BulletInfo.EffectInfo,
          e,
        ));
  }
  Clear() {
    super.Clear(), (this.V5o = 0), (this.H5o = void 0), (this.j5o = 0);
  }
}
exports.BulletActionTimeScale = BulletActionTimeScale;
//# sourceMappingURL=BulletActionTimeScale.js.map
