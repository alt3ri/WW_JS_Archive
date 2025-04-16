"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerCameraShake = void 0);
const UnionCameraShakeConfigHelper_1 = require("./UnionCameraShakeConfigHelper");
class FbTriggerCameraShake {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.YLh = !1),
      (this.zLh = void 0),
      (this.JLh = !1),
      (this.ZLh = void 0);
  }
  static Create(e) {
    if (e) return new FbTriggerCameraShake(e);
  }
  get CameraShakeConfig() {
    var e, i;
    return (
      !this.YLh &&
        ((this.YLh = !0),
        (e = this.FbDataInternal.cameraShakeConfigType()),
        (i =
          UnionCameraShakeConfigHelper_1.UnionCameraShakeConfigHelper.GetUnionCameraShakeConfigObject(
            e,
          ))) &&
        (this.zLh =
          UnionCameraShakeConfigHelper_1.UnionCameraShakeConfigHelper.ReadUnionCameraShakeConfig(
            e,
            this.FbDataInternal.cameraShakeConfig(i),
          )),
      this.zLh
    );
  }
  get CameraShakeBp() {
    return (
      this.JLh ||
        ((this.JLh = !0), (this.ZLh = this.FbDataInternal.cameraShakeBp())),
      this.ZLh
    );
  }
}
exports.FbTriggerCameraShake = FbTriggerCameraShake;
//# sourceMappingURL=FbTriggerCameraShake.js.map
