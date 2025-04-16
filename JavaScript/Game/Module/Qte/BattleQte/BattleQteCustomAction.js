"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.battleQteChangeRole = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CooperationController_1 = require("../../Battle/Cooperation/CooperationController");
function battleQteChangeRole(r) {
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
  if (!e?.EntityHandle?.Entity?.GetComponent(203)?.HasTag(-1697149502)) {
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(),
      n = a.length,
      t = a.indexOf(e);
    for (let o = 1; o < n; o++) {
      let e = t + o;
      e >= n && (e -= n);
      var i = a[e];
      if (r)
        if (
          ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(
            i.GetConfigId,
          ) !== r
        )
          continue;
      if (0 === i?.CanGoBattle())
        return void CooperationController_1.CooperationController.TryCooperate(
          i.GetCreatureDataId(),
        );
    }
  }
}
exports.battleQteChangeRole = battleQteChangeRole;
//# sourceMappingURL=BattleQteCustomAction.js.map
