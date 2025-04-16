"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionStateOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbNotifyMonsterPerception_1 = require("./FbNotifyMonsterPerception"),
  FbNotifyMonsterPlayStandbyTags_1 = require("./FbNotifyMonsterPlayStandbyTags"),
  FbSetBattleTag_1 = require("./FbSetBattleTag");
class UnionStateOptionHelper {
  static GetUnionStateOptionObject(t) {
    switch (t) {
      case fb_action_1.UnionStateOption.NotifyMonsterPerception:
        return new fb_action_1.NotifyMonsterPerception();
      case fb_action_1.UnionStateOption.NotifyMonsterPlayStandbyTags:
        return new fb_action_1.NotifyMonsterPlayStandbyTags();
      case fb_action_1.UnionStateOption.SetBattleTag:
        return new fb_action_1.SetBattleTag();
      default:
        return;
    }
  }
  static ReadUnionStateOption(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_action_1.UnionStateOption.NotifyMonsterPerception:
          return FbNotifyMonsterPerception_1.FbNotifyMonsterPerception.Create(
            e,
          );
        case fb_action_1.UnionStateOption.NotifyMonsterPlayStandbyTags:
          return FbNotifyMonsterPlayStandbyTags_1.FbNotifyMonsterPlayStandbyTags.Create(
            e,
          );
        case fb_action_1.UnionStateOption.SetBattleTag:
          return FbSetBattleTag_1.FbSetBattleTag.Create(e);
        default:
          return;
      }
  }
}
exports.UnionStateOptionHelper = UnionStateOptionHelper;
//# sourceMappingURL=UnionStateOptionHelper.js.map
