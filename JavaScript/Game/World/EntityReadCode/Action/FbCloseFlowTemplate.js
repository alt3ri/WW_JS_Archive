"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCloseFlowTemplate = void 0);
const FbEndState_1 = require("./FbEndState");
class FbCloseFlowTemplate {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.$Mh = !1),
      (this.XMh = !1),
      (this.D1_ = !1),
      (this.B1_ = void 0);
  }
  static Create(t) {
    if (t) return new FbCloseFlowTemplate(t);
  }
  get IsResetPosition() {
    return (
      this.$Mh ||
        ((this.$Mh = !0), (this.XMh = this.FbDataInternal.isResetPosition())),
      this.XMh
    );
  }
  get EndState() {
    return (
      this.D1_ ||
        ((this.D1_ = !0),
        (this.B1_ = FbEndState_1.FbEndState.Create(
          this.FbDataInternal.endState(),
        ))),
      this.B1_
    );
  }
}
exports.FbCloseFlowTemplate = FbCloseFlowTemplate;
//# sourceMappingURL=FbCloseFlowTemplate.js.map
