"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCloseSplineMove = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCloseSplineMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.kuh = !1),
      (this.Guh = 0);
  }
  static Create(t) {
    if (t) return new FbCloseSplineMove(t);
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
}
exports.FbCloseSplineMove = FbCloseSplineMove;
//# sourceMappingURL=FbCloseSplineMove.js.map
