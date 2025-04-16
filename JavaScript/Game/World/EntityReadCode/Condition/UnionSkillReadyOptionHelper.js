"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSkillReadyOptionHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbESkillReady_1 = require("./FbESkillReady"),
  FbUltimateSkillReady_1 = require("./FbUltimateSkillReady"),
  FbVisionSkillReady_1 = require("./FbVisionSkillReady");
class UnionSkillReadyOptionHelper {
  static GetUnionSkillReadyOptionObject(i) {
    switch (i) {
      case fb_condition_1.UnionSkillReadyOption.ESkillReady:
        return new fb_condition_1.ESkillReady();
      case fb_condition_1.UnionSkillReadyOption.UltimateSkillReady:
        return new fb_condition_1.UltimateSkillReady();
      case fb_condition_1.UnionSkillReadyOption.VisionSkillReady:
        return new fb_condition_1.VisionSkillReady();
      default:
        return;
    }
  }
  static ReadUnionSkillReadyOption(i, e) {
    if (void 0 !== e)
      switch (i) {
        case fb_condition_1.UnionSkillReadyOption.ESkillReady:
          return FbESkillReady_1.FbESkillReady.Create(e);
        case fb_condition_1.UnionSkillReadyOption.UltimateSkillReady:
          return FbUltimateSkillReady_1.FbUltimateSkillReady.Create(e);
        case fb_condition_1.UnionSkillReadyOption.VisionSkillReady:
          return FbVisionSkillReady_1.FbVisionSkillReady.Create(e);
        default:
          return;
      }
  }
}
exports.UnionSkillReadyOptionHelper = UnionSkillReadyOptionHelper;
//# sourceMappingURL=UnionSkillReadyOptionHelper.js.map
