"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowMapMark = void 0);
class FbShowMapMark {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.yLh = !1),
      (this.SLh = 0),
      (this.MLh = !1),
      (this.ELh = !1);
  }
  static Create(t) {
    if (t) return new FbShowMapMark(t);
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
  get IsFocusOnFirstShow() {
    return (
      this.MLh ||
        ((this.MLh = !0),
        (this.ELh = this.FbDataInternal.isFocusOnFirstShow())),
      this.ELh
    );
  }
}
exports.FbShowMapMark = FbShowMapMark;
//# sourceMappingURL=FbShowMapMark.js.map
