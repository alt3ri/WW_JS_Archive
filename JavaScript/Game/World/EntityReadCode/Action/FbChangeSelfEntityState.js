"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeSelfEntityState = void 0);
class FbChangeSelfEntityState {
  constructor(t) {
    (this.FbDataInternal = t), (this._vh = !1), (this.cvh = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeSelfEntityState(t);
  }
  get EntityState() {
    return (
      this._vh ||
        ((this._vh = !0), (this.cvh = this.FbDataInternal.entityState())),
      this.cvh
    );
  }
}
exports.FbChangeSelfEntityState = FbChangeSelfEntityState;
//# sourceMappingURL=FbChangeSelfEntityState.js.map
