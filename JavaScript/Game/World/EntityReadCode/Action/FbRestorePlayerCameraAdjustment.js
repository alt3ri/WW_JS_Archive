"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRestorePlayerCameraAdjustment = void 0);
const FbResetFocusConfig_1 = require("./FbResetFocusConfig");
class FbRestorePlayerCameraAdjustment {
  constructor(e) {
    (this.FbDataInternal = e), (this.obh = !1), (this.nbh = void 0);
  }
  static Create(e) {
    if (e) return new FbRestorePlayerCameraAdjustment(e);
  }
  get ResetFocus() {
    return (
      this.obh ||
        ((this.obh = !0),
        (this.nbh = FbResetFocusConfig_1.FbResetFocusConfig.Create(
          this.FbDataInternal.resetFocus(),
        ))),
      this.nbh
    );
  }
}
exports.FbRestorePlayerCameraAdjustment = FbRestorePlayerCameraAdjustment;
//# sourceMappingURL=FbRestorePlayerCameraAdjustment.js.map
