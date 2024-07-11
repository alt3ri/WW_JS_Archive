"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteAssemblyGridItem = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RouletteAssemblyGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnRefresh(e, t, r) {
    var s = {
        Type: 4,
        QualityType: "MediumItemGridQualitySpritePath",
        Data: e,
        IsOmitBottomText: !1,
      },
      i =
        (2 === e.GridType ? (s.QualityId = e.QualityId) : (s.QualityId = 1),
        0 !== e.RelativeIndex);
    switch ((i && (s.SortIndex = e.RelativeIndex), e.GridType)) {
      case 0:
        var o = e;
        (s.SpriteIconPath = o.IconPath),
          (s.BottomTextId = o.Name),
          (s.IsNewVisible = o.HasRedDot);
        break;
      case 1:
        o = e;
        o.IconPath.includes("Atlas")
          ? (s.SpriteIconPath = o.IconPath)
          : (s.IconPath = o.IconPath),
          (s.BottomTextId = e.Name);
        break;
      case 2:
        var o = e,
          o =
            ((s.ItemConfigId = o.Id),
            (s.BottomText = o.ItemNum.toString()),
            ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e.Id));
        o && ((o = o.GetConfig()), (s.BuffIconType = o.ItemBuffType));
    }
    this.Apply(s), (this.Data.Index = r), this.SetSelected(t);
  }
  RefreshRedDot() {
    var e;
    0 === this.Data.GridType &&
      ((e = this.Data), this.SetNewVisible(e.HasRedDot));
  }
  OnSelected(e) {
    this.GetItemGridExtendToggle().SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.GetItemGridExtendToggle().SetToggleState(0, e);
  }
}
exports.RouletteAssemblyGridItem = RouletteAssemblyGridItem;
//# sourceMappingURL=RouletteAssemblyGridItem.js.map
