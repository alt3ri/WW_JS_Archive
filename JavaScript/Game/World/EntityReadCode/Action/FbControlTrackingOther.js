"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbControlTrackingOther = void 0);
class FbControlTrackingOther {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Ayh = !1),
      (this.xyh = void 0);
  }
  static Create(t) {
    if (t) return new FbControlTrackingOther(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Entities() {
    if (!this.Ayh) {
      (this.Ayh = !0), (this.xyh = new Array());
      var i = this.FbDataInternal.entitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.xyh.push(this.FbDataInternal.entities(t));
    }
    return this.xyh;
  }
}
exports.FbControlTrackingOther = FbControlTrackingOther;
//# sourceMappingURL=FbControlTrackingOther.js.map
