"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicDestroyBulletController = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletController_1 = require("../BulletController");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
const NONE_STRING = "None";
class BulletLogicDestroyBulletController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.u9o = t);
  }
  BulletLogicAction(e = void 0) {
    if (this.u9o.DestroyBulletRowName !== NONE_STRING) {
      let t = void 0;
      e &&
        e instanceof BulletHitActorData_1.BulletHitActorData &&
        (t = e.Entity);
      e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(
        this.p9o(this.u9o.BulletOwner, t).Id,
      );
      if (e)
        for (const r of e) {
          const l = r.GetBulletInfo();
          l.BulletRowName === this.u9o.DestroyBulletRowName &&
            BulletController_1.BulletController.DestroyBullet(
              l.BulletEntityId,
              this.u9o.SummonChildBullet,
            );
        }
    }
  }
  p9o(t, e) {
    switch (t) {
      case 1:
        return this.Bullet.GetBulletInfo().Attacker;
      case 2:
        return e;
      default:
        return this.Bullet.GetBulletInfo().Attacker;
    }
  }
}
exports.BulletLogicDestroyBulletController = BulletLogicDestroyBulletController;
// # sourceMappingURL=BulletLogicDestroyBulletController.js.map
