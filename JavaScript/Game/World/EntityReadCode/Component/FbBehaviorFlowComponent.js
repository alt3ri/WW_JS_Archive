"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBehaviorFlowComponent = void 0);
const FbFlowInfo_1 = require("../Action/FbFlowInfo");
class FbBehaviorFlowComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.ogh = !1),
      (this.ngh = !1),
      (this.bUh = !1),
      (this.LUh = 0),
      (this.AUh = !1),
      (this.xUh = void 0);
  }
  static Create(t) {
    if (t) return new FbBehaviorFlowComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
  get InitStateId() {
    return (
      this.bUh ||
        ((this.bUh = !0), (this.LUh = this.FbDataInternal.initStateId())),
      this.LUh
    );
  }
  get FlowInfo() {
    return (
      this.AUh ||
        ((this.AUh = !0),
        (this.xUh = FbFlowInfo_1.FbFlowInfo.Create(
          this.FbDataInternal.flowInfo(),
        ))),
      this.xUh
    );
  }
}
exports.FbBehaviorFlowComponent = FbBehaviorFlowComponent;
//# sourceMappingURL=FbBehaviorFlowComponent.js.map
