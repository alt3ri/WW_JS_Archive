"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetPlayerCameraFocus = void 0);
const UnionResetPlayerFocusTypeHelper_1 = require("./UnionResetPlayerFocusTypeHelper");
class FbResetPlayerCameraFocus {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.CH_ = !1),
      (this.pH_ = void 0),
      (this.mch = !1),
      (this.Cch = 0),
      (this.B9_ = !1),
      (this.k9_ = !1),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(e) {
    if (e) return new FbResetPlayerCameraFocus(e);
  }
  get ResetType() {
    var e, t;
    return (
      !this.CH_ &&
        ((this.CH_ = !0),
        (e = this.FbDataInternal.resetTypeType()),
        (t =
          UnionResetPlayerFocusTypeHelper_1.UnionResetPlayerFocusTypeHelper.GetUnionResetPlayerFocusTypeObject(
            e,
          ))) &&
        (this.pH_ =
          UnionResetPlayerFocusTypeHelper_1.UnionResetPlayerFocusTypeHelper.ReadUnionResetPlayerFocusType(
            e,
            this.FbDataInternal.resetType(t),
          )),
      this.pH_
    );
  }
  get FadeInTime() {
    return (
      this.mch ||
        ((this.mch = !0), (this.Cch = this.FbDataInternal.fadeInTime())),
      this.Cch
    );
  }
  get CannotInterrupt() {
    return (
      this.B9_ ||
        ((this.B9_ = !0), (this.k9_ = this.FbDataInternal.cannotInterrupt())),
      this.k9_
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbResetPlayerCameraFocus = FbResetPlayerCameraFocus;
//# sourceMappingURL=FbResetPlayerCameraFocus.js.map
