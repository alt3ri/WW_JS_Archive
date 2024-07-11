"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropMediumItemGrid = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class SelectablePropMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.SelectablePropData = void 0),
      (this.zBt = void 0),
      (this.ZBt = () => {
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
    this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.ZBt);
  }
  OnBeforeDestroy() {
    this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind(),
      (this.zBt = void 0);
  }
  OnRefresh(e, t, i) {
    (this.SelectablePropData = e),
      this.SetSelected(0 < e.SelectedCount, !0),
      this.zBt && this.zBt(this);
  }
  RefreshUi(e) {
    this.SelectablePropData = e;
    var t = ModelManager_1.ModelManager.InventoryModel,
      i = e.IncId,
      s = e.ItemId,
      r = e.ItemDataType,
      o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s);
    let n = void 0;
    if ((n = 0 < i ? t.GetAttributeItemData(i) : t.GetCommonItemData(s))) {
      var a = this.SelectablePropData.SelectedCount,
        h = this.SelectablePropData.Count,
        d = {
          Type: 4,
          Data: e,
          ItemConfigId: s,
          StarLevel: o.QualityId,
          ReduceButtonInfo: { IsVisible: 0 < a, LongPressConfigId: 1 },
        };
      switch (r) {
        case 0:
          (d.BuffIconType = o.ItemBuffType),
            (d.IsOmitBottomText = !1),
            0 < a
              ? ((d.BottomTextId = "Text_ItemEnoughText_Text"),
                (d.BottomTextParameter = [a, h]))
              : (d.BottomText = h.toString());
          break;
        case 2:
          var l =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(i),
            u = l.GetResonanceLevel();
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
          0 < a
            ? ((d.BottomTextId = "Text_ItemEnoughText_Text"),
              (d.BottomTextParameter = [a, h]))
            : (d.BottomText = h.toString());
      }
      this.Apply(d);
    }
  }
  RefreshCostCount() {
    if (this.SelectablePropData) {
      var e = this.SelectablePropData.ItemDataType,
        t = this.SelectablePropData.SelectedCount,
        i = this.SelectablePropData.Count;
      switch (e) {
        case 0:
          0 < t
            ? this.SetBottomTextId("Text_ItemEnoughText_Text", [t, i])
            : this.SetBottomText(this.SelectablePropData.Count.toString());
          break;
        case 2:
        case 3:
          break;
        default:
          0 < t
            ? this.SetBottomTextId("Text_ItemEnoughText_Text", [t, i])
            : this.SetBottomText(this.SelectablePropData.Count.toString());
      }
    }
  }
  BindAfterApply(e) {
    this.zBt = e;
  }
}
exports.SelectablePropMediumItemGrid = SelectablePropMediumItemGrid;
//# sourceMappingURL=SelectablePropMediumItemGrid.js.map
