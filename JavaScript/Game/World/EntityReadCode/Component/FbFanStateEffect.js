"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFanStateEffect = void 0);
const FbFanEffectConfig_1 = require("./FbFanEffectConfig");
class FbFanStateEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._vh = !1),
      (this.cvh = void 0),
      (this.hQh = !1),
      (this.lQh = void 0);
  }
  static Create(t) {
    if (t) return new FbFanStateEffect(t);
  }
  get EntityState() {
    return (
      this._vh ||
        ((this._vh = !0), (this.cvh = this.FbDataInternal.entityState())),
      this.cvh
    );
  }
  get EffectConfig() {
    return (
      this.hQh ||
        ((this.hQh = !0),
        (this.lQh = FbFanEffectConfig_1.FbFanEffectConfig.Create(
          this.FbDataInternal.effectConfig(),
        ))),
      this.lQh
    );
  }
}
exports.FbFanStateEffect = FbFanStateEffect;
//# sourceMappingURL=FbFanStateEffect.js.map
