"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCameraData = void 0);
const FbFlowTemplateMode_1 = require("./FbFlowTemplateMode"),
  FbSetCameraAnim_1 = require("./FbSetCameraAnim");
class FbCameraData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Ygh = !1),
      (this.zgh = void 0),
      (this.Jgh = !1),
      (this.Zgh = void 0);
  }
  static Create(t) {
    if (t) return new FbCameraData(t);
  }
  get Camera() {
    return (
      this.Ygh ||
        ((this.Ygh = !0),
        (this.zgh = FbFlowTemplateMode_1.FbFlowTemplateMode.Create(
          this.FbDataInternal.camera(),
        ))),
      this.zgh
    );
  }
  get CameraAnim() {
    return (
      this.Jgh ||
        ((this.Jgh = !0),
        (this.Zgh = FbSetCameraAnim_1.FbSetCameraAnim.Create(
          this.FbDataInternal.cameraAnim(),
        ))),
      this.Zgh
    );
  }
}
exports.FbCameraData = FbCameraData;
//# sourceMappingURL=FbCameraData.js.map
