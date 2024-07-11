"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonCostItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonCostItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.ETt = 0), (this.t6 = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  UpdateItem(e, t) {
    (this.ETt = e),
      (this.t6 = t),
      this.SetItemIcon(this.GetTexture(2), e),
      this.GetText(1).SetText(t.toString());
  }
  RefreshCountEnableState() {
    var e = this.GetText(1);
    e.SetChangeColor(!this.IsEnough, e.changeColor);
  }
  get IsEnough() {
    return (
      0 !== this.ETt &&
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        this.ETt,
      ) >= this.t6
    );
  }
}
exports.CommonCostItem = CommonCostItem;
//# sourceMappingURL=CommonCostItem.js.map
