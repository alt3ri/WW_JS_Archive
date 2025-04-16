"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTargetGearGroupComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbTargetGearGroupConfig_1 = require("./FbTargetGearGroupConfig");
class FbTargetGearGroupComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.AOh = !1),
      (this.xOh = void 0);
  }
  static Create(t) {
    if (t) return new FbTargetGearGroupComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get GroupConfigs() {
    if (!this.AOh) {
      (this.AOh = !0), (this.xOh = new Array());
      var e = this.FbDataInternal.groupConfigsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.groupConfigs(
            t,
            new fb_component_1.TargetGearGroupConfig(),
          );
          this.xOh.push(
            FbTargetGearGroupConfig_1.FbTargetGearGroupConfig.Create(r),
          );
        }
    }
    return this.xOh;
  }
}
exports.FbTargetGearGroupComponent = FbTargetGearGroupComponent;
//# sourceMappingURL=FbTargetGearGroupComponent.js.map
