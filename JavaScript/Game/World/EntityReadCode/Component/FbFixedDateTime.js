"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixedDateTime = void 0);
class FbFixedDateTime {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ZDh = !1),
      (this.eBh = 0),
      (this.tBh = !1),
      (this.iBh = 0),
      (this.rBh = !1),
      (this.oBh = 0);
  }
  static Create(t) {
    if (t) return new FbFixedDateTime(t);
  }
  get Hours() {
    return (
      this.ZDh || ((this.ZDh = !0), (this.eBh = this.FbDataInternal.hours())),
      this.eBh
    );
  }
  get Minutes() {
    return (
      this.tBh || ((this.tBh = !0), (this.iBh = this.FbDataInternal.minutes())),
      this.iBh
    );
  }
  get Seconds() {
    return (
      this.rBh || ((this.rBh = !0), (this.oBh = this.FbDataInternal.seconds())),
      this.oBh
    );
  }
}
exports.FbFixedDateTime = FbFixedDateTime;
//# sourceMappingURL=FbFixedDateTime.js.map
