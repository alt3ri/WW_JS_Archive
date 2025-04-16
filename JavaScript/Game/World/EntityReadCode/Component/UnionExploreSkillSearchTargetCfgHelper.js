"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionExploreSkillSearchTargetCfgHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbAngleWeight_1 = require("./FbAngleWeight"),
  FbEnterScreenWeight_1 = require("./FbEnterScreenWeight");
class UnionExploreSkillSearchTargetCfgHelper {
  static GetUnionExploreSkillSearchTargetCfgObject(e) {
    switch (e) {
      case fb_component_1.UnionExploreSkillSearchTargetCfg.AngleWeight:
        return new fb_component_1.AngleWeight();
      case fb_component_1.UnionExploreSkillSearchTargetCfg.EnterScreenWeight:
        return new fb_component_1.EnterScreenWeight();
      default:
        return;
    }
  }
  static ReadUnionExploreSkillSearchTargetCfg(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionExploreSkillSearchTargetCfg.AngleWeight:
          return FbAngleWeight_1.FbAngleWeight.Create(t);
        case fb_component_1.UnionExploreSkillSearchTargetCfg.EnterScreenWeight:
          return FbEnterScreenWeight_1.FbEnterScreenWeight.Create(t);
        default:
          return;
      }
  }
}
exports.UnionExploreSkillSearchTargetCfgHelper =
  UnionExploreSkillSearchTargetCfgHelper;
//# sourceMappingURL=UnionExploreSkillSearchTargetCfgHelper.js.map
