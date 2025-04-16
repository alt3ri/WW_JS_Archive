"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMoveToRelativePosition = void 0);
const UnionMoveToPointTypeHelper_1 = require("./UnionMoveToPointTypeHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbMoveToRelativePosition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.zEh = !1),
      (this.JEh = void 0),
      (this.WEh = !1),
      (this.QEh = void 0);
  }
  static Create(t) {
    if (t) return new FbMoveToRelativePosition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Point() {
    return (
      this.zEh ||
        ((this.zEh = !0),
        (this.JEh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.point(),
        ))),
      this.JEh
    );
  }
  get MoveMotion() {
    var t, e;
    return (
      !this.WEh &&
        ((this.WEh = !0),
        (t = this.FbDataInternal.moveMotionType()),
        (e =
          UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.GetUnionMoveToPointTypeObject(
            t,
          ))) &&
        (this.QEh =
          UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.ReadUnionMoveToPointType(
            t,
            this.FbDataInternal.moveMotion(e),
          )),
      this.QEh
    );
  }
}
exports.FbMoveToRelativePosition = FbMoveToRelativePosition;
//# sourceMappingURL=FbMoveToRelativePosition.js.map
