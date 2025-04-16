"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionHeadStyleHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbHeadStyleMonsterDisplay_1 = require("./FbHeadStyleMonsterDisplay"),
  FbHeadStyleNormal_1 = require("./FbHeadStyleNormal"),
  FbHeadStyleVoiceOnly_1 = require("./FbHeadStyleVoiceOnly"),
  FbHeadStyleWarning_1 = require("./FbHeadStyleWarning"),
  FbHeadStyleWeakSignal_1 = require("./FbHeadStyleWeakSignal");
class UnionHeadStyleHelper {
  static GetUnionHeadStyleObject(e) {
    switch (e) {
      case fb_action_1.UnionHeadStyle.HeadStyleMonsterDisplay:
        return new fb_action_1.HeadStyleMonsterDisplay();
      case fb_action_1.UnionHeadStyle.HeadStyleNormal:
        return new fb_action_1.HeadStyleNormal();
      case fb_action_1.UnionHeadStyle.HeadStyleVoiceOnly:
        return new fb_action_1.HeadStyleVoiceOnly();
      case fb_action_1.UnionHeadStyle.HeadStyleWarning:
        return new fb_action_1.HeadStyleWarning();
      case fb_action_1.UnionHeadStyle.HeadStyleWeakSignal:
        return new fb_action_1.HeadStyleWeakSignal();
      default:
        return;
    }
  }
  static ReadUnionHeadStyle(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionHeadStyle.HeadStyleMonsterDisplay:
          return FbHeadStyleMonsterDisplay_1.FbHeadStyleMonsterDisplay.Create(
            t,
          );
        case fb_action_1.UnionHeadStyle.HeadStyleNormal:
          return FbHeadStyleNormal_1.FbHeadStyleNormal.Create(t);
        case fb_action_1.UnionHeadStyle.HeadStyleVoiceOnly:
          return FbHeadStyleVoiceOnly_1.FbHeadStyleVoiceOnly.Create(t);
        case fb_action_1.UnionHeadStyle.HeadStyleWarning:
          return FbHeadStyleWarning_1.FbHeadStyleWarning.Create(t);
        case fb_action_1.UnionHeadStyle.HeadStyleWeakSignal:
          return FbHeadStyleWeakSignal_1.FbHeadStyleWeakSignal.Create(t);
        default:
          return;
      }
  }
}
exports.UnionHeadStyleHelper = UnionHeadStyleHelper;
//# sourceMappingURL=UnionHeadStyleHelper.js.map
