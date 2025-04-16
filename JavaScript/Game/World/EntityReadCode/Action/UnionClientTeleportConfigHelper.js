"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionClientTeleportConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbClientTpRelativeEntityPos_1 = require("./FbClientTpRelativeEntityPos");
class UnionClientTeleportConfigHelper {
  static GetUnionClientTeleportConfigObject(e) {
    if (e === fb_action_1.UnionClientTeleportConfig.ClientTpRelativeEntityPos)
      return new fb_action_1.ClientTpRelativeEntityPos();
  }
  static ReadUnionClientTeleportConfig(e, t) {
    return void 0 !== t &&
      e === fb_action_1.UnionClientTeleportConfig.ClientTpRelativeEntityPos
      ? FbClientTpRelativeEntityPos_1.FbClientTpRelativeEntityPos.Create(t)
      : void 0;
  }
}
exports.UnionClientTeleportConfigHelper = UnionClientTeleportConfigHelper;
//# sourceMappingURL=UnionClientTeleportConfigHelper.js.map
