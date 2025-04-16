"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableMapMark = void 0);
class FbDisableMapMark {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.yLh = !1),
      (this.SLh = 0);
  }
  static Create(t) {
    if (t) return new FbDisableMapMark(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MarkId() {
    return (
      this.yLh || ((this.yLh = !0), (this.SLh = this.FbDataInternal.markId())),
      this.SLh
    );
  }
}
exports.FbDisableMapMark = FbDisableMapMark;
//# sourceMappingURL=FbDisableMapMark.js.map
