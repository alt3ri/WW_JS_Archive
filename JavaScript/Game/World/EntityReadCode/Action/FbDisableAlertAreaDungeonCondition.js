"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableAlertAreaDungeonCondition = void 0);
class FbDisableAlertAreaDungeonCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.WSh = !1),
      (this.QSh = 0);
  }
  static Create(t) {
    if (t) return new FbDisableAlertAreaDungeonCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RelatedDungeonId() {
    return (
      this.WSh ||
        ((this.WSh = !0), (this.QSh = this.FbDataInternal.relatedDungeonId())),
      this.QSh
    );
  }
}
exports.FbDisableAlertAreaDungeonCondition = FbDisableAlertAreaDungeonCondition;
//# sourceMappingURL=FbDisableAlertAreaDungeonCondition.js.map
