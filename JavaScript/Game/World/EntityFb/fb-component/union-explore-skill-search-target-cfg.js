"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionExploreSkillSearchTargetCfg =
    exports.unionToUnionExploreSkillSearchTargetCfg =
    exports.UnionExploreSkillSearchTargetCfg =
      void 0);
const angle_weight_js_1 = require("../fb-component/angle-weight.js"),
  enter_screen_weight_js_1 = require("../fb-component/enter-screen-weight.js");
var UnionExploreSkillSearchTargetCfg;
function unionToUnionExploreSkillSearchTargetCfg(e, n) {
  switch (UnionExploreSkillSearchTargetCfg[e]) {
    case "NONE":
      return;
    case "AngleWeight":
      return n(new angle_weight_js_1.AngleWeight());
    case "EnterScreenWeight":
      return n(new enter_screen_weight_js_1.EnterScreenWeight());
    default:
      return;
  }
}
function unionListToUnionExploreSkillSearchTargetCfg(e, n, r) {
  switch (UnionExploreSkillSearchTargetCfg[e]) {
    case "NONE":
      return;
    case "AngleWeight":
      return n(r, new angle_weight_js_1.AngleWeight());
    case "EnterScreenWeight":
      return n(r, new enter_screen_weight_js_1.EnterScreenWeight());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AngleWeight = 1)] = "AngleWeight"),
    (e[(e.EnterScreenWeight = 2)] = "EnterScreenWeight");
})(
  (UnionExploreSkillSearchTargetCfg =
    exports.UnionExploreSkillSearchTargetCfg ||
    (exports.UnionExploreSkillSearchTargetCfg = {})),
),
  (exports.unionToUnionExploreSkillSearchTargetCfg =
    unionToUnionExploreSkillSearchTargetCfg),
  (exports.unionListToUnionExploreSkillSearchTargetCfg =
    unionListToUnionExploreSkillSearchTargetCfg);
//# sourceMappingURL=union-explore-skill-search-target-cfg.js.map
