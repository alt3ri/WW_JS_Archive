"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  PanelQteController_1 = require("../Module/PanelQte/PanelQteController");
class TsAnimNotifyChangeRoleQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.QteId = 0), (this.QteDistance = 0);
  }
  Constructor() {}
  K2_Notify(r, t) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
      if (o?.EntityHandle?.Entity?.GetComponent(203)?.HasTag(-1697149502))
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("PanelQte", 17, "当前角色不能下场，不触发换人QTE");
      else {
        if (0 < this.QteDistance) {
          var a = r.GetOwner()?.D_K2_GetActorLocation(),
            n = o?.EntityHandle?.Entity?.GetComponent(3).ActorLocationProxy;
          if (!a || !n)
            return (
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("PanelQte", 17, "读取不到坐标，不触发换人QTE"),
              !0
            );
          if (
            Math.pow(a.X - n.X, 2) +
              Math.pow(a.Y - n.Y, 2) +
              Math.pow(a.Z - n.Z, 2) >
            this.QteDistance * this.QteDistance
          )
            return (
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("PanelQte", 17, "距离太远，不触发换人QTE"),
              !0
            );
        }
        let e = void 0;
        a = r.GetOwner();
        a instanceof TsBaseCharacter_1.default &&
          ((n = a?.CharacterActorComponent?.Entity),
          (e = n
            ?.GetComponent(207)
            .CreateAnimNotifyContent(t.GetName(), this.exportIndex)));
        for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
          if (
            s.GetCreatureDataId() !== o?.GetCreatureDataId() &&
            0 === s.CanGoBattle()
          )
            return (
              PanelQteController_1.PanelQteController.StartAnimNotifyQte(
                this.QteId,
                r,
                e,
              ),
              !0
            );
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("PanelQte", 17, "没有后台角色能上场，不触发换人QTE");
      }
    }
    return !0;
  }
  GetNotifyName() {
    return "换人QTE";
  }
}
exports.default = TsAnimNotifyChangeRoleQte;
//# sourceMappingURL=TsAnimNotifyChangeRoleQte.js.map
