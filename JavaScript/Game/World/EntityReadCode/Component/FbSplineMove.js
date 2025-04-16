"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSplineMove = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbSplineMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.bOh = !1),
      (this.LOh = void 0),
      (this.qmh = !1),
      (this.H8o = 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.QRh = !1),
      (this.KRh = !1),
      (this.zuh = !1),
      (this.Juh = !1);
  }
  static Create(t) {
    if (t) return new FbSplineMove(t);
  }
  get StateConditions() {
    if (!this.bOh) {
      (this.bOh = !0), (this.LOh = new Array());
      var i = this.FbDataInternal.stateConditionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stateConditions(
            t,
            new fb_condition_1.EntityStateCondition(),
          );
          this.LOh.push(
            FbEntityStateCondition_1.FbEntityStateCondition.Create(s),
          );
        }
    }
    return this.LOh;
  }
  get Speed() {
    return (
      this.qmh || ((this.qmh = !0), (this.H8o = this.FbDataInternal.speed())),
      this.H8o
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get IsCircle() {
    return (
      this.QRh ||
        ((this.QRh = !0), (this.KRh = this.FbDataInternal.isCircle())),
      this.KRh
    );
  }
  get IsLookDir() {
    return (
      this.zuh ||
        ((this.zuh = !0), (this.Juh = this.FbDataInternal.isLookDir())),
      this.Juh
    );
  }
}
exports.FbSplineMove = FbSplineMove;
//# sourceMappingURL=FbSplineMove.js.map
