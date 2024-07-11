"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropMediumItemGrid = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class SelectablePropMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.SelectablePropData = void 0),
      (this.$wt = void 0),
      (this.Ywt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSelectItemAdd,
          this.SelectablePropData.ItemId,
          this.SelectablePropData.IncId,
        );
      });
  }
  OnSelected(e) {
    e &&
      ((e = { IsVisible: !0, LongPressConfigId: 1 }),
      this.SetSelected(!0, !0),
      this.SetReduceButton(e));
  }
  OnDeselected(e) {
    this.SetSelected(!1, !0);
  }
  SetSelected(e, t = !1) {
    this.RefreshUi(this.SelectablePropData), super.SetSelected(e, t);
  }
  OnStart() {
    this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.Ywt);
  }
  OnBeforeDestroy() {
    this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind(),
      (this.$wt = void 0);
  }
  OnRefresh(e, t, i) {
    (this.SelectablePropData = e),
      this.SetSelected(e.SelectedCount > 0, !0),
      this.$wt && this.$wt(this);
  }
  RefreshUi(e) {
    this.SelectablePropData = e;
    const t = ModelManager_1.ModelManager.InventoryModel;
    const i = e.IncId;
    const s = e.ItemId;
    const r = e.ItemDataType;
    const o =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s);
    let n = void 0;
    if ((n = i > 0 ? t.GetAttributeItemData(i) : t.GetCommonItemData(s))) {
      const a = this.SelectablePropData.SelectedCount;
      const h = this.SelectablePropData.Count;
      const d = {
        Type: 4,
        Data: e,
        ItemConfigId: s,
        StarLevel: o.QualityId,
        ReduceButtonInfo: { IsVisible: a > 0, LongPressConfigId: 1 },
      };
      switch (r) {
        case 0:
          (d.BuffIconType = o.ItemBuffType),
            (d.IsOmitBottomText = !1),
            a > 0
              ? ((d.BottomTextId = "Text_ItemEnoughText_Text"),
                (d.BottomTextParameter = [a, h]))
              : (d.BottomText = h.toString());
          break;
        case 2:
          var l =
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(i);
          var u = l.GetResonanceLevel();
          (d.Level = u),
            (d.BottomTextId = "Text_LevelShow_Text"),
            (d.BottomTextParameter = [l.GetLevel()]);
          break;
        case 3:
          u =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              i,
            );
          (d.Level = u.GetCost()),
            (d.IsLevelTextUseChangeColor = !0),
            (d.BottomTextId = "VisionLevel"),
            (d.BottomTextParameter = [u.GetPhantomLevel()]),
            (d.VisionFetterGroupId = u.GetFetterGroupId()),
            (d.IsOmitBottomText = !0);
          break;
        default:
          a > 0
            ? ((d.BottomTextId = "Text_ItemEnoughText_Text"),
              (d.BottomTextParameter = [a, h]))
            : (d.BottomText = h.toString());
      }
      this.Apply(d);
    }
  }
  RefreshCostCount() {
    if (this.SelectablePropData) {
      const e = this.SelectablePropData.ItemDataType;
      const t = this.SelectablePropData.SelectedCount;
      const i = this.SelectablePropData.Count;
      switch (e) {
        case 0:
          t > 0
            ? this.SetBottomTextId("Text_ItemEnoughText_Text", [t, i])
            : this.SetBottomText(this.SelectablePropData.Count.toString());
          break;
        case 2:
        case 3:
          break;
        default:
          t > 0
            ? this.SetBottomTextId("Text_ItemEnoughText_Text", [t, i])
            : this.SetBottomText(this.SelectablePropData.Count.toString());
      }
    }
  }
  BindAfterApply(e) {
    this.$wt = e;
  }
}
exports.SelectablePropMediumItemGrid = SelectablePropMediumItemGrid;
// # sourceMappingURL=SelectablePropMediumItemGrid.js.map
