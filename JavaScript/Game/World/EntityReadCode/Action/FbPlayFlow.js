"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayFlow = void 0);
class FbPlayFlow {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V_h = !1),
      (this.j_h = void 0),
      (this.H_h = !1),
      (this.W_h = 0),
      (this.Q_h = !1),
      (this.K_h = 0),
      (this.$_h = !1),
      (this.X_h = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayFlow(t);
  }
  get FlowListName() {
    return (
      this.V_h ||
        ((this.V_h = !0), (this.j_h = this.FbDataInternal.flowListName())),
      this.j_h
    );
  }
  get FlowId() {
    return (
      this.H_h || ((this.H_h = !0), (this.W_h = this.FbDataInternal.flowId())),
      this.W_h
    );
  }
  get StateId() {
    return (
      this.Q_h || ((this.Q_h = !0), (this.K_h = this.FbDataInternal.stateId())),
      this.K_h
    );
  }
  get FlowGuid() {
    return (
      this.$_h ||
        ((this.$_h = !0), (this.X_h = this.FbDataInternal.flowGuid())),
      this.X_h
    );
  }
}
exports.FbPlayFlow = FbPlayFlow;
//# sourceMappingURL=FbPlayFlow.js.map
