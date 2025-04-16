"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInhalationAbilityComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbInhalationConfig_1 = require("./FbInhalationConfig");
class FbInhalationAbilityComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.JXh = !1),
      (this.ZXh = void 0);
  }
  static Create(t) {
    if (t) return new FbInhalationAbilityComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get InhalationConfigs() {
    if (!this.JXh) {
      (this.JXh = !0), (this.ZXh = new Array());
      var i = this.FbDataInternal.inhalationConfigsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.inhalationConfigs(
            t,
            new fb_component_1.InhalationConfig(),
          );
          this.ZXh.push(FbInhalationConfig_1.FbInhalationConfig.Create(n));
        }
    }
    return this.ZXh;
  }
}
exports.FbInhalationAbilityComponent = FbInhalationAbilityComponent;
//# sourceMappingURL=FbInhalationAbilityComponent.js.map
