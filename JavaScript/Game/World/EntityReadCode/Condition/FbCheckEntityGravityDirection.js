"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckEntityGravityDirection = void 0);
const UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper"),
  UnionCheckTargetHelper_1 = require("./UnionCheckTargetHelper");
class FbCheckEntityGravityDirection {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.yUh = !1),
      (this.SUh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckEntityGravityDirection(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Target() {
    var t, i;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (i =
          UnionCheckTargetHelper_1.UnionCheckTargetHelper.GetUnionCheckTargetObject(
            t,
          ))) &&
        (this.NHo =
          UnionCheckTargetHelper_1.UnionCheckTargetHelper.ReadUnionCheckTarget(
            t,
            this.FbDataInternal.target(i),
          )),
      this.NHo
    );
  }
  get GravityDirection() {
    var t, i;
    return (
      !this.yUh &&
        ((this.yUh = !0),
        (t = this.FbDataInternal.gravityDirectionType()),
        (i =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(
            t,
          ))) &&
        (this.SUh =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(
            t,
            this.FbDataInternal.gravityDirection(i),
          )),
      this.SUh
    );
  }
}
exports.FbCheckEntityGravityDirection = FbCheckEntityGravityDirection;
//# sourceMappingURL=FbCheckEntityGravityDirection.js.map
