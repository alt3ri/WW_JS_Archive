"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAiGearStrategyHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbRaceStrategy_1 = require("./FbRaceStrategy"),
  FbRenjuStrategy_1 = require("./FbRenjuStrategy");
class UnionAiGearStrategyHelper {
  static GetUnionAiGearStrategyObject(e) {
    switch (e) {
      case fb_component_1.UnionAiGearStrategy.RaceStrategy:
        return new fb_component_1.RaceStrategy();
      case fb_component_1.UnionAiGearStrategy.RenjuStrategy:
        return new fb_component_1.RenjuStrategy();
      default:
        return;
    }
  }
  static ReadUnionAiGearStrategy(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionAiGearStrategy.RaceStrategy:
          return FbRaceStrategy_1.FbRaceStrategy.Create(t);
        case fb_component_1.UnionAiGearStrategy.RenjuStrategy:
          return FbRenjuStrategy_1.FbRenjuStrategy.Create(t);
        default:
          return;
      }
  }
}
exports.UnionAiGearStrategyHelper = UnionAiGearStrategyHelper;
//# sourceMappingURL=UnionAiGearStrategyHelper.js.map
