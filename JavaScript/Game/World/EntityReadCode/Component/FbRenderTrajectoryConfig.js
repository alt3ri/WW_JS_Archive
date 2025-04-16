"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRenderTrajectoryConfig = void 0);
class FbRenderTrajectoryConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.sUh = !1),
      (this.aUh = void 0);
  }
  static Create(t) {
    if (t) return new FbRenderTrajectoryConfig(t);
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get Effect() {
    return (
      this.sUh || ((this.sUh = !0), (this.aUh = this.FbDataInternal.effect())),
      this.aUh
    );
  }
}
exports.FbRenderTrajectoryConfig = FbRenderTrajectoryConfig;
//# sourceMappingURL=FbRenderTrajectoryConfig.js.map
