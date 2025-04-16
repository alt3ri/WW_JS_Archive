"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideByRangeInFlow = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbHideByRangeInFlow {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.nIh = !1),
      (this.n9o = void 0),
      (this.sIh = !1),
      (this.s9o = 0),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.aIh = !1),
      (this.hIh = !1),
      (this.lIh = !1),
      (this._Ih = !1);
  }
  static Create(t) {
    if (t) return new FbHideByRangeInFlow(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
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
  get Radius() {
    return (
      this.sIh || ((this.sIh = !0), (this.s9o = this.FbDataInternal.radius())),
      this.s9o
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var s = this.FbDataInternal.entityIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get IsCleanSimpleNpc() {
    return (
      this.aIh ||
        ((this.aIh = !0), (this.hIh = this.FbDataInternal.isCleanSimpleNpc())),
      this.hIh
    );
  }
  get IsCleanPasserByNpc() {
    return (
      this.lIh ||
        ((this.lIh = !0),
        (this._Ih = this.FbDataInternal.isCleanPasserByNpc())),
      this._Ih
    );
  }
}
exports.FbHideByRangeInFlow = FbHideByRangeInFlow;
//# sourceMappingURL=FbHideByRangeInFlow.js.map
