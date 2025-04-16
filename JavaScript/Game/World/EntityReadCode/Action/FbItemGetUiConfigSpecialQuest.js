"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbItemGetUiConfigSpecialQuest = void 0);
class FbItemGetUiConfigSpecialQuest {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._uh = !1),
      (this.cuh = void 0),
      (this.uuh = !1),
      (this.duh = !1);
  }
  static Create(t) {
    if (t) return new FbItemGetUiConfigSpecialQuest(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Title() {
    return (
      this._uh || ((this._uh = !0), (this.cuh = this.FbDataInternal.title())),
      this.cuh
    );
  }
  get ShowDetail() {
    return (
      this.uuh ||
        ((this.uuh = !0), (this.duh = this.FbDataInternal.showDetail())),
      this.duh
    );
  }
}
exports.FbItemGetUiConfigSpecialQuest = FbItemGetUiConfigSpecialQuest;
//# sourceMappingURL=FbItemGetUiConfigSpecialQuest.js.map
