"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicFreezeController = void 0);
const BulletUtil_1 = require("../BulletUtil"),
  BulletHitActorData_1 = require("../Model/BulletHitActorData"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicFreezeController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this._9o = this.Bullet.GetBulletInfo()), (this.u9o = t);
  }
  BulletLogicAction(t = void 0) {
    let e = void 0;
    t && t instanceof BulletHitActorData_1.BulletHitActorData && (e = t.Entity);
    var l = this.p9o(this.u9o.Target, e),
      r = this.u9o.Tags.GameplayTags.Num();
    if (l || !(0 < r)) {
      for (let t = 0; t < r; ++t)
        if (
          !l.GetComponent(185).HasTag(this.u9o.Tags.GameplayTags.Get(t)?.TagId)
        )
          return;
      BulletUtil_1.BulletUtil.FrozenBulletTime(this._9o, this.u9o.FreezeTime);
    }
  }
  p9o(t, e) {
    switch (t) {
      case 1:
        return this._9o.Attacker;
      case 2:
        return e;
      default:
        return this._9o.Attacker;
    }
  }
}
exports.BulletLogicFreezeController = BulletLogicFreezeController;
//# sourceMappingURL=BulletLogicFreezeController.js.map
