"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEnterOrbitalCameraOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbEnterOrbitalCameraControlByMove_1 = require("./FbEnterOrbitalCameraControlByMove");
class UnionEnterOrbitalCameraOptionHelper {
  static GetUnionEnterOrbitalCameraOptionObject(t) {
    if (
      t ===
      fb_action_1.UnionEnterOrbitalCameraOption.EnterOrbitalCameraControlByMove
    )
      return new fb_action_1.EnterOrbitalCameraControlByMove();
  }
  static ReadUnionEnterOrbitalCameraOption(t, e) {
    return void 0 !== e &&
      t ===
        fb_action_1.UnionEnterOrbitalCameraOption
          .EnterOrbitalCameraControlByMove
      ? FbEnterOrbitalCameraControlByMove_1.FbEnterOrbitalCameraControlByMove.Create(
          e,
        )
      : void 0;
  }
}
exports.UnionEnterOrbitalCameraOptionHelper =
  UnionEnterOrbitalCameraOptionHelper;
//# sourceMappingURL=UnionEnterOrbitalCameraOptionHelper.js.map
