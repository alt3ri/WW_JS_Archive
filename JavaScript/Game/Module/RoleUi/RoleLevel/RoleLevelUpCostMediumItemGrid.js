"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelUpCostMediumItemGrid = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RoleLevelUpCostMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, t, i) {
    const o = e.SelectedCount;
    var r = e.Count;
    var r = e.Count === 0 ? StringUtils_1.ZERO_STRING : o + "/" + r;
    var e = {
      Type: 4,
      Data: e,
      ItemConfigId: e.ItemId,
      ReduceButtonInfo: { IsVisible: o > 0, LongPressConfigId: 1 },
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
// # sourceMappingURL=RoleLevelUpCostMediumItemGrid.js.map
