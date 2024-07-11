"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRoleSimpleItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TowerRoleSimpleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    let s;
    e
      ? (this.GetTexture(0).SetUIActive(!0),
        (s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
        this.SetRoleIcon(s.RoleHeadIcon, this.GetTexture(0), e))
      : this.GetTexture(0).SetUIActive(!1);
  }
}
exports.TowerRoleSimpleItem = TowerRoleSimpleItem;
// # sourceMappingURL=TowerRoleSimpleItem.js.map
