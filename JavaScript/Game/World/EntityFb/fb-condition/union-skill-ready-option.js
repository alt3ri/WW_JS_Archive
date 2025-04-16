"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSkillReadyOption =
    exports.unionToUnionSkillReadyOption =
    exports.UnionSkillReadyOption =
      void 0);
const eskill_ready_js_1 = require("../fb-condition/eskill-ready.js"),
  ultimate_skill_ready_js_1 = require("../fb-condition/ultimate-skill-ready.js"),
  vision_skill_ready_js_1 = require("../fb-condition/vision-skill-ready.js");
var UnionSkillReadyOption;
function unionToUnionSkillReadyOption(i, e) {
  switch (UnionSkillReadyOption[i]) {
    case "NONE":
      return;
    case "ESkillReady":
      return e(new eskill_ready_js_1.ESkillReady());
    case "UltimateSkillReady":
      return e(new ultimate_skill_ready_js_1.UltimateSkillReady());
    case "VisionSkillReady":
      return e(new vision_skill_ready_js_1.VisionSkillReady());
    default:
      return;
  }
}
function unionListToUnionSkillReadyOption(i, e, l) {
  switch (UnionSkillReadyOption[i]) {
    case "NONE":
      return;
    case "ESkillReady":
      return e(l, new eskill_ready_js_1.ESkillReady());
    case "UltimateSkillReady":
      return e(l, new ultimate_skill_ready_js_1.UltimateSkillReady());
    case "VisionSkillReady":
      return e(l, new vision_skill_ready_js_1.VisionSkillReady());
    default:
      return;
  }
}
!(function (i) {
  (i[(i.NONE = 0)] = "NONE"),
    (i[(i.ESkillReady = 1)] = "ESkillReady"),
    (i[(i.UltimateSkillReady = 2)] = "UltimateSkillReady"),
    (i[(i.VisionSkillReady = 3)] = "VisionSkillReady");
})(
  (UnionSkillReadyOption =
    exports.UnionSkillReadyOption || (exports.UnionSkillReadyOption = {})),
),
  (exports.unionToUnionSkillReadyOption = unionToUnionSkillReadyOption),
  (exports.unionListToUnionSkillReadyOption = unionListToUnionSkillReadyOption);
//# sourceMappingURL=union-skill-ready-option.js.map
