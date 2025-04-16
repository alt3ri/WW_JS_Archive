"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPreloadObjectTypeConfig =
    exports.unionToUnionPreloadObjectTypeConfig =
    exports.UnionPreloadObjectTypeConfig =
      void 0);
const preload_flows_js_1 = require("../fb-action/preload-flows.js"),
  preload_phantom_character_for_skill_js_1 = require("../fb-action/preload-phantom-character-for-skill.js"),
  preload_trial_character_for_skill_js_1 = require("../fb-action/preload-trial-character-for-skill.js");
var UnionPreloadObjectTypeConfig;
function unionToUnionPreloadObjectTypeConfig(r, e) {
  switch (UnionPreloadObjectTypeConfig[r]) {
    case "NONE":
      return;
    case "PreloadFlows":
      return e(new preload_flows_js_1.PreloadFlows());
    case "PreloadPhantomCharacterForSkill":
      return e(
        new preload_phantom_character_for_skill_js_1.PreloadPhantomCharacterForSkill(),
      );
    case "PreloadTrialCharacterForSkill":
      return e(
        new preload_trial_character_for_skill_js_1.PreloadTrialCharacterForSkill(),
      );
    default:
      return;
  }
}
function unionListToUnionPreloadObjectTypeConfig(r, e, o) {
  switch (UnionPreloadObjectTypeConfig[r]) {
    case "NONE":
      return;
    case "PreloadFlows":
      return e(o, new preload_flows_js_1.PreloadFlows());
    case "PreloadPhantomCharacterForSkill":
      return e(
        o,
        new preload_phantom_character_for_skill_js_1.PreloadPhantomCharacterForSkill(),
      );
    case "PreloadTrialCharacterForSkill":
      return e(
        o,
        new preload_trial_character_for_skill_js_1.PreloadTrialCharacterForSkill(),
      );
    default:
      return;
  }
}
!(function (r) {
  (r[(r.NONE = 0)] = "NONE"),
    (r[(r.PreloadFlows = 1)] = "PreloadFlows"),
    (r[(r.PreloadPhantomCharacterForSkill = 2)] =
      "PreloadPhantomCharacterForSkill"),
    (r[(r.PreloadTrialCharacterForSkill = 3)] =
      "PreloadTrialCharacterForSkill");
})(
  (UnionPreloadObjectTypeConfig =
    exports.UnionPreloadObjectTypeConfig ||
    (exports.UnionPreloadObjectTypeConfig = {})),
),
  (exports.unionToUnionPreloadObjectTypeConfig =
    unionToUnionPreloadObjectTypeConfig),
  (exports.unionListToUnionPreloadObjectTypeConfig =
    unionListToUnionPreloadObjectTypeConfig);
//# sourceMappingURL=union-preload-object-type-config.js.map
