"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamPlayerSelectionComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class TeamPlayerSelectionComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.dFe = void 0),
      (this.$bt = void 0),
      (this.IsSet = !1),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
    ];
  }
  OnBeforeDestroy() {
    (this.dFe = void 0), (this.$bt = void 0), (this.IsSet = !1);
  }
  SetRoleId(e) {
    this.dFe = e;
  }
  SetTeamNumber(e) {
    this.$bt = e;
  }
  RefreshItem() {
    var e = this.GetTexture(0),
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.dFe,
      ).RoleHeadIconBig,
      i = (this.SetTextureByPath(i, e), this.GetSprite(1)),
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        `SP_Online${this.$bt}PIcon`,
      );
    this.SetSpriteByPath(e, i, !1), (this.IsSet = !0);
  }
}
exports.TeamPlayerSelectionComponent = TeamPlayerSelectionComponent;
//# sourceMappingURL=TeamPlayerSelectionComponent.js.map
