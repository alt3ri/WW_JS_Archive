"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcPerformOnMonsterCloseby = void 0);
const FbBubbleIndex_1 = require("../Action/FbBubbleIndex"),
  FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcPerformOnMonsterCloseby {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.M_h = !1),
      (this.E_h = 0),
      (this.mgh = !1),
      (this.Cgh = void 0),
      (this.G4h = !1),
      (this.O4h = void 0),
      (this.D4h = !1),
      (this.B4h = 0);
  }
  static Create(t) {
    if (t) return new FbNpcPerformOnMonsterCloseby(t);
  }
  get Range() {
    return (
      this.M_h || ((this.M_h = !0), (this.E_h = this.FbDataInternal.range())),
      this.E_h
    );
  }
  get Montage() {
    return (
      this.mgh ||
        ((this.mgh = !0),
        (this.Cgh = FbMontageId_1.FbMontageId.Create(
          this.FbDataInternal.montage(),
        ))),
      this.Cgh
    );
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
  get BubbleRate() {
    return (
      this.D4h ||
        ((this.D4h = !0), (this.B4h = this.FbDataInternal.bubbleRate())),
      this.B4h
    );
  }
}
exports.FbNpcPerformOnMonsterCloseby = FbNpcPerformOnMonsterCloseby;
//# sourceMappingURL=FbNpcPerformOnMonsterCloseby.js.map
