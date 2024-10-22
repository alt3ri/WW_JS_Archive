"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerResetItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  TowerCostItem_1 = require("./TowerCostItem");
class TowerResetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(), (this.nRo = void 0), (this.sRo = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.nRo = new TowerCostItem_1.TowerCostItem()),
      this.nRo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.sRo = new TowerCostItem_1.TowerCostItem()),
      this.sRo.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  Refresh(e) {
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
      r =
        (this.SetRoleIcon(r.RoleHeadIcon, this.GetTexture(0), e),
        ModelManager_1.ModelManager.TowerModel.GetFloorData(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        )),
      e = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
        e,
        r.Difficulties,
      );
    this.nRo.Update(e), this.sRo.Update(e + r.Cost);
  }
}
exports.TowerResetItem = TowerResetItem;
//# sourceMappingURL=TowerResetItem.js.map
