"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHeadStyleVoiceOnly = void 0);
class FbHeadStyleVoiceOnly {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Dmh = !1),
      (this.Bmh = 0);
  }
  static Create(t) {
    if (t) return new FbHeadStyleVoiceOnly(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get WhoId() {
    return (
      this.Dmh || ((this.Dmh = !0), (this.Bmh = this.FbDataInternal.whoId())),
      this.Bmh
    );
  }
}
exports.FbHeadStyleVoiceOnly = FbHeadStyleVoiceOnly;
//# sourceMappingURL=FbHeadStyleVoiceOnly.js.map
