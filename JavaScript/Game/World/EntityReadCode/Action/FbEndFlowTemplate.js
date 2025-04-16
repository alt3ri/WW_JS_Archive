"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEndFlowTemplate = void 0);
class FbEndFlowTemplate {
  constructor(t) {
    (this.FbDataInternal = t), (this.$Mh = !1), (this.XMh = !1);
  }
  static Create(t) {
    if (t) return new FbEndFlowTemplate(t);
  }
  get IsResetPosition() {
    return (
      this.$Mh ||
        ((this.$Mh = !0), (this.XMh = this.FbDataInternal.isResetPosition())),
      this.XMh
    );
  }
}
exports.FbEndFlowTemplate = FbEndFlowTemplate;
//# sourceMappingURL=FbEndFlowTemplate.js.map
