"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCategoryMatchingSucceedBase = void 0);
const FbEntityState_1 = require("./FbEntityState");
class FbCategoryMatchingSucceedBase {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.iFh = !1),
      (this.rFh = !1),
      (this.bEh = !1),
      (this.LEh = !1),
      (this.qFh = !1),
      (this.kFh = !1),
      (this.GFh = !1),
      (this.OFh = void 0),
      (this.FFh = !1),
      (this.NFh = void 0),
      (this.VFh = !1),
      (this.jFh = void 0),
      (this.HFh = !1),
      (this.WFh = void 0);
  }
  static Create(t) {
    if (t) return new FbCategoryMatchingSucceedBase(t);
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
  get SyncAdsorbatePerformance() {
    return (
      this.qFh ||
        ((this.qFh = !0),
        (this.kFh = this.FbDataInternal.syncAdsorbatePerformance())),
      this.kFh
    );
  }
  get ChangeSelfState() {
    return (
      this.GFh ||
        ((this.GFh = !0), (this.OFh = this.FbDataInternal.changeSelfState())),
      this.OFh
    );
  }
  get ChangeSelfStateAfterDischarged() {
    return (
      this.FFh ||
        ((this.FFh = !0),
        (this.NFh = this.FbDataInternal.changeSelfStateAfterDischarged())),
      this.NFh
    );
  }
  get ChangeItemState() {
    return (
      this.VFh ||
        ((this.VFh = !0),
        (this.jFh = FbEntityState_1.FbEntityState.Create(
          this.FbDataInternal.changeItemState(),
        ))),
      this.jFh
    );
  }
  get ChangeItemStateAfterDischarged() {
    return (
      this.HFh ||
        ((this.HFh = !0),
        (this.WFh = FbEntityState_1.FbEntityState.Create(
          this.FbDataInternal.changeItemStateAfterDischarged(),
        ))),
      this.WFh
    );
  }
}
exports.FbCategoryMatchingSucceedBase = FbCategoryMatchingSucceedBase;
//# sourceMappingURL=FbCategoryMatchingSucceedBase.js.map
