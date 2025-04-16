"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPhotoTargetComponent = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  UnionPhotoTargetCaptureUiHelper_1 = require("../Common/UnionPhotoTargetCaptureUiHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPhotoTargetComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.B7h = !1),
      (this.q7h = void 0),
      (this.k7h = !1),
      (this.G7h = void 0),
      (this.O7h = !1),
      (this.F7h = void 0);
  }
  static Create(t) {
    if (t) return new FbPhotoTargetComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get RequiredPoints() {
    if (!this.B7h) {
      (this.B7h = !0), (this.q7h = new Array());
      var e = this.FbDataInternal.requiredPointsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.requiredPoints(
            t,
            new fb_var_1.VectorInfo(),
          );
          this.q7h.push(FbVectorInfo_1.FbVectorInfo.Create(i));
        }
    }
    return this.q7h;
  }
  get TargetCapturePromptUi() {
    var t, e;
    return (
      !this.k7h &&
        ((this.k7h = !0),
        (t = this.FbDataInternal.targetCapturePromptUiType()),
        (e =
          UnionPhotoTargetCaptureUiHelper_1.UnionPhotoTargetCaptureUiHelper.GetUnionPhotoTargetCaptureUiObject(
            t,
          ))) &&
        (this.G7h =
          UnionPhotoTargetCaptureUiHelper_1.UnionPhotoTargetCaptureUiHelper.ReadUnionPhotoTargetCaptureUi(
            t,
            this.FbDataInternal.targetCapturePromptUi(e),
          )),
      this.G7h
    );
  }
  get RayCastIgnoreEntities() {
    if (!this.O7h) {
      (this.O7h = !0), (this.F7h = new Array());
      var e = this.FbDataInternal.rayCastIgnoreEntitiesLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.F7h.push(this.FbDataInternal.rayCastIgnoreEntities(t));
    }
    return this.F7h;
  }
}
exports.FbPhotoTargetComponent = FbPhotoTargetComponent;
//# sourceMappingURL=FbPhotoTargetComponent.js.map
