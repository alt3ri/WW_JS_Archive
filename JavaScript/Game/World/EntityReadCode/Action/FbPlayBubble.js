"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayBubble = void 0);
const FbBubbleIndex_1 = require("./FbBubbleIndex");
class FbPlayBubble {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.F_h = !1),
      (this.N_h = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayBubble(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get Flow() {
    return (
      this.F_h ||
        ((this.F_h = !0),
        (this.N_h = FbBubbleIndex_1.FbBubbleIndex.Create(
          this.FbDataInternal.flow(),
        ))),
      this.N_h
    );
  }
}
exports.FbPlayBubble = FbPlayBubble;
//# sourceMappingURL=FbPlayBubble.js.map
