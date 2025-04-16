"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class CostItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  RefreshCost(e) {
    var s;
    this.SetUiActive(!1),
      0 < e.length &&
        (this.SetUiActive(!0),
        (e = e[0]),
        (s = this.GetText(1)).SetText(e.Cost.toString()),
        this.SetItemIcon(this.GetTexture(2), e.ItemId),
        s.SetChangeColor(e.Cost > e.Count, s.changeColor));
  }
}
exports.CostItem = CostItem;
//# sourceMappingURL=CostItem.js.map
