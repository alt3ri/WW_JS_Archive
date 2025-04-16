"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionDelayRemoveConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDelayRemoveAfterSkillFinish_1 = require("./FbDelayRemoveAfterSkillFinish");
class UnionDelayRemoveConfigHelper {
  static GetUnionDelayRemoveConfigObject(e) {
    if (e === fb_action_1.UnionDelayRemoveConfig.DelayRemoveAfterSkillFinish)
      return new fb_action_1.DelayRemoveAfterSkillFinish();
  }
  static ReadUnionDelayRemoveConfig(e, i) {
    return void 0 !== i &&
      e === fb_action_1.UnionDelayRemoveConfig.DelayRemoveAfterSkillFinish
      ? FbDelayRemoveAfterSkillFinish_1.FbDelayRemoveAfterSkillFinish.Create(i)
      : void 0;
  }
}
exports.UnionDelayRemoveConfigHelper = UnionDelayRemoveConfigHelper;
//# sourceMappingURL=UnionDelayRemoveConfigHelper.js.map
