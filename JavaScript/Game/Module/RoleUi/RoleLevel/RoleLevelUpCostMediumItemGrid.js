"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelUpCostMediumItemGrid = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RoleLevelUpCostMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, t, i) {
    var o = e.SelectedCount,
      r = e.Count,
      r = 0 === e.Count ? StringUtils_1.ZERO_STRING : o + "/" + r,
      e = {
        Type: 4,
        Data: e,
        ItemConfigId: e.ItemId,
        ReduceButtonInfo: { IsVisible: 0 < o, LongPressConfigId: 1 },
        BottomText: r,
      };
    this.Apply(e);
  }
  GetUiItemForGuide() {
    return this.GetItemGridExtendToggle()
      ?.GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.RoleLevelUpCostMediumItemGrid = RoleLevelUpCostMediumItemGrid;
//# sourceMappingURL=RoleLevelUpCostMediumItemGrid.js.map
