"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExecResurrection = void 0);
class FbExecResurrection {
  constructor(e) {
    (this.FbDataInternal = e), (this.m0h = !1), (this.C0h = 0);
  }
  static Create(e) {
    if (e) return new FbExecResurrection(e);
  }
  get ReviveId() {
    return (
      this.m0h ||
        ((this.m0h = !0), (this.C0h = this.FbDataInternal.reviveId())),
      this.C0h
    );
  }
}
exports.FbExecResurrection = FbExecResurrection;
//# sourceMappingURL=FbExecResurrection.js.map
