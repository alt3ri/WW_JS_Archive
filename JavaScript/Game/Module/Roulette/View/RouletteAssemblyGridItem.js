"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteAssemblyGridItem = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RouletteAssemblyGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnRefresh(e, t, r) {
    const s = {
      Type: 4,
      QualityType: "MediumItemGridQualitySpritePath",
      Data: e,
      IsOmitBottomText: !1,
    };
    const i =
      (e.GridType === 2 ? (s.QualityId = e.QualityId) : (s.QualityId = 1),
      e.RelativeIndex !== 0);
    switch ((i && (s.SortIndex = e.RelativeIndex), e.GridType)) {
      case 0:
        var o = e;
        (s.SpriteIconPath = o.IconPath), (s.BottomTextId = o.Name);
        break;
      case 1:
        o = e;
        o.IconPath.includes("Atlas")
          ? (s.SpriteIconPath = o.IconPath)
          : (s.IconPath = o.IconPath),
          (s.BottomTextId = e.Name);
        break;
      case 2:
        var o = e;
        var o =
          ((s.ItemConfigId = o.Id),
          (s.BottomText = o.ItemNum.toString()),
          ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e.Id));
        o && ((o = o.GetConfig()), (s.BuffIconType = o.ItemBuffType));
    }
    this.Apply(s), (this.Data.Index = r), this.SetSelected(t);
  }
  OnSelected(e) {
    this.GetItemGridExtendToggle().SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.GetItemGridExtendToggle().SetToggleState(0, e);
  }
}
exports.RouletteAssemblyGridItem = RouletteAssemblyGridItem;
// # sourceMappingURL=RouletteAssemblyGridItem.js.map
