"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SingleItemSelect = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSelectView_1 = require("../../Common/CommonItemSelectView"),
  MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
  SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  AttributeItemData_1 = require("../../Inventory/ItemData/AttributeItemData"),
  PhantomItemData_1 = require("../../Inventory/ItemData/PhantomItemData"),
  WeaponItemData_1 = require("../../Inventory/ItemData/WeaponItemData");
class SingleItemSelect {
  constructor() {
    (this.HOo = void 0),
      (this.ebt = void 0),
      (this.LNt = void 0),
      (this.jOo = void 0),
      (this.WOo =
        new CommonItemSelectView_1.CommonItemSelectViewOpenViewData()),
      (this.KOo = new SelectableComponent_1.SelectableComponentData()),
      (this.QOo = 0),
      (this.Z6i = 0),
      (this.XOo = !1),
      (this.OpenItemSelectView = () => {
        var t = [];
        this.HOo && t.push(this.HOo),
          (this.WOo.ItemDataBaseList = this.LNt()),
          (this.WOo.SelectedDataList = t),
          (this.WOo.UseWayId = this.Z6i),
          (this.WOo.InitSortToggleState = this.XOo),
          0 === this.QOo
            ? UiManager_1.UiManager.OpenView(
                "CommonItemSelectViewRight",
                this.WOo,
              )
            : UiManager_1.UiManager.OpenView(
                "CommonItemSelectViewLeft",
                this.WOo,
              );
      }),
      (this.$Oo = (t, e) => {
        0 < t?.length ? (this.HOo = t[0]) : (this.HOo = void 0), this.YOo();
      }),
      (this.JOo = (t, e, i, s) =>
        !(this.HOo && e === this.HOo.IncId && i === this.HOo.ItemId && 0 < s));
  }
  Init(t, e = 0) {
    (this.ebt = new MediumItemGrid_1.MediumItemGrid()),
      this.ebt.Initialize(t.GetOwner());
    this.ebt.Apply({ Type: 1 }),
      (this.QOo = e),
      this.ebt.BindEmptySlotButtonCallback(this.OpenItemSelectView),
      this.ebt.BindReduceButtonCallback(this.OpenItemSelectView),
      this.ebt.BindOnExtendToggleRelease(this.OpenItemSelectView),
      this.ebt.BindOnCanExecuteChange(() => !1),
      this.ebt.SetReduceButton(void 0),
      (this.KOo.IsSingleSelected = !0),
      (this.KOo.OnChangeSelectedFunction = this.$Oo),
      (this.KOo.CheckIfCanAddFunction = this.JOo),
      (this.WOo.SelectableComponentData = this.KOo);
  }
  SetUseWayId(t) {
    this.Z6i = t;
  }
  SetInitSortToggleState(t) {
    this.XOo = t;
  }
  YOo() {
    if (void 0 === this.HOo)
      this.ebt.SetSelected(!1), this.ebt.Apply({ Type: 1 });
    else {
      var e = this.HOo.IncId,
        i = this.HOo.ItemId,
        s = ModelManager_1.ModelManager.InventoryModel;
      let t = s.GetAttributeItemData(e);
      var a,
        h,
        s = {
          Type: 4,
          ItemConfigId: i,
          StarLevel: (t = t || s.GetCommonItemData(i)).GetQuality(),
        };
      t instanceof AttributeItemData_1.AttributeItemData
        ? ((s.BottomTextId = "Text_LevelShow_Text"),
          t instanceof PhantomItemData_1.PhantomItemData &&
            ((i =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                i,
              )),
            (a = (h =
              ModelManager_1.ModelManager
                .PhantomBattleModel).GetPhantomBattleData(e)),
            (h = h.GetPhantomBattleData(e).GetPhantomLevel()),
            (s.BottomTextParameter = [h]),
            (s.BottomTextId = i.Name),
            (s.StarLevel = i.QualityId),
            (s.Level = a.GetCost()),
            (s.IsLevelTextUseChangeColor = !0)),
          t instanceof WeaponItemData_1.WeaponItemData &&
            ((i = (h =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                e,
              )).GetLevel()),
            (s.Level = h.GetResonanceLevel()),
            (s.BottomTextParameter = [i])))
        : (s.BottomText = this.HOo.SelectedCount.toString()),
        this.ebt.Apply(s),
        this.ebt.SetSelected(!0);
    }
    this.jOo(this.HOo);
  }
  ClearSelectData() {
    (this.HOo = void 0), this.YOo();
  }
  SetItemSelectChangeCallBack(t) {
    this.jOo = t;
  }
  SetGetItemListFunction(t) {
    this.LNt = t;
  }
  GetCurrentSelectedData() {
    return this.HOo;
  }
}
exports.SingleItemSelect = SingleItemSelect;
//# sourceMappingURL=SingleItemSelect.js.map
