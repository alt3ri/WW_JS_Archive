"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMaskTransition = void 0);
const FbEaseData_1 = require("./FbEaseData");
class FbMaskTransition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.I_h = !1),
      (this.y6o = 0),
      (this.hLh = !1),
      (this.lLh = void 0),
      (this._Lh = !1),
      (this.cLh = void 0),
      (this.uLh = !1),
      (this.dLh = void 0);
  }
  static Create(t) {
    if (t) return new FbMaskTransition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
  get Mask() {
    return (
      this.hLh || ((this.hLh = !0), (this.lLh = this.FbDataInternal.mask())),
      this.lLh
    );
  }
  get FadeIn() {
    return (
      this._Lh ||
        ((this._Lh = !0),
        (this.cLh = FbEaseData_1.FbEaseData.Create(
          this.FbDataInternal.fadeIn(),
        ))),
      this.cLh
    );
  }
  get FadeOut() {
    return (
      this.uLh ||
        ((this.uLh = !0),
        (this.dLh = FbEaseData_1.FbEaseData.Create(
          this.FbDataInternal.fadeOut(),
        ))),
      this.dLh
    );
  }
}
exports.FbMaskTransition = FbMaskTransition;
//# sourceMappingURL=FbMaskTransition.js.map
