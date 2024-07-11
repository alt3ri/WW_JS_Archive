"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionUpdateLiveTime = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  BulletController_1 = require("../BulletController"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateLiveTime extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    (this.BulletInfo.LiveTime = 0),
      (this.BulletInfo.LiveTimeAddDelta = 0),
      (this.BulletInfo.CreateFrame = 0);
  }
  AfterTick(t) {
    0 === this.BulletInfo.CreateFrame &&
      (this.BulletInfo.CreateFrame = Time_1.Time.Frame),
      (this.BulletInfo.LiveTime = this.BulletInfo.LiveTimeAddDelta);
    var e = this.BulletInfo.Actor,
      i = this.BulletInfo.BulletDataMain;
    e?.IsValid()
      ? e.IsActorBeingDestroyed()
        ? (this.HVo(),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "子弹Actor.IsActorBeingDestroyed为true",
              ["子弹Id", this.BulletInfo.BulletRowName],
            ))
        : i.Base.Duration < 0 ||
          (this.BulletInfo.LiveTime >=
          i.Base.Duration * TimeUtil_1.TimeUtil.InverseMillisecond
            ? ((this.BulletInfo.IsTimeNotEnough = !0), this.HVo())
            : this.BulletInfo.AttackerHandle || this.HVo())
      : (this.HVo(),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 18, "子弹Actor被意外销毁", [
            "子弹Id",
            this.BulletInfo.BulletRowName,
          ]));
  }
  HVo() {
    BulletController_1.BulletController.DestroyBullet(
      this.BulletInfo.BulletEntityId,
      !1,
    ),
      (this.IsFinish = !0);
  }
}
exports.BulletActionUpdateLiveTime = BulletActionUpdateLiveTime;
//# sourceMappingURL=BulletActionUpdateLiveTime.js.map
