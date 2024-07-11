"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionUpdateLiveTime = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const BulletController_1 = require("../BulletController");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateLiveTime extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    this.BulletInfo.LiveTime = 0;
  }
  AfterTick(t) {
    const e = this.BulletInfo.Actor;
    const i = this.BulletInfo.Entity.TimeDilation;
    const l = this.BulletInfo.BulletDataMain;
    e?.IsValid()
      ? ((this.BulletInfo.LiveTime += t * e.CustomTimeDilation * i),
        e.IsActorBeingDestroyed()
          ? (this.K5o(),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                18,
                "子弹Actor.IsActorBeingDestroyed为true",
                ["子弹Id", this.BulletInfo.BulletRowName],
              ))
          : l.Base.Duration < 0 ||
            (this.BulletInfo.LiveTime >
            l.Base.Duration * TimeUtil_1.TimeUtil.InverseMillisecond
              ? ((this.BulletInfo.IsTimeNotEnough = !0), this.K5o())
              : this.BulletInfo.AttackerHandle || this.K5o()))
      : ((this.BulletInfo.LiveTime += t * i),
        this.K5o(),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 18, "子弹Actor被意外销毁", [
            "子弹Id",
            this.BulletInfo.BulletRowName,
          ]));
  }
  K5o() {
    BulletController_1.BulletController.DestroyBullet(
      this.BulletInfo.BulletEntityId,
      !1,
    ),
      (this.IsFinish = !0);
  }
}
exports.BulletActionUpdateLiveTime = BulletActionUpdateLiveTime;
// # sourceMappingURL=BulletActionUpdateLiveTime.js.map
