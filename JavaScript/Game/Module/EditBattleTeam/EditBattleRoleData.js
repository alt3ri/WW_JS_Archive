"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditBattleRoleData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
class EditBattleRoleData {
  constructor() {
    (this.ConfigId = 0),
      (this.OnlineIndex = void 0),
      (this.PlayerName = void 0),
      (this.Level = 0),
      (this.IsSelf = !1),
      (this.IsReady = !1),
      (this.PlayerId = 0);
  }
  Init(t, e, i, s, o, a, h) {
    (this.PlayerId = t),
      (this.ConfigId = e),
      (this.OnlineIndex = i),
      (this.PlayerName = s),
      (this.Level = o),
      (this.IsSelf = a),
      (this.IsReady = h);
  }
  SetReady(t) {
    this.IsReady = t;
  }
  get GetTrialRoleConfig() {
    if (this.ConfigId > RoleDefine_1.ROBOT_DATA_MIN_ID) {
      let t =
        ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
          this.ConfigId,
        );
      return (t =
        t ||
        ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(
          this.ConfigId,
        ));
    }
  }
}
exports.EditBattleRoleData = EditBattleRoleData;
// # sourceMappingURL=EditBattleRoleData.js.map
