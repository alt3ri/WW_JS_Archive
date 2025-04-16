"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDaNpcModel = void 0);
class FbDaNpcModel {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.MKh = !1),
      (this.EKh = void 0);
  }
  static Create(t) {
    if (t) return new FbDaNpcModel(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Da() {
    return (
      this.MKh || ((this.MKh = !0), (this.EKh = this.FbDataInternal.da())),
      this.EKh
    );
  }
}
exports.FbDaNpcModel = FbDaNpcModel;
//# sourceMappingURL=FbDaNpcModel.js.map
