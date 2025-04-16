"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneItemMovementComponent = void 0);
const UnionMovementModeHelper_1 = require("./UnionMovementModeHelper");
class FbSceneItemMovementComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.qRh = !1),
      (this.kRh = void 0);
  }
  static Create(e) {
    if (e) return new FbSceneItemMovementComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Patrol() {
    var e, t;
    return (
      !this.qRh &&
        ((this.qRh = !0),
        (e = this.FbDataInternal.patrolType()),
        (t =
          UnionMovementModeHelper_1.UnionMovementModeHelper.GetUnionMovementModeObject(
            e,
          ))) &&
        (this.kRh =
          UnionMovementModeHelper_1.UnionMovementModeHelper.ReadUnionMovementMode(
            e,
            this.FbDataInternal.patrol(t),
          )),
      this.kRh
    );
  }
}
exports.FbSceneItemMovementComponent = FbSceneItemMovementComponent;
//# sourceMappingURL=FbSceneItemMovementComponent.js.map
