"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicSpeedReduceController = void 0);
const BulletLogicController_1 = require("./BulletLogicController"),
  TOLERANCE = 1e-5,
  MIN_WEIGHT = 50;
class BulletLogicSpeedReduceController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this._9o = this.Bullet.GetBulletInfo()), (this.u9o = t);
  }
  BulletLogicAction(t = 0) {
    var e,
      l =
        (l = this._9o.AttackerMoveComp.CharacterWeight) < MIN_WEIGHT
          ? MIN_WEIGHT
          : l,
      o = this._9o.CollisionInfo.GetFirstVictim([1]);
    o?.Valid &&
      ((e =
        l -
        0.1 *
          (o =
            (o = o?.GetComponent(161).CharacterWeight) < MIN_WEIGHT
              ? MIN_WEIGHT
              : o) *
          this.u9o.SpeedDampingRatio),
      (o =
        (o =
          0 <
          (o =
            (l = l + 0.1 * o * this.u9o.SpeedDampingRatio) < TOLERANCE || e < 0
              ? 0
              : this._9o.MoveInfo.BulletSpeed * (e / l))
            ? o
            : 0) < this.u9o.MinSpeed
          ? 0
          : o),
      (this._9o.MoveInfo.BulletSpeed = o));
  }
  BulletLogicActionOnHitObstacles(t = 0) {
    this.u9o.IsNotThroughObstacles && (this._9o.MoveInfo.BulletSpeed = 0);
  }
}
exports.BulletLogicSpeedReduceController = BulletLogicSpeedReduceController;
//# sourceMappingURL=BulletLogicSpeedReduceController.js.map
