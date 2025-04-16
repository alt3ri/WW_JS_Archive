"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbIconNearbyTracking = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbIconNearbyTracking {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Rjh = !1),
      (this.wjh = 0),
      (this.Pjh = !1),
      (this.Ujh = 0),
      (this.Djh = !1),
      (this.Bjh = void 0),
      (this.qjh = !1),
      (this.kjh = void 0),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(t) {
    if (t) return new FbIconNearbyTracking(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ShowRange() {
    return (
      this.Rjh ||
        ((this.Rjh = !0), (this.wjh = this.FbDataInternal.showRange())),
      this.wjh
    );
  }
  get HideRange() {
    return (
      this.Pjh ||
        ((this.Pjh = !0), (this.Ujh = this.FbDataInternal.hideRange())),
      this.Ujh
    );
  }
  get TexturePath() {
    return (
      this.Djh ||
        ((this.Djh = !0), (this.Bjh = this.FbDataInternal.texturePath())),
      this.Bjh
    );
  }
  get UiOffset() {
    return (
      this.qjh ||
        ((this.qjh = !0),
        (this.kjh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.uiOffset(),
        ))),
      this.kjh
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbIconNearbyTracking = FbIconNearbyTracking;
//# sourceMappingURL=FbIconNearbyTracking.js.map
