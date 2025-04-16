"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWorldLevelTable = void 0);
class FbWorldLevelTable {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mwh = !1),
      (this.Cwh = 0);
  }
  static Create(t) {
    if (t) return new FbWorldLevelTable(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get WorldLevelBonusId() {
    return (
      this.mwh ||
        ((this.mwh = !0), (this.Cwh = this.FbDataInternal.worldLevelBonusId())),
      this.Cwh
    );
  }
}
exports.FbWorldLevelTable = FbWorldLevelTable;
//# sourceMappingURL=FbWorldLevelTable.js.map
