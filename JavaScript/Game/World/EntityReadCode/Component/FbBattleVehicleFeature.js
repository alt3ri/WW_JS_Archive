"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBattleVehicleFeature = void 0);
class FbBattleVehicleFeature {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbBattleVehicleFeature(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbBattleVehicleFeature = FbBattleVehicleFeature;
//# sourceMappingURL=FbBattleVehicleFeature.js.map
