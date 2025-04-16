"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionLevelAibehaviour =
    exports.unionToUnionLevelAibehaviour =
    exports.UnionLevelAIBehaviour =
      void 0);
const interact_behaviour_actions_js_1 = require("../fb-component/interact-behaviour-actions.js"),
  level_aibehaviour_spline_js_1 = require("../fb-component/level-aibehaviour-spline.js");
var UnionLevelAIBehaviour;
function unionToUnionLevelAibehaviour(e, i) {
  switch (UnionLevelAIBehaviour[e]) {
    case "NONE":
      return;
    case "InteractBehaviourActions":
      return i(new interact_behaviour_actions_js_1.InteractBehaviourActions());
    case "LevelAIBehaviourSpline":
      return i(new level_aibehaviour_spline_js_1.LevelAIBehaviourSpline());
    default:
      return;
  }
}
function unionListToUnionLevelAibehaviour(e, i, n) {
  switch (UnionLevelAIBehaviour[e]) {
    case "NONE":
      return;
    case "InteractBehaviourActions":
      return i(
        n,
        new interact_behaviour_actions_js_1.InteractBehaviourActions(),
      );
    case "LevelAIBehaviourSpline":
      return i(n, new level_aibehaviour_spline_js_1.LevelAIBehaviourSpline());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.InteractBehaviourActions = 1)] = "InteractBehaviourActions"),
    (e[(e.LevelAIBehaviourSpline = 2)] = "LevelAIBehaviourSpline");
})(
  (UnionLevelAIBehaviour =
    exports.UnionLevelAIBehaviour || (exports.UnionLevelAIBehaviour = {})),
),
  (exports.unionToUnionLevelAibehaviour = unionToUnionLevelAibehaviour),
  (exports.unionListToUnionLevelAibehaviour = unionListToUnionLevelAibehaviour);
//# sourceMappingURL=union-level-aibehaviour.js.map
