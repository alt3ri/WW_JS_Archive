"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClearPlayBubble = void 0);
class FbClearPlayBubble {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.Mmh = !1),
      (this.Emh = !1);
  }
  static Create(t) {
    if (t) return new FbClearPlayBubble(t);
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var s = this.FbDataInternal.entityIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get OnlyClearRedDot() {
    return (
      this.Mmh ||
        ((this.Mmh = !0), (this.Emh = this.FbDataInternal.onlyClearRedDot())),
      this.Emh
    );
  }
}
exports.FbClearPlayBubble = FbClearPlayBubble;
//# sourceMappingURL=FbClearPlayBubble.js.map
