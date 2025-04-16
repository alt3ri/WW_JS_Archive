"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcFollowConfig = void 0);
const FbPerformerRangeBoundaryActionTrigger_1 = require("./FbPerformerRangeBoundaryActionTrigger");
class FbNpcFollowConfig {
  constructor(r) {
    (this.FbDataInternal = r),
      (this.ndh = !1),
      (this.sdh = void 0),
      (this.adh = !1),
      (this.hdh = void 0);
  }
  static Create(r) {
    if (r) return new FbNpcFollowConfig(r);
  }
  get PerformerWhenEnter() {
    return (
      this.ndh ||
        ((this.ndh = !0),
        (this.sdh =
          FbPerformerRangeBoundaryActionTrigger_1.FbPerformerRangeBoundaryActionTrigger.Create(
            this.FbDataInternal.performerWhenEnter(),
          ))),
      this.sdh
    );
  }
  get PerformerWhenExit() {
    return (
      this.adh ||
        ((this.adh = !0),
        (this.hdh =
          FbPerformerRangeBoundaryActionTrigger_1.FbPerformerRangeBoundaryActionTrigger.Create(
            this.FbDataInternal.performerWhenExit(),
          ))),
      this.hdh
    );
  }
}
exports.FbNpcFollowConfig = FbNpcFollowConfig;
//# sourceMappingURL=FbNpcFollowConfig.js.map
