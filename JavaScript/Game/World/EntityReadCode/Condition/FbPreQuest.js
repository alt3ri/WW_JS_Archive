"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPreQuest = void 0);
class FbPreQuest {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.tZh = !1),
      (this.iZh = 0);
  }
  static Create(t) {
    if (t) return new FbPreQuest(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get PreQuestId() {
    return (
      this.tZh ||
        ((this.tZh = !0), (this.iZh = this.FbDataInternal.preQuestId())),
      this.iZh
    );
  }
}
exports.FbPreQuest = FbPreQuest;
//# sourceMappingURL=FbPreQuest.js.map
