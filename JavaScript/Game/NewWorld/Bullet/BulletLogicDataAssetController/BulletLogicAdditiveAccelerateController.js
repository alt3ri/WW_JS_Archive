"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicAdditiveAccelerateController = void 0);
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicAdditiveAccelerateController extends BulletLogicController_1.BulletLogicController {
  constructor(e, t) {
    super(e, t), (this._9o = t.GetBulletInfo());
  }
  BulletLogicAction() {
    let e;
    const t = this.LogicController;
    this._9o.BulletDataMain.Move.Trajectory !== 2 &&
      (((e = this._9o.MoveInfo).AdditiveAccelerateCurve = t.AccelerationCurve),
      e.BaseAdditiveAccelerate.FromUeVector(t.Acceleration),
      e.AdditiveAccelerate.FromUeVector(t.Acceleration));
  }
}
exports.BulletLogicAdditiveAccelerateController =
  BulletLogicAdditiveAccelerateController;
// # sourceMappingURL=BulletLogicAdditiveAccelerateController.js.map
