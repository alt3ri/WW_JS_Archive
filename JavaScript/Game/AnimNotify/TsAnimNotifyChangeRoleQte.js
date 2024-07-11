"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  ModelManager_1 = require("../Manager/ModelManager"),
  PanelQteController_1 = require("../Module/PanelQte/PanelQteController"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyChangeRoleQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.QteId = 0), (this.QteDistance = 0);
  }
  K2_Notify(r, e) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
      if (0 !== t?.CanGoDown(!0))
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("PanelQte", 18, "当前角色不能下场，不触发换人QTE");
      else {
        if (0 < this.QteDistance) {
          var a = r.GetOwner()?.K2_GetActorLocation(),
            o = t?.EntityHandle?.Entity?.GetComponent(3).ActorLocationProxy;
          if (!a || !o)
            return (
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("PanelQte", 18, "读取不到坐标，不触发换人QTE"),
              !0
            );
          if (
            Math.pow(a.X - o.X, 2) +
              Math.pow(a.Y - o.Y, 2) +
              Math.pow(a.Z - o.Z, 2) >
            this.QteDistance * this.QteDistance
          )
            return (
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("PanelQte", 18, "距离太远，不触发换人QTE"),
              !0
            );
        }
        let e = void 0;
        a = r.GetOwner();
        a instanceof TsBaseCharacter_1.default &&
          ((o = a?.CharacterActorComponent?.Entity),
          (e = o?.GetComponent(187).CreateAnimNotifyContent()));
        for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
          if (
            n.GetCreatureDataId() !== t.GetCreatureDataId() &&
            0 === n.CanGoBattle()
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
          Log_1.Log.Debug("PanelQte", 18, "没有后台角色能上场，不触发换人QTE");
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
