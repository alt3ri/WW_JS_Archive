"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbItemFoundationMatch = void 0);
class FbItemFoundationMatch {
  constructor(t) {
    (this.FbDataInternal = t), (this.yvh = !1), (this.Svh = 0);
  }
  static Create(t) {
    if (t) return new FbItemFoundationMatch(t);
  }
  get MatchEntityId() {
    return (
      this.yvh ||
        ((this.yvh = !0), (this.Svh = this.FbDataInternal.matchEntityId())),
      this.Svh
    );
  }
}
exports.FbItemFoundationMatch = FbItemFoundationMatch;
//# sourceMappingURL=FbItemFoundationMatch.js.map
