"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemoveFlowInteractOption = void 0);
const FbFlowIndex_1 = require("./FbFlowIndex");
class FbRemoveFlowInteractOption {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.F_h = !1),
      (this.N_h = void 0),
      (this.a_h = !1),
      (this.I9o = 0);
  }
  static Create(t) {
    if (t) return new FbRemoveFlowInteractOption(t);
  }
  get Flow() {
    return (
      this.F_h ||
        ((this.F_h = !0),
        (this.N_h = FbFlowIndex_1.FbFlowIndex.Create(
          this.FbDataInternal.flow(),
        ))),
      this.N_h
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
}
exports.FbRemoveFlowInteractOption = FbRemoveFlowInteractOption;
//# sourceMappingURL=FbRemoveFlowInteractOption.js.map
