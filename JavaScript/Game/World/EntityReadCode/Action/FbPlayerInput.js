"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayerInput = void 0);
class FbPlayerInput {
  constructor(t) {
    (this.FbDataInternal = t), (this.K__ = !1), (this.$__ = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayerInput(t);
  }
  get Input() {
    return (
      this.K__ || ((this.K__ = !0), (this.$__ = this.FbDataInternal.input())),
      this.$__
    );
  }
}
exports.FbPlayerInput = FbPlayerInput;
//# sourceMappingURL=FbPlayerInput.js.map
