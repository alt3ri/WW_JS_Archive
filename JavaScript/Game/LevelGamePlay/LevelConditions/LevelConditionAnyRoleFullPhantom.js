"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionAnyRoleFullPhantom = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAnyRoleFullPhantom extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams) return !1;
    e = e.LimitParams.get("CheckValue");
    if (!e) return !1;
    var n = "TRUE" === e;
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0))
      if (
        !ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          a.GetConfigId,
        )?.CheckHasEmpty()
      )
        return n;
    return !n;
  }
}
exports.LevelConditionAnyRoleFullPhantom = LevelConditionAnyRoleFullPhantom;
//# sourceMappingURL=LevelConditionAnyRoleFullPhantom.js.map
