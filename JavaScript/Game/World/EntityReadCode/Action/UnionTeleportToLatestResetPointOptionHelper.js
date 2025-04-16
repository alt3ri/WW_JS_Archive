"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTeleportToLatestResetPointOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTeleportToLatestResetPointDirectly_1 = require("./FbTeleportToLatestResetPointDirectly");
class UnionTeleportToLatestResetPointOptionHelper {
  static GetUnionTeleportToLatestResetPointOptionObject(t) {
    if (
      t ===
      fb_action_1.UnionTeleportToLatestResetPointOption
        .TeleportToLatestResetPointDirectly
    )
      return new fb_action_1.TeleportToLatestResetPointDirectly();
  }
  static ReadUnionTeleportToLatestResetPointOption(t, e) {
    return void 0 !== e &&
      t ===
        fb_action_1.UnionTeleportToLatestResetPointOption
          .TeleportToLatestResetPointDirectly
      ? FbTeleportToLatestResetPointDirectly_1.FbTeleportToLatestResetPointDirectly.Create(
          e,
        )
      : void 0;
  }
}
exports.UnionTeleportToLatestResetPointOptionHelper =
  UnionTeleportToLatestResetPointOptionHelper;
//# sourceMappingURL=UnionTeleportToLatestResetPointOptionHelper.js.map
