"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnterOrbitalCamera = void 0);
const UnionEnterOrbitalCameraOptionHelper_1 = require("./UnionEnterOrbitalCameraOptionHelper");
class FbEnterOrbitalCamera {
  constructor(t) {
    (this.FbDataInternal = t), (this.s_h = !1), (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbEnterOrbitalCamera(t);
  }
  get Option() {
    var t, r;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (r =
          UnionEnterOrbitalCameraOptionHelper_1.UnionEnterOrbitalCameraOptionHelper.GetUnionEnterOrbitalCameraOptionObject(
            t,
          ))) &&
        (this.Hye =
          UnionEnterOrbitalCameraOptionHelper_1.UnionEnterOrbitalCameraOptionHelper.ReadUnionEnterOrbitalCameraOption(
            t,
            this.FbDataInternal.option(r),
          )),
      this.Hye
    );
  }
}
exports.FbEnterOrbitalCamera = FbEnterOrbitalCamera;
//# sourceMappingURL=FbEnterOrbitalCamera.js.map
