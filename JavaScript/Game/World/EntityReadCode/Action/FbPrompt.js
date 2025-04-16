"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPrompt = void 0);
class FbPrompt {
  constructor(t) {
    (this.FbDataInternal = t), (this.dmh = !1), (this.mmh = 0);
  }
  static Create(t) {
    if (t) return new FbPrompt(t);
  }
  get GeneralTextId() {
    return (
      this.dmh ||
        ((this.dmh = !0), (this.mmh = this.FbDataInternal.generalTextId())),
      this.mmh
    );
  }
}
exports.FbPrompt = FbPrompt;
//# sourceMappingURL=FbPrompt.js.map
