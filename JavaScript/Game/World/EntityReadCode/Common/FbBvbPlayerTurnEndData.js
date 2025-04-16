"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBvbPlayerTurnEndData = void 0);
class FbBvbPlayerTurnEndData {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbBvbPlayerTurnEndData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbBvbPlayerTurnEndData = FbBvbPlayerTurnEndData;
//# sourceMappingURL=FbBvbPlayerTurnEndData.js.map
