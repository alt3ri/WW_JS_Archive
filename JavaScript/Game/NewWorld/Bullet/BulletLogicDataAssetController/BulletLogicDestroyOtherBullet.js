"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicDestroyOtherBullet = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  BulletController_1 = require("../BulletController"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicDestroyOtherBullet extends BulletLogicController_1.BulletLogicController {
  constructor(t, l) {
    super(t, l);
  }
  OnInit() {
    this.Bullet.GetBulletInfo().BulletDataMain.Execution.SupportCamp.push(
      this.LogicController.Camp,
    );
  }
  BulletLogicAction(t) {
    var l = t.GetBulletInfo(),
      e = this.LogicController.BulletId;
    (!StringUtils_1.StringUtils.IsEmpty(e) && e !== l.BulletRowName) ||
      BulletController_1.BulletController.DestroyBullet(
        t.Id,
        this.LogicController.SummonChildBullet,
      );
  }
}
exports.BulletLogicDestroyOtherBullet = BulletLogicDestroyOtherBullet;
//# sourceMappingURL=BulletLogicDestroyOtherBullet.js.map
