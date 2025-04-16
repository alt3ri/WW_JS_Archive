"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbProbabilityRefreshItem = void 0);
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbProbabilityRefreshItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.CBh = !1),
      (this.gBh = 0),
      (this.fBh = !1),
      (this.pBh = 0),
      (this.vBh = !1),
      (this.yBh = void 0);
  }
  static Create(t) {
    if (t) return new FbProbabilityRefreshItem(t);
  }
  get Probability() {
    return (
      this.CBh ||
        ((this.CBh = !0), (this.gBh = this.FbDataInternal.probability())),
      this.gBh
    );
  }
  get RefreshEntityId() {
    return (
      this.fBh ||
        ((this.fBh = !0), (this.pBh = this.FbDataInternal.refreshEntityId())),
      this.pBh
    );
  }
  get AdditionalCondition() {
    return (
      this.vBh ||
        ((this.vBh = !0),
        (this.yBh = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.additionalCondition(),
        ))),
      this.yBh
    );
  }
}
exports.FbProbabilityRefreshItem = FbProbabilityRefreshItem;
//# sourceMappingURL=FbProbabilityRefreshItem.js.map
