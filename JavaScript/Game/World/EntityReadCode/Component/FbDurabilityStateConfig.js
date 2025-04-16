"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDurabilityStateConfig = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbDurabilityState_1 = require("./FbDurabilityState");
class FbDurabilityStateConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.y3h = !1),
      (this.S3h = !1),
      (this.M3h = !1),
      (this.E3h = void 0);
  }
  static Create(t) {
    if (t) return new FbDurabilityStateConfig(t);
  }
  get NonDestructable() {
    return (
      this.y3h ||
        ((this.y3h = !0), (this.S3h = this.FbDataInternal.nonDestructable())),
      this.S3h
    );
  }
  get DurabilityStates() {
    if (!this.M3h) {
      (this.M3h = !0), (this.E3h = new Array());
      var i = this.FbDataInternal.durabilityStatesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.durabilityStates(
            t,
            new fb_component_1.DurabilityState(),
          );
          this.E3h.push(FbDurabilityState_1.FbDurabilityState.Create(e));
        }
    }
    return this.E3h;
  }
}
exports.FbDurabilityStateConfig = FbDurabilityStateConfig;
//# sourceMappingURL=FbDurabilityStateConfig.js.map
