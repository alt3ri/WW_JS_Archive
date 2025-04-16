"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionOnlinePlayerConditionTargetHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbOnlinePlayerConditionTargetHost_1 = require("./FbOnlinePlayerConditionTargetHost"),
  FbOnlinePlayerConditionTargetParticipator_1 = require("./FbOnlinePlayerConditionTargetParticipator");
class UnionOnlinePlayerConditionTargetHelper {
  static GetUnionOnlinePlayerConditionTargetObject(n) {
    switch (n) {
      case fb_condition_1.UnionOnlinePlayerConditionTarget
        .OnlinePlayerConditionTargetHost:
        return new fb_condition_1.OnlinePlayerConditionTargetHost();
      case fb_condition_1.UnionOnlinePlayerConditionTarget
        .OnlinePlayerConditionTargetParticipator:
        return new fb_condition_1.OnlinePlayerConditionTargetParticipator();
      default:
        return;
    }
  }
  static ReadUnionOnlinePlayerConditionTarget(n, i) {
    if (void 0 !== i)
      switch (n) {
        case fb_condition_1.UnionOnlinePlayerConditionTarget
          .OnlinePlayerConditionTargetHost:
          return FbOnlinePlayerConditionTargetHost_1.FbOnlinePlayerConditionTargetHost.Create(
            i,
          );
        case fb_condition_1.UnionOnlinePlayerConditionTarget
          .OnlinePlayerConditionTargetParticipator:
          return FbOnlinePlayerConditionTargetParticipator_1.FbOnlinePlayerConditionTargetParticipator.Create(
            i,
          );
        default:
          return;
      }
  }
}
exports.UnionOnlinePlayerConditionTargetHelper =
  UnionOnlinePlayerConditionTargetHelper;
//# sourceMappingURL=UnionOnlinePlayerConditionTargetHelper.js.map
