"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPhysicsAngularLimit = void 0);
const UnionAngularConstraintMotionHelper_1 = require("./UnionAngularConstraintMotionHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPhysicsAngularLimit {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.dZh = !1),
      (this.mZh = void 0),
      (this.CZh = !1),
      (this.gZh = void 0),
      (this.fZh = !1),
      (this.pZh = void 0),
      (this.vZh = !1),
      (this.yZh = void 0);
  }
  static Create(t) {
    if (t) return new FbPhysicsAngularLimit(t);
  }
  get Swing1Motion() {
    var t, i;
    return (
      !this.dZh &&
        ((this.dZh = !0),
        (t = this.FbDataInternal.swing1MotionType()),
        (i =
          UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.GetUnionAngularConstraintMotionObject(
            t,
          ))) &&
        (this.mZh =
          UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.ReadUnionAngularConstraintMotion(
            t,
            this.FbDataInternal.swing1Motion(i),
          )),
      this.mZh
    );
  }
  get Swing2Motion() {
    var t, i;
    return (
      !this.CZh &&
        ((this.CZh = !0),
        (t = this.FbDataInternal.swing2MotionType()),
        (i =
          UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.GetUnionAngularConstraintMotionObject(
            t,
          ))) &&
        (this.gZh =
          UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.ReadUnionAngularConstraintMotion(
            t,
            this.FbDataInternal.swing2Motion(i),
          )),
      this.gZh
    );
  }
  get TwistMotion() {
    var t, i;
    return (
      !this.fZh &&
        ((this.fZh = !0),
        (t = this.FbDataInternal.twistMotionType()),
        (i =
          UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.GetUnionAngularConstraintMotionObject(
            t,
          ))) &&
        (this.pZh =
          UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.ReadUnionAngularConstraintMotion(
            t,
            this.FbDataInternal.twistMotion(i),
          )),
      this.pZh
    );
  }
  get AngularRotationOffset() {
    return (
      this.vZh ||
        ((this.vZh = !0),
        (this.yZh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.angularRotationOffset(),
        ))),
      this.yZh
    );
  }
}
exports.FbPhysicsAngularLimit = FbPhysicsAngularLimit;
//# sourceMappingURL=FbPhysicsAngularLimit.js.map
