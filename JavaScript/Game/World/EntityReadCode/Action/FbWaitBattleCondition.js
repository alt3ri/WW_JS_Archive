"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWaitBattleCondition = void 0);
const UnionDetectBattleConditionTypeHelper_1 = require("./UnionDetectBattleConditionTypeHelper");
class FbWaitBattleCondition {
  constructor(t) {
    (this.FbDataInternal = t), (this.Mvh = !1), (this.Evh = void 0);
  }
  static Create(t) {
    if (t) return new FbWaitBattleCondition(t);
  }
  get StateOption() {
    var t, e;
    return (
      !this.Mvh &&
        ((this.Mvh = !0),
        (t = this.FbDataInternal.stateOptionType()),
        (e =
          UnionDetectBattleConditionTypeHelper_1.UnionDetectBattleConditionTypeHelper.GetUnionDetectBattleConditionTypeObject(
            t,
          ))) &&
        (this.Evh =
          UnionDetectBattleConditionTypeHelper_1.UnionDetectBattleConditionTypeHelper.ReadUnionDetectBattleConditionType(
            t,
            this.FbDataInternal.stateOption(e),
          )),
      this.Evh
    );
  }
}
exports.FbWaitBattleCondition = FbWaitBattleCondition;
//# sourceMappingURL=FbWaitBattleCondition.js.map
