"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPerformerAiMoveTo = void 0);
const UnionPerformerAiMoveToConfigHelper_1 = require("./UnionPerformerAiMoveToConfigHelper");
class FbPerformerAiMoveTo {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.bSh = !1),
      (this.TAe = void 0),
      (this.YAh = !1),
      (this.zAh = 0);
  }
  static Create(e) {
    if (e) return new FbPerformerAiMoveTo(e);
  }
  get Config() {
    var e, r;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (r =
          UnionPerformerAiMoveToConfigHelper_1.UnionPerformerAiMoveToConfigHelper.GetUnionPerformerAiMoveToConfigObject(
            e,
          ))) &&
        (this.TAe =
          UnionPerformerAiMoveToConfigHelper_1.UnionPerformerAiMoveToConfigHelper.ReadUnionPerformerAiMoveToConfig(
            e,
            this.FbDataInternal.config(r),
          )),
      this.TAe
    );
  }
  get StopDistance() {
    return (
      this.YAh ||
        ((this.YAh = !0), (this.zAh = this.FbDataInternal.stopDistance())),
      this.zAh
    );
  }
}
exports.FbPerformerAiMoveTo = FbPerformerAiMoveTo;
//# sourceMappingURL=FbPerformerAiMoveTo.js.map
