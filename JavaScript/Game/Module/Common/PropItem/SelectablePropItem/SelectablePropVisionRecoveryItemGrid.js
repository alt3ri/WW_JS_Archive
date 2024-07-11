"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropVisionRecoveryItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SelectablePropMediumItemGrid_1 = require("./SelectablePropMediumItemGrid");
class SelectablePropVisionRecoveryItemGrid extends SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid {
  RefreshUi(e) {
    this.SelectablePropData = e;
    let r;
    let i = ModelManager_1.ModelManager.InventoryModel;
    const t = e.IncId;
    let o = e.ItemId;
    const a = e.ItemDataType;
    let n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(o);
    let s = void 0;
    (s = t > 0 ? i.GetAttributeItemData(t) : i.GetCommonItemData(o)) &&
      ((i = this.SelectablePropData.SelectedCount),
      (r = this.SelectablePropData.Count),
      (e = {
        Type: 4,
        Data: e,
        ItemConfigId: o,
        StarLevel: n.QualityId,
        ReduceButtonInfo: { IsVisible: i > 0, LongPressConfigId: 1 },
      }),
      a === 3
        ? ((n = (o =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              t,
            )).GetPhantomLevel()),
          (e.Level = o.GetCost()),
          (e.IsLevelTextUseChangeColor = !0),
          (e.BottomTextId = "VisionLevel"),
          (e.IsDisable = n > 1),
          (e.BottomTextParameter = [o.GetPhantomLevel()]),
          (e.VisionFetterGroupId = o.GetFetterGroupId()),
          (e.IsOmitBottomText = !0))
        : i > 0
          ? ((e.BottomTextId = "Text_ItemEnoughText_Text"),
            (e.BottomTextParameter = [i, r]))
          : (e.BottomText = r.toString()),
      this.Apply(e));
  }
}
exports.SelectablePropVisionRecoveryItemGrid =
  SelectablePropVisionRecoveryItemGrid;
// # sourceMappingURL=SelectablePropVisionRecoveryItemGrid.js.map
