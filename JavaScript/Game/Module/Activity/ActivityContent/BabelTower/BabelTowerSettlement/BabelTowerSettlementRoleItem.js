"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerSettlementRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class BabelTowerSettlementRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.SetTextureByPath(e.Card, this.GetTexture(0));
  }
}
exports.BabelTowerSettlementRoleItem = BabelTowerSettlementRoleItem;
//# sourceMappingURL=BabelTowerSettlementRoleItem.js.map
