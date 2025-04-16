"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckAiState = void 0);
class FbCheckAiState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.fzh = !1),
      (this.pzh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckAiState(t);
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
  get StateType() {
    return (
      this.fzh ||
        ((this.fzh = !0), (this.pzh = this.FbDataInternal.stateType())),
      this.pzh
    );
  }
}
exports.FbCheckAiState = FbCheckAiState;
//# sourceMappingURL=FbCheckAiState.js.map
