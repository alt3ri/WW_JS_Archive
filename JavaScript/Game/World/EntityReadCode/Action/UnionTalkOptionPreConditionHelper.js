"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTalkOptionPreConditionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTalkOptionCondition_1 = require("./FbTalkOptionCondition"),
  FbTalkOptionPreOption_1 = require("./FbTalkOptionPreOption");
class UnionTalkOptionPreConditionHelper {
  static GetUnionTalkOptionPreConditionObject(n) {
    switch (n) {
      case fb_action_1.UnionTalkOptionPreCondition.TalkOptionCondition:
        return new fb_action_1.TalkOptionCondition();
      case fb_action_1.UnionTalkOptionPreCondition.TalkOptionPreOption:
        return new fb_action_1.TalkOptionPreOption();
      default:
        return;
    }
  }
  static ReadUnionTalkOptionPreCondition(n, t) {
    if (void 0 !== t)
      switch (n) {
        case fb_action_1.UnionTalkOptionPreCondition.TalkOptionCondition:
          return FbTalkOptionCondition_1.FbTalkOptionCondition.Create(t);
        case fb_action_1.UnionTalkOptionPreCondition.TalkOptionPreOption:
          return FbTalkOptionPreOption_1.FbTalkOptionPreOption.Create(t);
        default:
          return;
      }
  }
}
exports.UnionTalkOptionPreConditionHelper = UnionTalkOptionPreConditionHelper;
//# sourceMappingURL=UnionTalkOptionPreConditionHelper.js.map
