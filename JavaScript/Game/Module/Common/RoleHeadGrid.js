"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleHeadGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleHeadGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.dFe = 0), this.CreateThenShowByActor(e);
  }
  get Lo() {
    return this.dFe
      ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe)
      : void 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  fbt() {
    var e,
      i = this.Lo;
    i &&
      (e = this.GetTexture(0)) &&
      "" !== (i = i.RoleHeadIconBig) &&
      this.SetRoleIcon(i, e, this.dFe);
  }
  Refresh(e) {
    (this.dFe = e), this.fbt();
  }
}
exports.RoleHeadGrid = RoleHeadGrid;
//# sourceMappingURL=RoleHeadGrid.js.map
