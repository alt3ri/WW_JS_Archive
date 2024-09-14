"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicFreezeController = void 0);
const BulletUtil_1 = require("../BulletUtil"),
  BulletHitActorData_1 = require("../Model/BulletHitActorData"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicFreezeController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.a7o = this.Bullet.GetBulletInfo()), (this.h7o = t);
  }
  BulletLogicAction(t = void 0) {
    let e = void 0;
    t && t instanceof BulletHitActorData_1.BulletHitActorData && (e = t.Entity);
    var l = this.C7o(this.h7o.Target, e),
      r = this.h7o.Tags.GameplayTags.Num();
    if (l || !(0 < r)) {
      for (let t = 0; t < r; ++t)
        if (
          !l.GetComponent(190).HasTag(this.h7o.Tags.GameplayTags.Get(t)?.TagId)
        )
          return;
      BulletUtil_1.BulletUtil.FrozenBulletTime(this.a7o, this.h7o.FreezeTime);
    }
  }
  C7o(t, e) {
    switch (t) {
      case 1:
        return this.a7o.Attacker;
      case 2:
        return e;
      default:
        return this.a7o.Attacker;
    }
  }
}
exports.BulletLogicFreezeController = BulletLogicFreezeController;
//# sourceMappingURL=BulletLogicFreezeController.js.map
