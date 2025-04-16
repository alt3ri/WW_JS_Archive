"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHeadStyleMonsterDisplay = void 0);
class FbHeadStyleMonsterDisplay {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Pmh = !1),
      (this.Umh = 0);
  }
  static Create(t) {
    if (t) return new FbHeadStyleMonsterDisplay(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MonsterDisplayId() {
    return (
      this.Pmh ||
        ((this.Pmh = !0), (this.Umh = this.FbDataInternal.monsterDisplayId())),
      this.Umh
    );
  }
}
exports.FbHeadStyleMonsterDisplay = FbHeadStyleMonsterDisplay;
//# sourceMappingURL=FbHeadStyleMonsterDisplay.js.map
