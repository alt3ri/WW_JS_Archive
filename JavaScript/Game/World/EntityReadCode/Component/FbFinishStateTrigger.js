"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFinishStateTrigger = void 0);
const FbEntityGroupCondition_1 = require("../Condition/FbEntityGroupCondition");
class FbFinishStateTrigger {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.AVh = !1),
      (this.xVh = !1),
      (this.MVh = !1),
      (this.EVh = void 0);
  }
  static Create(t) {
    if (t) return new FbFinishStateTrigger(t);
  }
  get IsSilenceEntities() {
    return (
      this.AVh ||
        ((this.AVh = !0), (this.xVh = this.FbDataInternal.isSilenceEntities())),
      this.xVh
    );
  }
  get GroupCondition() {
    return (
      this.MVh ||
        ((this.MVh = !0),
        (this.EVh = FbEntityGroupCondition_1.FbEntityGroupCondition.Create(
          this.FbDataInternal.groupCondition(),
        ))),
      this.EVh
    );
  }
}
exports.FbFinishStateTrigger = FbFinishStateTrigger;
//# sourceMappingURL=FbFinishStateTrigger.js.map
