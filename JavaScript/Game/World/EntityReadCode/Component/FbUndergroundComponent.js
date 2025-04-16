"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUndergroundComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbUndergroundStateInfo_1 = require("./FbUndergroundStateInfo");
class FbUndergroundComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Ekh = !1),
      (this.Ikh = 0),
      (this.Tkh = !1),
      (this.bkh = !1),
      (this.Lkh = !1),
      (this.Akh = void 0),
      (this.xkh = !1),
      (this.Rkh = void 0);
  }
  static Create(t) {
    if (t) return new FbUndergroundComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get TestState() {
    return (
      this.Ekh ||
        ((this.Ekh = !0), (this.Ikh = this.FbDataInternal.testState())),
      this.Ikh
    );
  }
  get IsRestartPlayer() {
    return (
      this.Tkh ||
        ((this.Tkh = !0), (this.bkh = this.FbDataInternal.isRestartPlayer())),
      this.bkh
    );
  }
  get DestroyTag() {
    if (!this.Lkh) {
      (this.Lkh = !0), (this.Akh = new Array());
      var s = this.FbDataInternal.destroyTagLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.Akh.push(this.FbDataInternal.destroyTag(t));
    }
    return this.Akh;
  }
  get StateInfo() {
    if (!this.xkh) {
      (this.xkh = !0), (this.Rkh = new Array());
      var s = this.FbDataInternal.stateInfoLength();
      if (s)
        for (let t = 0; t < s; ++t) {
          var e = this.FbDataInternal.stateInfo(
            t,
            new fb_component_1.UndergroundStateInfo(),
          );
          this.Rkh.push(
            FbUndergroundStateInfo_1.FbUndergroundStateInfo.Create(e),
          );
        }
    }
    return this.Rkh;
  }
}
exports.FbUndergroundComponent = FbUndergroundComponent;
//# sourceMappingURL=FbUndergroundComponent.js.map
