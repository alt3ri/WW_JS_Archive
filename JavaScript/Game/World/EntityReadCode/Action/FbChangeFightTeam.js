"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeFightTeam = void 0);
class FbChangeFightTeam {
  constructor(t) {
    (this.FbDataInternal = t), (this.oEh = !1), (this.nEh = 0);
  }
  static Create(t) {
    if (t) return new FbChangeFightTeam(t);
  }
  get TeamIndex() {
    return (
      this.oEh ||
        ((this.oEh = !0), (this.nEh = this.FbDataInternal.teamIndex())),
      this.nEh
    );
  }
}
exports.FbChangeFightTeam = FbChangeFightTeam;
//# sourceMappingURL=FbChangeFightTeam.js.map
