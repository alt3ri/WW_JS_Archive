"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeInteractOptionText = void 0);
class FbChangeInteractOptionText {
  constructor(t) {
    (this.FbDataInternal = t), (this.C_h = !1), (this.g_h = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeInteractOptionText(t);
  }
  get TidContent() {
    return (
      this.C_h ||
        ((this.C_h = !0), (this.g_h = this.FbDataInternal.tidContent())),
      this.g_h
    );
  }
}
exports.FbChangeInteractOptionText = FbChangeInteractOptionText;
//# sourceMappingURL=FbChangeInteractOptionText.js.map
