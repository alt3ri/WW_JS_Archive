"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionDelayDestroyBullet = void 0);
const BulletController_1 = require("../BulletController"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionDelayDestroyBullet extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.b2o = 0);
  }
  OnExecute() {
    var t = this.ActionInfo;
    t.DelayTime <= 0 ? this.HVo() : (this.b2o = t.DelayTime);
  }
  OnTick(t) {
    var e,
      l,
      s = this.BulletInfo;
    this.BulletInfo.NeedDestroy ||
      ((l = this.ActionInfo),
      (e = s.Entity.TimeDilation),
      !l.IgnoreBulletActorTimeScale && (l = s.Actor)?.IsValid()
        ? (this.b2o -= t * l.CustomTimeDilation * e)
        : (this.b2o -= t * e),
      this.b2o <= 0 && this.HVo());
  }
  HVo() {
    var t = this.ActionInfo;
    BulletController_1.BulletController.DestroyBullet(
      this.BulletInfo.BulletEntityId,
      t.SummonChild,
    ),
      (this.IsFinish = !0);
  }
  Clear() {
    super.Clear(), (this.b2o = 0);
  }
}
exports.BulletActionDelayDestroyBullet = BulletActionDelayDestroyBullet;
//# sourceMappingURL=BulletActionDelayDestroyBullet.js.map
