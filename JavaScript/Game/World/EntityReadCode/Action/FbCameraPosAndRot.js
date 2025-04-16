"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCameraPosAndRot = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCameraPosAndRot {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._fh = !1),
      (this.cfh = void 0),
      (this.ufh = !1),
      (this.dfh = void 0);
  }
  static Create(t) {
    if (t) return new FbCameraPosAndRot(t);
  }
  get CameraOffset() {
    return (
      this._fh ||
        ((this._fh = !0),
        (this.cfh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.cameraOffset(),
        ))),
      this.cfh
    );
  }
  get CameraRotate() {
    return (
      this.ufh ||
        ((this.ufh = !0),
        (this.dfh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.cameraRotate(),
        ))),
      this.dfh
    );
  }
}
exports.FbCameraPosAndRot = FbCameraPosAndRot;
//# sourceMappingURL=FbCameraPosAndRot.js.map
