"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTalkOptionParamHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTalkOptionQteFailed_1 = require("./FbTalkOptionQteFailed"),
  FbTalkOptionQteFailedDelayExec_1 = require("./FbTalkOptionQteFailedDelayExec"),
  FbTalkOptionQteSucceed_1 = require("./FbTalkOptionQteSucceed"),
  FbTalkOptionQteSucceedDelayExec_1 = require("./FbTalkOptionQteSucceedDelayExec"),
  FbTalkOptionRogueRandomEvent_1 = require("./FbTalkOptionRogueRandomEvent");
class UnionTalkOptionParamHelper {
  static GetUnionTalkOptionParamObject(e) {
    switch (e) {
      case fb_action_1.UnionTalkOptionParam.TalkOptionQteFailed:
        return new fb_action_1.TalkOptionQteFailed();
      case fb_action_1.UnionTalkOptionParam.TalkOptionQteFailedDelayExec:
        return new fb_action_1.TalkOptionQteFailedDelayExec();
      case fb_action_1.UnionTalkOptionParam.TalkOptionQteSucceed:
        return new fb_action_1.TalkOptionQteSucceed();
      case fb_action_1.UnionTalkOptionParam.TalkOptionQteSucceedDelayExec:
        return new fb_action_1.TalkOptionQteSucceedDelayExec();
      case fb_action_1.UnionTalkOptionParam.TalkOptionRogueRandomEvent:
        return new fb_action_1.TalkOptionRogueRandomEvent();
      default:
        return;
    }
  }
  static ReadUnionTalkOptionParam(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionTalkOptionParam.TalkOptionQteFailed:
          return FbTalkOptionQteFailed_1.FbTalkOptionQteFailed.Create(t);
        case fb_action_1.UnionTalkOptionParam.TalkOptionQteFailedDelayExec:
          return FbTalkOptionQteFailedDelayExec_1.FbTalkOptionQteFailedDelayExec.Create(
            t,
          );
        case fb_action_1.UnionTalkOptionParam.TalkOptionQteSucceed:
          return FbTalkOptionQteSucceed_1.FbTalkOptionQteSucceed.Create(t);
        case fb_action_1.UnionTalkOptionParam.TalkOptionQteSucceedDelayExec:
          return FbTalkOptionQteSucceedDelayExec_1.FbTalkOptionQteSucceedDelayExec.Create(
            t,
          );
        case fb_action_1.UnionTalkOptionParam.TalkOptionRogueRandomEvent:
          return FbTalkOptionRogueRandomEvent_1.FbTalkOptionRogueRandomEvent.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionTalkOptionParamHelper = UnionTalkOptionParamHelper;
//# sourceMappingURL=UnionTalkOptionParamHelper.js.map
