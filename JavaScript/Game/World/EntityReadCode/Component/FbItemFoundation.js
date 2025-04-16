"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbItemFoundation = void 0);
const FbAdsortTransform_1 = require("./FbAdsortTransform"),
  FbEntityMatch_1 = require("./FbEntityMatch"),
  FbItemChangeAdsorbateState_1 = require("./FbItemChangeAdsorbateState");
class FbItemFoundation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.YOh = !1),
      (this.zOh = void 0),
      (this.JOh = !1),
      (this.ZOh = void 0),
      (this.eFh = !1),
      (this.tFh = void 0),
      (this.iFh = !1),
      (this.rFh = !1),
      (this.bEh = !1),
      (this.LEh = !1),
      (this.oFh = !1),
      (this.nFh = void 0);
  }
  static Create(t) {
    if (t) return new FbItemFoundation(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AdsorptionPoint() {
    return (
      this.YOh ||
        ((this.YOh = !0),
        (this.zOh = FbAdsortTransform_1.FbAdsortTransform.Create(
          this.FbDataInternal.adsorptionPoint(),
        ))),
      this.zOh
    );
  }
  get AdsorptionMatch() {
    return (
      this.JOh ||
        ((this.JOh = !0),
        (this.ZOh = FbEntityMatch_1.FbEntityMatch.Create(
          this.FbDataInternal.adsorptionMatch(),
        ))),
      this.ZOh
    );
  }
  get ActiveMatch() {
    return (
      this.eFh ||
        ((this.eFh = !0),
        (this.tFh = FbEntityMatch_1.FbEntityMatch.Create(
          this.FbDataInternal.activeMatch(),
        ))),
      this.tFh
    );
  }
  get IsSilent() {
    return (
      this.iFh ||
        ((this.iFh = !0), (this.rFh = this.FbDataInternal.isSilent())),
      this.rFh
    );
  }
  get IsDestroy() {
    return (
      this.bEh ||
        ((this.bEh = !0), (this.LEh = this.FbDataInternal.isDestroy())),
      this.LEh
    );
  }
  get ChangeAdsorbateState() {
    return (
      this.oFh ||
        ((this.oFh = !0),
        (this.nFh =
          FbItemChangeAdsorbateState_1.FbItemChangeAdsorbateState.Create(
            this.FbDataInternal.changeAdsorbateState(),
          ))),
      this.nFh
    );
  }
}
exports.FbItemFoundation = FbItemFoundation;
//# sourceMappingURL=FbItemFoundation.js.map
