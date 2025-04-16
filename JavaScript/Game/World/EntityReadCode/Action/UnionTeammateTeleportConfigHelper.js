"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTeammateTeleportConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTelePortAfterTimeOut_1 = require("./FbTelePortAfterTimeOut");
class UnionTeammateTeleportConfigHelper {
  static GetUnionTeammateTeleportConfigObject(e) {
    if (e === fb_action_1.UnionTeammateTeleportConfig.TelePortAfterTimeOut)
      return new fb_action_1.TelePortAfterTimeOut();
  }
  static ReadUnionTeammateTeleportConfig(e, t) {
    return void 0 !== t &&
      e === fb_action_1.UnionTeammateTeleportConfig.TelePortAfterTimeOut
      ? FbTelePortAfterTimeOut_1.FbTelePortAfterTimeOut.Create(t)
      : void 0;
  }
}
exports.UnionTeammateTeleportConfigHelper = UnionTeammateTeleportConfigHelper;
//# sourceMappingURL=UnionTeammateTeleportConfigHelper.js.map
