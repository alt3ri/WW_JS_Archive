"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  PanelQteController_1 = require("../Module/PanelQte/PanelQteController");
class TsAnimNotifyJoinTeamQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.QteId = 0), (this.PreloadRoleIdList = void 0);
  }
  Constructor() {}
  K2_Notify(e, r) {
    if (
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      this.PreloadRoleIdList
    ) {
      var t = e.GetOwner();
      if (t instanceof TsBaseCharacter_1.default) {
        t = t.CharacterActorComponent?.Entity;
        if (t) {
          (t = t
            .GetComponent(207)
            .CreateAnimNotifyContent(r.GetName(), this.exportIndex)),
            (r = PanelQteController_1.PanelQteController.StartAnimNotifyQte(
              this.QteId,
              e,
              t,
            ));
          if (!(r <= 0)) {
            var o = [];
            for (let e = 0; e < this.PreloadRoleIdList.Num(); e++)
              o.push(this.PreloadRoleIdList.Get(e));
            ControllerHolder_1.ControllerHolder.SceneTeamController.RegisterPanelQteJoinTeam(
              r,
              o,
            );
          }
        }
      }
    }
    return !0;
  }
  GetNotifyName() {
    return "角色入队QTE";
  }
}
exports.default = TsAnimNotifyJoinTeamQte;
//# sourceMappingURL=TsAnimNotifyJoinTeamQte.js.map
