"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionLevelAiCycleOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbLevelAiCycleLooply_1 = require("./FbLevelAiCycleLooply");
class UnionLevelAiCycleOptionHelper {
  static GetUnionLevelAiCycleOptionObject(e) {
    if (e === fb_component_1.UnionLevelAiCycleOption.LevelAiCycleLooply)
      return new fb_component_1.LevelAiCycleLooply();
  }
  static ReadUnionLevelAiCycleOption(e, o) {
    return void 0 !== o &&
      e === fb_component_1.UnionLevelAiCycleOption.LevelAiCycleLooply
      ? FbLevelAiCycleLooply_1.FbLevelAiCycleLooply.Create(o)
      : void 0;
  }
}
exports.UnionLevelAiCycleOptionHelper = UnionLevelAiCycleOptionHelper;
//# sourceMappingURL=UnionLevelAiCycleOptionHelper.js.map
