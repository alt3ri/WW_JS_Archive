"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStateChangeConfig = void 0);
class FbStateChangeConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.TBh = !1),
      (this.bBh = void 0),
      (this.LBh = !1),
      (this.ABh = void 0);
  }
  static Create(t) {
    if (t) return new FbStateChangeConfig(t);
  }
  get RefreshState() {
    return (
      this.TBh ||
        ((this.TBh = !0), (this.bBh = this.FbDataInternal.refreshState())),
      this.bBh
    );
  }
  get SubDestroyState() {
    return (
      this.LBh ||
        ((this.LBh = !0), (this.ABh = this.FbDataInternal.subDestroyState())),
      this.ABh
    );
  }
}
exports.FbStateChangeConfig = FbStateChangeConfig;
//# sourceMappingURL=FbStateChangeConfig.js.map
