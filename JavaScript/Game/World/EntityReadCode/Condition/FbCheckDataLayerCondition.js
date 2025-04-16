"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckDataLayerCondition = void 0);
class FbCheckDataLayerCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Nzh = !1),
      (this.Vzh = 0),
      (this.jzh = !1),
      (this.Hzh = !1);
  }
  static Create(t) {
    if (t) return new FbCheckDataLayerCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get DataLayerId() {
    return (
      this.Nzh ||
        ((this.Nzh = !0), (this.Vzh = this.FbDataInternal.dataLayerId())),
      this.Vzh
    );
  }
  get IsLoad() {
    return (
      this.jzh || ((this.jzh = !0), (this.Hzh = this.FbDataInternal.isLoad())),
      this.Hzh
    );
  }
}
exports.FbCheckDataLayerCondition = FbCheckDataLayerCondition;
//# sourceMappingURL=FbCheckDataLayerCondition.js.map
