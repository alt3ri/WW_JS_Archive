"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLog = void 0);
class FbLog {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Muh = !1),
      (this.jGi = void 0),
      (this.Euh = !1),
      (this.Iuh = void 0);
  }
  static Create(t) {
    if (t) return new FbLog(t);
  }
  get Level() {
    return (
      this.Muh || ((this.Muh = !0), (this.jGi = this.FbDataInternal.level())),
      this.jGi
    );
  }
  get Content() {
    return (
      this.Euh || ((this.Euh = !0), (this.Iuh = this.FbDataInternal.content())),
      this.Iuh
    );
  }
}
exports.FbLog = FbLog;
//# sourceMappingURL=FbLog.js.map
