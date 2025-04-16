"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionRemovePreloadResourceConfig =
    exports.unionToUnionRemovePreloadResourceConfig =
    exports.UnionRemovePreloadResourceConfig =
      void 0);
const remove_preload_resource_phantom_character_js_1 = require("../fb-action/remove-preload-resource-phantom-character.js"),
  remove_preload_resource_trial_character_js_1 = require("../fb-action/remove-preload-resource-trial-character.js");
var UnionRemovePreloadResourceConfig;
function unionToUnionRemovePreloadResourceConfig(e, r) {
  switch (UnionRemovePreloadResourceConfig[e]) {
    case "NONE":
      return;
    case "RemovePreloadResourcePhantomCharacter":
      return r(
        new remove_preload_resource_phantom_character_js_1.RemovePreloadResourcePhantomCharacter(),
      );
    case "RemovePreloadResourceTrialCharacter":
      return r(
        new remove_preload_resource_trial_character_js_1.RemovePreloadResourceTrialCharacter(),
      );
    default:
      return;
  }
}
function unionListToUnionRemovePreloadResourceConfig(e, r, o) {
  switch (UnionRemovePreloadResourceConfig[e]) {
    case "NONE":
      return;
    case "RemovePreloadResourcePhantomCharacter":
      return r(
        o,
        new remove_preload_resource_phantom_character_js_1.RemovePreloadResourcePhantomCharacter(),
      );
    case "RemovePreloadResourceTrialCharacter":
      return r(
        o,
        new remove_preload_resource_trial_character_js_1.RemovePreloadResourceTrialCharacter(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.RemovePreloadResourcePhantomCharacter = 1)] =
      "RemovePreloadResourcePhantomCharacter"),
    (e[(e.RemovePreloadResourceTrialCharacter = 2)] =
      "RemovePreloadResourceTrialCharacter");
})(
  (UnionRemovePreloadResourceConfig =
    exports.UnionRemovePreloadResourceConfig ||
    (exports.UnionRemovePreloadResourceConfig = {})),
),
  (exports.unionToUnionRemovePreloadResourceConfig =
    unionToUnionRemovePreloadResourceConfig),
  (exports.unionListToUnionRemovePreloadResourceConfig =
    unionListToUnionRemovePreloadResourceConfig);
//# sourceMappingURL=union-remove-preload-resource-config.js.map
