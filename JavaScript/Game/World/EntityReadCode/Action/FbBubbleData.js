"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBubbleData = void 0);
const FbBubbleIndex_1 = require("./FbBubbleIndex");
class FbBubbleData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._Rh = !1),
      (this.cRh = void 0),
      (this.vmh = !1),
      (this.ymh = 0);
  }
  static Create(t) {
    if (t) return new FbBubbleData(t);
  }
  get FlowIndex() {
    return (
      this._Rh ||
        ((this._Rh = !0),
        (this.cRh = FbBubbleIndex_1.FbBubbleIndex.Create(
          this.FbDataInternal.flowIndex(),
        ))),
      this.cRh
    );
  }
  get WaitTime() {
    return (
      this.vmh ||
        ((this.vmh = !0), (this.ymh = this.FbDataInternal.waitTime())),
      this.ymh
    );
  }
}
exports.FbBubbleData = FbBubbleData;
//# sourceMappingURL=FbBubbleData.js.map
