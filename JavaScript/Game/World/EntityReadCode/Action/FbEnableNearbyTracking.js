"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableNearbyTracking = void 0);
const UnionControlTrackingTypeHelper_1 = require("./UnionControlTrackingTypeHelper");
class FbEnableNearbyTracking {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.Dch = !1),
      (this.bSo = !1),
      (this.byh = !1),
      (this.Lyh = void 0);
  }
  static Create(e) {
    if (e) return new FbEnableNearbyTracking(e);
  }
  get IsEnable() {
    return (
      this.Dch ||
        ((this.Dch = !0), (this.bSo = this.FbDataInternal.isEnable())),
      this.bSo
    );
  }
  get ControlType() {
    var e, t;
    return (
      !this.byh &&
        ((this.byh = !0),
        (e = this.FbDataInternal.controlTypeType()),
        (t =
          UnionControlTrackingTypeHelper_1.UnionControlTrackingTypeHelper.GetUnionControlTrackingTypeObject(
            e,
          ))) &&
        (this.Lyh =
          UnionControlTrackingTypeHelper_1.UnionControlTrackingTypeHelper.ReadUnionControlTrackingType(
            e,
            this.FbDataInternal.controlType(t),
          )),
      this.Lyh
    );
  }
}
exports.FbEnableNearbyTracking = FbEnableNearbyTracking;
//# sourceMappingURL=FbEnableNearbyTracking.js.map
