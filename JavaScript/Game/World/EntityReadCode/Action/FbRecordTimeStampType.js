"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRecordTimeStampType = void 0);
class FbRecordTimeStampType {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.d4_ = !1),
      (this.m4_ = void 0);
  }
  static Create(t) {
    if (t) return new FbRecordTimeStampType(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TimeStampType() {
    return (
      this.d4_ ||
        ((this.d4_ = !0), (this.m4_ = this.FbDataInternal.timeStampType())),
      this.m4_
    );
  }
}
exports.FbRecordTimeStampType = FbRecordTimeStampType;
//# sourceMappingURL=FbRecordTimeStampType.js.map
