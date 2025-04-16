"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkOptionQteSucceedDelayExec = void 0);
class FbTalkOptionQteSucceedDelayExec {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbTalkOptionQteSucceedDelayExec(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbTalkOptionQteSucceedDelayExec = FbTalkOptionQteSucceedDelayExec;
//# sourceMappingURL=FbTalkOptionQteSucceedDelayExec.js.map
