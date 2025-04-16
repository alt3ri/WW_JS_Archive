"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionDelayRemoveConfig =
    exports.unionToUnionDelayRemoveConfig =
    exports.UnionDelayRemoveConfig =
      void 0);
const delay_remove_after_skill_finish_js_1 = require("../fb-action/delay-remove-after-skill-finish.js");
var UnionDelayRemoveConfig;
function unionToUnionDelayRemoveConfig(e, n) {
  switch (UnionDelayRemoveConfig[e]) {
    case "NONE":
      return;
    case "DelayRemoveAfterSkillFinish":
      return n(
        new delay_remove_after_skill_finish_js_1.DelayRemoveAfterSkillFinish(),
      );
    default:
      return;
  }
}
function unionListToUnionDelayRemoveConfig(e, n, o) {
  switch (UnionDelayRemoveConfig[e]) {
    case "NONE":
      return;
    case "DelayRemoveAfterSkillFinish":
      return n(
        o,
        new delay_remove_after_skill_finish_js_1.DelayRemoveAfterSkillFinish(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DelayRemoveAfterSkillFinish = 1)] = "DelayRemoveAfterSkillFinish");
})(
  (UnionDelayRemoveConfig =
    exports.UnionDelayRemoveConfig || (exports.UnionDelayRemoveConfig = {})),
),
  (exports.unionToUnionDelayRemoveConfig = unionToUnionDelayRemoveConfig),
  (exports.unionListToUnionDelayRemoveConfig =
    unionListToUnionDelayRemoveConfig);
//# sourceMappingURL=union-delay-remove-config.js.map
