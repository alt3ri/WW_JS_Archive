"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QteCooperationHandler = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController");
class QteCooperationHandler {
  Trigger(e, r) {
    if (!r.IsMyRole())
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 48, "上场角色为其他玩家的角色", [
            "CreatureDataId",
            r.GetCreatureDataId(),
          ]),
        SceneTeamController_1.SceneTeamController.TryUseMultiQte(
          r.EntityHandle,
        ),
        !0
      );
    var e = e.EntityHandle,
      r = r.EntityHandle,
      o = e.Entity.GetComponent(96),
      t = r.Entity.GetComponent(96),
      n = e.Entity.GetComponent(203);
    if (!o || !t) return !1;
    var a = t.GetQteTagData();
    if (!a) return !1;
    let l = !1;
    return (
      !n.HasAnyTag([504239013, 855966206]) &&
        t.IsQteReady(e) &&
        (o.UseExitSkill(r), (l = t.ExecuteQte(e))),
      !(l ? a.ChangeRoleOnQte : a.ChangeRole)
    );
  }
  Clear() {}
}
exports.QteCooperationHandler = QteCooperationHandler;
//# sourceMappingURL=QteCooperationHandler.js.map
