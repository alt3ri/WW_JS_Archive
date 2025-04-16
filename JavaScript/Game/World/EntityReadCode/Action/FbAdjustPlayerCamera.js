"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAdjustPlayerCamera = void 0);
const UnionAdjustPlayerCameraOptionHelper_1 = require("./UnionAdjustPlayerCameraOptionHelper");
class FbAdjustPlayerCamera {
  constructor(e) {
    (this.FbDataInternal = e), (this.s_h = !1), (this.Hye = void 0);
  }
  static Create(e) {
    if (e) return new FbAdjustPlayerCamera(e);
  }
  get Option() {
    var e, t;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (e = this.FbDataInternal.optionType()),
        (t =
          UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.GetUnionAdjustPlayerCameraOptionObject(
            e,
          ))) &&
        (this.Hye =
          UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.ReadUnionAdjustPlayerCameraOption(
            e,
            this.FbDataInternal.option(t),
          )),
      this.Hye
    );
  }
}
exports.FbAdjustPlayerCamera = FbAdjustPlayerCamera;
//# sourceMappingURL=FbAdjustPlayerCamera.js.map
