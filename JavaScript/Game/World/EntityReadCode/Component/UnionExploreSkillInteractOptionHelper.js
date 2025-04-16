"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionExploreSkillInteractOptionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbExploreSkillCustom_1 = require("./FbExploreSkillCustom"),
  FbExploreSkillLonelyDollPollutant_1 = require("./FbExploreSkillLonelyDollPollutant"),
  FbExploreSkillPullGiant_1 = require("./FbExploreSkillPullGiant"),
  FbExploreSkillPullStatue_1 = require("./FbExploreSkillPullStatue"),
  FbExploreSkillRagDollCrushingRock_1 = require("./FbExploreSkillRagDollCrushingRock"),
  FbExploreSkillRagDollDestroySolidRock_1 = require("./FbExploreSkillRagDollDestroySolidRock"),
  FbExploreSkillStatueInteractPoint_1 = require("./FbExploreSkillStatueInteractPoint");
class UnionExploreSkillInteractOptionHelper {
  static GetUnionExploreSkillInteractOptionObject(e) {
    switch (e) {
      case fb_component_1.UnionExploreSkillInteractOption.ExploreSkillCustom:
        return new fb_component_1.ExploreSkillCustom();
      case fb_component_1.UnionExploreSkillInteractOption
        .ExploreSkillLonelyDollPollutant:
        return new fb_component_1.ExploreSkillLonelyDollPollutant();
      case fb_component_1.UnionExploreSkillInteractOption.ExploreSkillPullGiant:
        return new fb_component_1.ExploreSkillPullGiant();
      case fb_component_1.UnionExploreSkillInteractOption
        .ExploreSkillPullStatue:
        return new fb_component_1.ExploreSkillPullStatue();
      case fb_component_1.UnionExploreSkillInteractOption
        .ExploreSkillRagDollCrushingRock:
        return new fb_component_1.ExploreSkillRagDollCrushingRock();
      case fb_component_1.UnionExploreSkillInteractOption
        .ExploreSkillRagDollDestroySolidRock:
        return new fb_component_1.ExploreSkillRagDollDestroySolidRock();
      case fb_component_1.UnionExploreSkillInteractOption
        .ExploreSkillStatueInteractPoint:
        return new fb_component_1.ExploreSkillStatueInteractPoint();
      default:
        return;
    }
  }
  static ReadUnionExploreSkillInteractOption(e, l) {
    if (void 0 !== l)
      switch (e) {
        case fb_component_1.UnionExploreSkillInteractOption.ExploreSkillCustom:
          return FbExploreSkillCustom_1.FbExploreSkillCustom.Create(l);
        case fb_component_1.UnionExploreSkillInteractOption
          .ExploreSkillLonelyDollPollutant:
          return FbExploreSkillLonelyDollPollutant_1.FbExploreSkillLonelyDollPollutant.Create(
            l,
          );
        case fb_component_1.UnionExploreSkillInteractOption
          .ExploreSkillPullGiant:
          return FbExploreSkillPullGiant_1.FbExploreSkillPullGiant.Create(l);
        case fb_component_1.UnionExploreSkillInteractOption
          .ExploreSkillPullStatue:
          return FbExploreSkillPullStatue_1.FbExploreSkillPullStatue.Create(l);
        case fb_component_1.UnionExploreSkillInteractOption
          .ExploreSkillRagDollCrushingRock:
          return FbExploreSkillRagDollCrushingRock_1.FbExploreSkillRagDollCrushingRock.Create(
            l,
          );
        case fb_component_1.UnionExploreSkillInteractOption
          .ExploreSkillRagDollDestroySolidRock:
          return FbExploreSkillRagDollDestroySolidRock_1.FbExploreSkillRagDollDestroySolidRock.Create(
            l,
          );
        case fb_component_1.UnionExploreSkillInteractOption
          .ExploreSkillStatueInteractPoint:
          return FbExploreSkillStatueInteractPoint_1.FbExploreSkillStatueInteractPoint.Create(
            l,
          );
        default:
          return;
      }
  }
}
exports.UnionExploreSkillInteractOptionHelper =
  UnionExploreSkillInteractOptionHelper;
//# sourceMappingURL=UnionExploreSkillInteractOptionHelper.js.map
