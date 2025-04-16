"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTeamEditSlot = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleTeamEditSlot extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.ConfigId = 0),
      (this.Index = 0),
      (this.ElementItem = void 0),
      (this.OnClickCallBack = void 0),
      (this.rV_ = () => {
        this.OnClickCallBack?.(this.Index);
      }),
      (this.Index = e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.rV_]]);
  }
  async OnBeforeStartAsync() {
    return (
      (this.ElementItem =
        new RogueBattleTokenElement_1.RogueBattleTokenElement()),
      this.ElementItem.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())
    );
  }
  UpdateRoleInfo(e) {
    if (
      ((this.ConfigId = e),
      this.GetText(6).SetText((this.Index + 1).toString()),
      0 === e)
    )
      this.GetItem(1)?.SetUIActive(!1);
    else {
      this.GetItem(1)?.SetUIActive(!0);
      var t = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e),
        i = t.GetRoleConfig(),
        t = t?.GetRoleSkinId(),
        s = t
          ? ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t)
          : void 0;
      if (i) {
        const o = this.GetTexture(2);
        s
          ? this.SetRoleSkinIcon(s.FormationRoleCard, o, t, void 0, () => {
              o.SetAlpha(1);
            })
          : this.SetRoleIcon(i.FormationRoleCard, o, e, void 0, () => {
              o.SetAlpha(1);
            }),
          this.ElementItem?.Refresh(i.ElementId, !1, 0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Name),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "RogueRes_FightFormation_RoleLevel",
            ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel(),
          );
      }
    }
  }
}
exports.RogueBattleTeamEditSlot = RogueBattleTeamEditSlot;
//# sourceMappingURL=RogueBattleTeamEditSlot.js.map
