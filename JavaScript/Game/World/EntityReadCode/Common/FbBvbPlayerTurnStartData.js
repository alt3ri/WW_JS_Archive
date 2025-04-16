"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBvbPlayerTurnStartData = void 0);
class FbBvbPlayerTurnStartData {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbBvbPlayerTurnStartData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbBvbPlayerTurnStartData = FbBvbPlayerTurnStartData;
//# sourceMappingURL=FbBvbPlayerTurnStartData.js.map
