"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamCooperationHandler = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController"),
  SceneTeamDefine_1 = require("../../../SceneTeam/SceneTeamDefine"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
class SceneTeamCooperationHandler {
  Trigger(e, r) {
    var o = r.EntityHandle,
      n = o.Entity.GetComponent(96).IsInQte,
      o = o.Entity.CheckGetComponent(91).IsChangeRoleCoolDown();
    if (!n) {
      if (o)
        return (
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "EditBattleTeamInCD",
          ),
          !1
        );
      n = e.EntityHandle.Entity.GetComponent(203);
      if (n.HasTag(-2044964178) && n.HasAnyTag(SceneTeamDefine_1.beHitTagList))
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 48, "被击硬直时间无法换人", [
              "roleId",
              e.GetConfigId,
            ]),
          !1
        );
    }
    return (
      SceneTeamController_1.SceneTeamController.RequestChangeRole(
        r.GetCreatureDataId(),
        {
          FilterSameRole: !0,
          GoDownWaitSkillEnd: !0,
          ForceInheritTransform: !1,
        },
      ),
      !0
    );
  }
  Clear() {}
}
exports.SceneTeamCooperationHandler = SceneTeamCooperationHandler;
//# sourceMappingURL=SceneTeamCooperationHandler.js.map
