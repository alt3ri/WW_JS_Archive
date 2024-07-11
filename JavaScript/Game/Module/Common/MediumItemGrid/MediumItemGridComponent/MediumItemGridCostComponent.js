"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridCostComponent = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TowerData_1 = require("../../../TowerDetailUi/TowerData"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCostComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments), (this.Mwt = void 0), (this.Ewt = void 0);
  }
  GetResourceId() {
    return "UiItem_ItemEnergy";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  OnActivate() {
    (this.Mwt = UE.Color.FromHex(TowerData_1.HIGH_COLOR)),
      (this.Ewt = UE.Color.FromHex(TowerData_1.LOW_COLOR));
  }
  OnRefresh(e) {
    var e = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
        e,
        ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
      ),
      t = this.GetText(0),
      e = (t.SetText("" + e), e >= TowerData_1.HIGH_COST);
    t.SetColor(e ? this.Mwt : this.Ewt),
      this.GetItem(1).SetColor(e ? this.Mwt : this.Ewt),
      this.SetActive(!0);
  }
}
exports.MediumItemGridCostComponent = MediumItemGridCostComponent;
//# sourceMappingURL=MediumItemGridCostComponent.js.map
