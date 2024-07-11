"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicAdditiveAccelerateController = void 0);
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicAdditiveAccelerateController extends BulletLogicController_1.BulletLogicController {
  constructor(e, t) {
    super(e, t), (this.a7o = t.GetBulletInfo());
  }
  BulletLogicAction() {
    var e,
      t = this.LogicController;
    2 !== this.a7o.BulletDataMain.Move.Trajectory &&
      (((e = this.a7o.MoveInfo).AdditiveAccelerateCurve = t.AccelerationCurve),
      e.BaseAdditiveAccelerate.FromUeVector(t.Acceleration),
      e.AdditiveAccelerate.FromUeVector(t.Acceleration));
  }
}
exports.BulletLogicAdditiveAccelerateController =
  BulletLogicAdditiveAccelerateController;
//# sourceMappingURL=BulletLogicAdditiveAccelerateController.js.map
