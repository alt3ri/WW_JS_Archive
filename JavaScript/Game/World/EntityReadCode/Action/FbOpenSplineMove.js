"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenSplineMove = void 0);
const UnionSplineMovePatternHelper_1 = require("./UnionSplineMovePatternHelper"),
  UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbOpenSplineMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.Pbh = !1),
      (this.Ubh = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenSplineMove(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Target() {
    var t, e;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (e =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.NHo =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.target(e),
          )),
      this.NHo
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get Pattern() {
    var t, e;
    return (
      !this.Pbh &&
        ((this.Pbh = !0),
        (t = this.FbDataInternal.patternType()),
        (e =
          UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.GetUnionSplineMovePatternObject(
            t,
          ))) &&
        (this.Ubh =
          UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.ReadUnionSplineMovePattern(
            t,
            this.FbDataInternal.pattern(e),
          )),
      this.Ubh
    );
  }
}
exports.FbOpenSplineMove = FbOpenSplineMove;
//# sourceMappingURL=FbOpenSplineMove.js.map
