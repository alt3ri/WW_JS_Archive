"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerTeamRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class BabelTowerTeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UITexture],
    ];
  }
  Refresh(e, r, t) {
    var s;
    0 === e
      ? this.GetTexture(2).SetUIActive(!1)
      : (this.GetTexture(2).SetUIActive(!0),
        (s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
        this.SetRoleIcon(s.RoleHeadIconCircle, this.GetTexture(2), e));
  }
}
exports.BabelTowerTeamRoleItem = BabelTowerTeamRoleItem;
//# sourceMappingURL=BabelTowerTeamRoleItem.js.map
