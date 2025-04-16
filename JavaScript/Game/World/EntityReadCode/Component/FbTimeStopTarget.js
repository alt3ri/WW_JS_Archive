"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimeStopTarget = void 0);
const FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbTimeStopTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.gFh = !1),
      (this.fFh = void 0);
  }
  static Create(t) {
    if (t) return new FbTimeStopTarget(t);
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var i = this.FbDataInternal.entityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get EntityMatch() {
    return (
      this.gFh ||
        ((this.gFh = !0),
        (this.fFh = FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(
          this.FbDataInternal.entityMatch(),
        ))),
      this.fFh
    );
  }
}
exports.FbTimeStopTarget = FbTimeStopTarget;
//# sourceMappingURL=FbTimeStopTarget.js.map
