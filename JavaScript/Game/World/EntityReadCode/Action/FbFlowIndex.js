"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFlowIndex = void 0);
class FbFlowIndex {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V_h = !1),
      (this.j_h = void 0),
      (this.H_h = !1),
      (this.W_h = 0);
  }
  static Create(t) {
    if (t) return new FbFlowIndex(t);
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
}
exports.FbFlowIndex = FbFlowIndex;
//# sourceMappingURL=FbFlowIndex.js.map
