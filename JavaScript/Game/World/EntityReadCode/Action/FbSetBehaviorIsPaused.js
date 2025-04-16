"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetBehaviorIsPaused = void 0);
class FbSetBehaviorIsPaused {
  constructor(s) {
    (this.FbDataInternal = s), (this.bmh = !1), (this.dJ = !1);
  }
  static Create(s) {
    if (s) return new FbSetBehaviorIsPaused(s);
  }
  get IsPaused() {
    return (
      this.bmh || ((this.bmh = !0), (this.dJ = this.FbDataInternal.isPaused())),
      this.dJ
    );
  }
}
exports.FbSetBehaviorIsPaused = FbSetBehaviorIsPaused;
//# sourceMappingURL=FbSetBehaviorIsPaused.js.map
