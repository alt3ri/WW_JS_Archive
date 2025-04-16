"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcHitShow = void 0);
const FbBubbleIndex_1 = require("../Action/FbBubbleIndex");
class FbNpcHitShow {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.R4h = !1),
      (this.w4h = void 0),
      (this.P4h = !1),
      (this.U4h = void 0),
      (this.D4h = !1),
      (this.B4h = 0);
  }
  static Create(t) {
    if (t) return new FbNpcHitShow(t);
  }
  get HitMontage() {
    return (
      this.R4h ||
        ((this.R4h = !0), (this.w4h = this.FbDataInternal.hitMontage())),
      this.w4h
    );
  }
  get HitBubble() {
    return (
      this.P4h ||
        ((this.P4h = !0),
        (this.U4h = FbBubbleIndex_1.FbBubbleIndex.Create(
          this.FbDataInternal.hitBubble(),
        ))),
      this.U4h
    );
  }
  get BubbleRate() {
    return (
      this.D4h ||
        ((this.D4h = !0), (this.B4h = this.FbDataInternal.bubbleRate())),
      this.B4h
    );
  }
}
exports.FbNpcHitShow = FbNpcHitShow;
//# sourceMappingURL=FbNpcHitShow.js.map
