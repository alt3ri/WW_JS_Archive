"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBvbAiBattleWinData = void 0);
class FbBvbAiBattleWinData {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbBvbAiBattleWinData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbBvbAiBattleWinData = FbBvbAiBattleWinData;
//# sourceMappingURL=FbBvbAiBattleWinData.js.map
