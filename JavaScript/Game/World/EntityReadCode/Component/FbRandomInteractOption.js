"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRandomInteractOption = void 0);
const FbInteractOption_1 = require("../Action/FbInteractOption");
class FbRandomInteractOption {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.jDh = !1),
      (this.HDh = 0),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbRandomInteractOption(t);
  }
  get Weight() {
    return (
      this.jDh || ((this.jDh = !0), (this.HDh = this.FbDataInternal.weight())),
      this.HDh
    );
  }
  get Option() {
    return (
      this.s_h ||
        ((this.s_h = !0),
        (this.Hye = FbInteractOption_1.FbInteractOption.Create(
          this.FbDataInternal.option(),
        ))),
      this.Hye
    );
  }
}
exports.FbRandomInteractOption = FbRandomInteractOption;
//# sourceMappingURL=FbRandomInteractOption.js.map
