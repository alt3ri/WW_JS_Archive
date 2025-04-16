"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPunishReport = void 0);
class FbPunishReport {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.gyh = !1),
      (this.fyh = void 0),
      (this.pyh = !1),
      (this.vyh = void 0);
  }
  static Create(t) {
    if (t) return new FbPunishReport(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MainText() {
    return (
      this.gyh ||
        ((this.gyh = !0), (this.fyh = this.FbDataInternal.mainText())),
      this.fyh
    );
  }
  get SubText() {
    return (
      this.pyh || ((this.pyh = !0), (this.vyh = this.FbDataInternal.subText())),
      this.vyh
    );
  }
}
exports.FbPunishReport = FbPunishReport;
//# sourceMappingURL=FbPunishReport.js.map
