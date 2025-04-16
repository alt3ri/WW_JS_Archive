"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSyncVarToActorState = void 0);
class FbSyncVarToActorState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.qph = !1),
      (this.kph = void 0),
      (this.Gph = !1),
      (this.Oph = void 0);
  }
  static Create(t) {
    if (t) return new FbSyncVarToActorState(t);
  }
  get VarName() {
    return (
      this.qph || ((this.qph = !0), (this.kph = this.FbDataInternal.varName())),
      this.kph
    );
  }
  get StateKey() {
    return (
      this.Gph ||
        ((this.Gph = !0), (this.Oph = this.FbDataInternal.stateKey())),
      this.Oph
    );
  }
}
exports.FbSyncVarToActorState = FbSyncVarToActorState;
//# sourceMappingURL=FbSyncVarToActorState.js.map
