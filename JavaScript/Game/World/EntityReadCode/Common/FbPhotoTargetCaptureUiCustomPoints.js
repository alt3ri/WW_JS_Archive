"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPhotoTargetCaptureUiCustomPoints = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPhotoTargetCaptureUiCustomPoints {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbPhotoTargetCaptureUiCustomPoints(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Points() {
    if (!this.NEh) {
      (this.NEh = !0), (this.VEh = new Array());
      var r = this.FbDataInternal.pointsLength();
      if (r)
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.points(t, new fb_var_1.VectorInfo());
          this.VEh.push(FbVectorInfo_1.FbVectorInfo.Create(i));
        }
    }
    return this.VEh;
  }
}
exports.FbPhotoTargetCaptureUiCustomPoints = FbPhotoTargetCaptureUiCustomPoints;
//# sourceMappingURL=FbPhotoTargetCaptureUiCustomPoints.js.map
