"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicSpeedReduceController = void 0);
const BulletLogicController_1 = require("./BulletLogicController"),
  TOLERANCE = 1e-5,
  MIN_WEIGHT = 50;
class BulletLogicSpeedReduceController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.a7o = this.Bullet.GetBulletInfo()), (this.h7o = t);
  }
  BulletLogicAction(t = 0) {
    var e,
      l =
        (l = this.a7o.AttackerMoveComp.CharacterWeight) < MIN_WEIGHT
          ? MIN_WEIGHT
          : l,
      o = this.a7o.CollisionInfo.GetFirstVictim([1]);
    o?.Valid &&
      ((e =
        l -
        0.1 *
          (o =
            (o = o?.GetComponent(163).CharacterWeight) < MIN_WEIGHT
              ? MIN_WEIGHT
              : o) *
          this.h7o.SpeedDampingRatio),
      (o =
        (o =
          0 <
          (o =
            (l = l + 0.1 * o * this.h7o.SpeedDampingRatio) < TOLERANCE || e < 0
              ? 0
              : this.a7o.MoveInfo.BulletSpeed * (e / l))
            ? o
            : 0) < this.h7o.MinSpeed
          ? 0
          : o),
      (this.a7o.MoveInfo.BulletSpeed = o));
  }
  BulletLogicActionOnHitObstacles(t = 0) {
    this.h7o.IsNotThroughObstacles && (this.a7o.MoveInfo.BulletSpeed = 0);
  }
}
exports.BulletLogicSpeedReduceController = BulletLogicSpeedReduceController;
//# sourceMappingURL=BulletLogicSpeedReduceController.js.map
