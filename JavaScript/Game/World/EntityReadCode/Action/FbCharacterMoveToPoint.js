"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCharacterMoveToPoint = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCharacterMoveToPoint {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.uch = !1),
      (this.dch = void 0),
      (this._dh = !1),
      (this.cdh = void 0);
  }
  static Create(t) {
    if (t) return new FbCharacterMoveToPoint(t);
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
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.pos(),
        ))),
      this.dch
    );
  }
  get MoveType() {
    return (
      this._dh ||
        ((this._dh = !0), (this.cdh = this.FbDataInternal.moveType())),
      this.cdh
    );
  }
}
exports.FbCharacterMoveToPoint = FbCharacterMoveToPoint;
//# sourceMappingURL=FbCharacterMoveToPoint.js.map
