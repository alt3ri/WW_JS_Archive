"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SingleItemSelect = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSelectView_1 = require("../../Common/CommonItemSelectView");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent");
const AttributeItemData_1 = require("../../Inventory/ItemData/AttributeItemData");
const PhantomItemData_1 = require("../../Inventory/ItemData/PhantomItemData");
const WeaponItemData_1 = require("../../Inventory/ItemData/WeaponItemData");
class SingleItemSelect {
  constructor() {
    (this.KNo = void 0),
      (this.Jwt = void 0),
      (this.TGt = void 0),
      (this.QNo = void 0),
      (this.XNo =
        new CommonItemSelectView_1.CommonItemSelectViewOpenViewData()),
      (this.$No = new SelectableComponent_1.SelectableComponentData()),
      (this.YNo = 0),
      (this.e6i = 0),
      (this.JNo = !1),
      (this.OpenItemSelectView = () => {
        const t = [];
        this.KNo && t.push(this.KNo),
          (this.XNo.ItemDataBaseList = this.TGt()),
          (this.XNo.SelectedDataList = t),
          (this.XNo.UseWayId = this.e6i),
          (this.XNo.InitSortToggleState = this.JNo),
          this.YNo === 0
            ? UiManager_1.UiManager.OpenView(
                "CommonItemSelectViewRight",
                this.XNo,
              )
            : UiManager_1.UiManager.OpenView(
                "CommonItemSelectViewLeft",
                this.XNo,
              );
      }),
      (this.zNo = (t, e) => {
        t?.length > 0 ? (this.KNo = t[0]) : (this.KNo = void 0), this.ZNo();
      }),
      (this.eOo = (t, e, i, a) =>
        !(this.KNo && e === this.KNo.IncId && i === this.KNo.ItemId && a > 0));
  }
  Init(t, e = 0) {
    (this.Jwt = new MediumItemGrid_1.MediumItemGrid()),
      this.Jwt.Initialize(t.GetOwner());
    this.Jwt.Apply({ Type: 1 }),
      (this.YNo = e),
      this.Jwt.BindEmptySlotButtonCallback(this.OpenItemSelectView),
      this.Jwt.BindReduceButtonCallback(this.OpenItemSelectView),
      this.Jwt.BindOnExtendToggleStateChanged(this.OpenItemSelectView),
      this.Jwt.SetReduceButton(void 0),
      (this.$No.IsSingleSelected = !0),
      (this.$No.OnChangeSelectedFunction = this.zNo),
      (this.$No.CheckIfCanAddFunction = this.eOo),
      (this.XNo.SelectableComponentData = this.$No);
  }
  SetUseWayId(t) {
    this.e6i = t;
  }
  SetInitSortToggleState(t) {
    this.JNo = t;
  }
  ZNo() {
    if (void 0 === this.KNo)
      this.Jwt.SetSelected(!1), this.Jwt.Apply({ Type: 1 });
    else {
      const e = this.KNo.IncId;
      let i = this.KNo.ItemId;
      var a = ModelManager_1.ModelManager.InventoryModel;
      let t = a.GetAttributeItemData(e);
      let s;
      let h;
      var a = {
        Type: 4,
        ItemConfigId: i,
        StarLevel: (t = t || a.GetCommonItemData(i)).GetQuality(),
      };
      t instanceof AttributeItemData_1.AttributeItemData
        ? ((a.BottomTextId = "Text_LevelShow_Text"),
          t instanceof PhantomItemData_1.PhantomItemData &&
            ((i =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                i,
              )),
            (s = (h =
              ModelManager_1.ModelManager
                .PhantomBattleModel).GetPhantomBattleData(e)),
            (h = h.GetPhantomBattleData(e).GetPhantomLevel()),
            (a.BottomTextParameter = [h]),
            (a.BottomTextId = i.Name),
            (a.StarLevel = i.QualityId),
            (a.Level = s.GetCost()),
            (a.IsLevelTextUseChangeColor = !0)),
          t instanceof WeaponItemData_1.WeaponItemData &&
            ((i = (h =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                e,
              )).GetLevel()),
            (a.Level = h.GetResonanceLevel()),
            (a.BottomTextParameter = [i])))
        : (a.BottomText = this.KNo.SelectedCount.toString()),
        this.Jwt.Apply(a),
        this.Jwt.SetSelected(!0);
    }
    this.QNo(this.KNo);
  }
  ClearSelectData() {
    (this.KNo = void 0), this.ZNo();
  }
  SetItemSelectChangeCallBack(t) {
    this.QNo = t;
  }
  SetGetItemListFunction(t) {
    this.TGt = t;
  }
  GetCurrentSelectedData() {
    return this.KNo;
  }
}
exports.SingleItemSelect = SingleItemSelect;
// # sourceMappingURL=SingleItemSelect.js.map
