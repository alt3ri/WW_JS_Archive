"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeRandomState = void 0);
class FbChangeRandomState {
  constructor(t) {
    (this.FbDataInternal = t), (this.Vch = !1), (this.jch = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeRandomState(t);
  }
  get StateIds() {
    if (!this.Vch) {
      (this.Vch = !0), (this.jch = new Array());
      var e = this.FbDataInternal.stateIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.jch.push(this.FbDataInternal.stateIds(t));
    }
    return this.jch;
  }
}
exports.FbChangeRandomState = FbChangeRandomState;
//# sourceMappingURL=FbChangeRandomState.js.map
