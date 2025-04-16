"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRenderFogBarrier = void 0);
const UnionTargetEntityHelper_1 = require("../Action/UnionTargetEntityHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbRenderFogBarrier {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.gYh = !1),
      (this.fYh = void 0),
      (this.nIh = !1),
      (this.n9o = void 0),
      (this.oRh = !1),
      (this.n6 = void 0),
      (this.EZh = !1),
      (this.kJ = void 0);
  }
  static Create(t) {
    if (t) return new FbRenderFogBarrier(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CenterTarget() {
    var t, i;
    return (
      !this.gYh &&
        ((this.gYh = !0),
        (t = this.FbDataInternal.centerTargetType()),
        (i =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.fYh =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.centerTarget(i),
          )),
      this.fYh
    );
  }
  get Center() {
    return (
      this.nIh ||
        ((this.nIh = !0),
        (this.n9o = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.center(),
        ))),
      this.n9o
    );
  }
  get Size() {
    return (
      this.oRh ||
        ((this.oRh = !0),
        (this.n6 = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.size(),
        ))),
      this.n6
    );
  }
  get Rotator() {
    return (
      this.EZh ||
        ((this.EZh = !0),
        (this.kJ = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rotator(),
        ))),
      this.kJ
    );
  }
}
exports.FbRenderFogBarrier = FbRenderFogBarrier;
//# sourceMappingURL=FbRenderFogBarrier.js.map
