"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerResetItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const TowerCostItem_1 = require("./TowerCostItem");
class TowerResetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(), (this.hDo = void 0), (this.lDo = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.hDo = new TowerCostItem_1.TowerCostItem()),
      this.hDo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.lDo = new TowerCostItem_1.TowerCostItem()),
      this.lDo.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  Refresh(e) {
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var r =
      (this.SetRoleIcon(r.RoleHeadIcon, this.GetTexture(0), e),
      ModelManager_1.ModelManager.TowerModel.GetFloorData(
        ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
      ));
    var e = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
      e,
      r.Difficulties,
    );
    this.hDo.Update(e), this.lDo.Update(e + r.Cost);
  }
}
exports.TowerResetItem = TowerResetItem;
// # sourceMappingURL=TowerResetItem.js.map
