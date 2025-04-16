"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcBumpShow = void 0);
const FbNpcPerformBubble_1 = require("./FbNpcPerformBubble");
class FbNpcBumpShow {
  constructor(e) {
    (this.FbDataInternal = e), (this.q4h = !1), (this.k4h = void 0);
  }
  static Create(e) {
    if (e) return new FbNpcBumpShow(e);
  }
  get BumpBubble() {
    return (
      this.q4h ||
        ((this.q4h = !0),
        (this.k4h = FbNpcPerformBubble_1.FbNpcPerformBubble.Create(
          this.FbDataInternal.bumpBubble(),
        ))),
      this.k4h
    );
  }
}
exports.FbNpcBumpShow = FbNpcBumpShow;
//# sourceMappingURL=FbNpcBumpShow.js.map
