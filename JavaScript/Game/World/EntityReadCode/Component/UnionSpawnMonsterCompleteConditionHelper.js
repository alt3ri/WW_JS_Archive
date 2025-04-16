"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSpawnMonsterCompleteConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAllKillCondition_1 = require("./FbAllKillCondition"),
  FbDurationCondition_1 = require("./FbDurationCondition"),
  FbQuantityRefillCondition_1 = require("./FbQuantityRefillCondition");
class UnionSpawnMonsterCompleteConditionHelper {
  static GetUnionSpawnMonsterCompleteConditionObject(n) {
    switch (n) {
      case fb_component_1.UnionSpawnMonsterCompleteCondition.AllKillCondition:
        return new fb_component_1.AllKillCondition();
      case fb_component_1.UnionSpawnMonsterCompleteCondition.DurationCondition:
        return new fb_component_1.DurationCondition();
      case fb_component_1.UnionSpawnMonsterCompleteCondition
        .QuantityRefillCondition:
        return new fb_component_1.QuantityRefillCondition();
      default:
        return;
    }
  }
  static ReadUnionSpawnMonsterCompleteCondition(n, o) {
    if (void 0 !== o)
      switch (n) {
        case fb_component_1.UnionSpawnMonsterCompleteCondition.AllKillCondition:
          return FbAllKillCondition_1.FbAllKillCondition.Create(o);
        case fb_component_1.UnionSpawnMonsterCompleteCondition
          .DurationCondition:
          return FbDurationCondition_1.FbDurationCondition.Create(o);
        case fb_component_1.UnionSpawnMonsterCompleteCondition
          .QuantityRefillCondition:
          return FbQuantityRefillCondition_1.FbQuantityRefillCondition.Create(
            o,
          );
        default:
          return;
      }
  }
}
exports.UnionSpawnMonsterCompleteConditionHelper =
  UnionSpawnMonsterCompleteConditionHelper;
//# sourceMappingURL=UnionSpawnMonsterCompleteConditionHelper.js.map
