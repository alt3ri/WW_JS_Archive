"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionExploreSkillInteractOption =
    exports.unionToUnionExploreSkillInteractOption =
    exports.UnionExploreSkillInteractOption =
      void 0);
const explore_skill_custom_js_1 = require("../fb-component/explore-skill-custom.js"),
  explore_skill_lonely_doll_pollutant_js_1 = require("../fb-component/explore-skill-lonely-doll-pollutant.js"),
  explore_skill_pull_giant_js_1 = require("../fb-component/explore-skill-pull-giant.js"),
  explore_skill_pull_statue_js_1 = require("../fb-component/explore-skill-pull-statue.js"),
  explore_skill_rag_doll_crushing_rock_js_1 = require("../fb-component/explore-skill-rag-doll-crushing-rock.js"),
  explore_skill_rag_doll_destroy_solid_rock_js_1 = require("../fb-component/explore-skill-rag-doll-destroy-solid-rock.js"),
  explore_skill_statue_interact_point_js_1 = require("../fb-component/explore-skill-statue-interact-point.js");
var UnionExploreSkillInteractOption;
function unionToUnionExploreSkillInteractOption(l, e) {
  switch (UnionExploreSkillInteractOption[l]) {
    case "NONE":
      return;
    case "ExploreSkillCustom":
      return e(new explore_skill_custom_js_1.ExploreSkillCustom());
    case "ExploreSkillLonelyDollPollutant":
      return e(
        new explore_skill_lonely_doll_pollutant_js_1.ExploreSkillLonelyDollPollutant(),
      );
    case "ExploreSkillPullGiant":
      return e(new explore_skill_pull_giant_js_1.ExploreSkillPullGiant());
    case "ExploreSkillPullStatue":
      return e(new explore_skill_pull_statue_js_1.ExploreSkillPullStatue());
    case "ExploreSkillRagDollCrushingRock":
      return e(
        new explore_skill_rag_doll_crushing_rock_js_1.ExploreSkillRagDollCrushingRock(),
      );
    case "ExploreSkillRagDollDestroySolidRock":
      return e(
        new explore_skill_rag_doll_destroy_solid_rock_js_1.ExploreSkillRagDollDestroySolidRock(),
      );
    case "ExploreSkillStatueInteractPoint":
      return e(
        new explore_skill_statue_interact_point_js_1.ExploreSkillStatueInteractPoint(),
      );
    default:
      return;
  }
}
function unionListToUnionExploreSkillInteractOption(l, e, o) {
  switch (UnionExploreSkillInteractOption[l]) {
    case "NONE":
      return;
    case "ExploreSkillCustom":
      return e(o, new explore_skill_custom_js_1.ExploreSkillCustom());
    case "ExploreSkillLonelyDollPollutant":
      return e(
        o,
        new explore_skill_lonely_doll_pollutant_js_1.ExploreSkillLonelyDollPollutant(),
      );
    case "ExploreSkillPullGiant":
      return e(o, new explore_skill_pull_giant_js_1.ExploreSkillPullGiant());
    case "ExploreSkillPullStatue":
      return e(o, new explore_skill_pull_statue_js_1.ExploreSkillPullStatue());
    case "ExploreSkillRagDollCrushingRock":
      return e(
        o,
        new explore_skill_rag_doll_crushing_rock_js_1.ExploreSkillRagDollCrushingRock(),
      );
    case "ExploreSkillRagDollDestroySolidRock":
      return e(
        o,
        new explore_skill_rag_doll_destroy_solid_rock_js_1.ExploreSkillRagDollDestroySolidRock(),
      );
    case "ExploreSkillStatueInteractPoint":
      return e(
        o,
        new explore_skill_statue_interact_point_js_1.ExploreSkillStatueInteractPoint(),
      );
    default:
      return;
  }
}
!(function (l) {
  (l[(l.NONE = 0)] = "NONE"),
    (l[(l.ExploreSkillCustom = 1)] = "ExploreSkillCustom"),
    (l[(l.ExploreSkillLonelyDollPollutant = 2)] =
      "ExploreSkillLonelyDollPollutant"),
    (l[(l.ExploreSkillPullGiant = 3)] = "ExploreSkillPullGiant"),
    (l[(l.ExploreSkillPullStatue = 4)] = "ExploreSkillPullStatue"),
    (l[(l.ExploreSkillRagDollCrushingRock = 5)] =
      "ExploreSkillRagDollCrushingRock"),
    (l[(l.ExploreSkillRagDollDestroySolidRock = 6)] =
      "ExploreSkillRagDollDestroySolidRock"),
    (l[(l.ExploreSkillStatueInteractPoint = 7)] =
      "ExploreSkillStatueInteractPoint");
})(
  (UnionExploreSkillInteractOption =
    exports.UnionExploreSkillInteractOption ||
    (exports.UnionExploreSkillInteractOption = {})),
),
  (exports.unionToUnionExploreSkillInteractOption =
    unionToUnionExploreSkillInteractOption),
  (exports.unionListToUnionExploreSkillInteractOption =
    unionListToUnionExploreSkillInteractOption);
//# sourceMappingURL=union-explore-skill-interact-option.js.map
