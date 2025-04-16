"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcPerformBubble = void 0);
const FbBubbleIndex_1 = require("../Action/FbBubbleIndex");
class FbNpcPerformBubble {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.G4h = !1),
      (this.O4h = void 0),
      (this.F4h = !1),
      (this.DTo = 0);
  }
  static Create(t) {
    if (t) return new FbNpcPerformBubble(t);
  }
  get Bubble() {
    return (
      this.G4h ||
        ((this.G4h = !0),
        (this.O4h = FbBubbleIndex_1.FbBubbleIndex.Create(
          this.FbDataInternal.bubble(),
        ))),
      this.O4h
    );
  }
  get Rate() {
    return (
      this.F4h || ((this.F4h = !0), (this.DTo = this.FbDataInternal.rate())),
      this.DTo
    );
  }
}
exports.FbNpcPerformBubble = FbNpcPerformBubble;
//# sourceMappingURL=FbNpcPerformBubble.js.map
