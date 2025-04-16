"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckEntityDistanceCondition = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCheckEntityDistanceCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.LJh = !1),
      (this.AJh = void 0),
      (this.xJh = !1),
      (this.RJh = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.rdh = !1),
      (this.odh = 0);
  }
  static Create(t) {
    if (t) return new FbCheckEntityDistanceCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetA() {
    var t, i;
    return (
      !this.LJh &&
        ((this.LJh = !0),
        (t = this.FbDataInternal.targetAType()),
        (i =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.AJh =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.targetA(i),
          )),
      this.AJh
    );
  }
  get TargetB() {
    var t, i;
    return (
      !this.xJh &&
        ((this.xJh = !0),
        (t = this.FbDataInternal.targetBType()),
        (i =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.RJh =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.targetB(i),
          )),
      this.RJh
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Distance() {
    return (
      this.rdh ||
        ((this.rdh = !0), (this.odh = this.FbDataInternal.distance())),
      this.odh
    );
  }
}
exports.FbCheckEntityDistanceCondition = FbCheckEntityDistanceCondition;
//# sourceMappingURL=FbCheckEntityDistanceCondition.js.map
