"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelAIComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbLevelAIState_1 = require("./FbLevelAIState");
class FbLevelAIComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Dxh = !1),
      (this.Bxh = void 0),
      (this.JRh = !1),
      (this.ZRh = void 0);
  }
  static Create(t) {
    if (t) return new FbLevelAIComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get States() {
    if (!this.Dxh) {
      (this.Dxh = !0), (this.Bxh = new Array());
      var e = this.FbDataInternal.statesLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.states(
            t,
            new fb_component_1.LevelAIState(),
          );
          this.Bxh.push(FbLevelAIState_1.FbLevelAIState.Create(s));
        }
    }
    return this.Bxh;
  }
  get BtTreeAsset() {
    return (
      this.JRh ||
        ((this.JRh = !0), (this.ZRh = this.FbDataInternal.btTreeAsset())),
      this.ZRh
    );
  }
}
exports.FbLevelAIComponent = FbLevelAIComponent;
//# sourceMappingURL=FbLevelAIComponent.js.map
