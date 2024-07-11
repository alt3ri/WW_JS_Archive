"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostItemGridComponent = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  CostMediumItemGrid_1 = require("./CostMediumItemGrid");
class CostItemGridComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i, s = void 0) {
    super(),
      (this.A1o = e),
      (this.P1o = i),
      (this.BelongView = s),
      (this.ScrollView = void 0),
      (this.ypt = void 0),
      (this.x1o = 0),
      (this.w1o = 0),
      (this.p4e = void 0),
      (this.B1o = !1),
      (this.sGe = (t, e, i) => {
        var s = new CostMediumItemGrid_1.CostMediumItemGrid();
        return (
          s.Initialize(e.GetOwner()),
          s.Refresh(t, !1, i),
          s.BindOnCanExecuteChange(() => !1),
          s.BindOnExtendToggleRelease(this.Jgt),
          { Key: i, Value: s }
        );
      }),
      (this.Jgt = (t) => {
        t = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t.ItemId,
        );
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [7, UE.UITexture],
      [8, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIButtonComponent],
      [9, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIText],
      [17, UE.UIButtonComponent],
    ]),
      void 0 !== this.P1o && this.BtnBindInfo.push([17, this.P1o]);
  }
  OnStart() {
    (this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(11))),
      this.p4e.SetFunction(this.A1o);
    var t = this.GetScrollViewWithScrollbar(5);
    (this.ScrollView = new GenericScrollView_1.GenericScrollView(t, this.sGe)),
      this.GetButton(17)?.RootUIComp?.SetUIActive(void 0 !== this.P1o);
  }
  Update(t, e, i) {
    this.UpdateByDataList(t), this.UpdateMoney(e, i);
  }
  UpdateByDataList(t) {
    (this.ypt = t), this.ScrollView.RefreshByData(this.ypt);
  }
  UpdateMoney(t, e) {
    (this.x1o = t),
      (this.w1o = e),
      this.SetItemIcon(this.GetTexture(7), this.x1o);
    (t = this.GetText(8)),
      t.SetText(this.w1o.toString()),
      (e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        this.x1o,
      ));
    (this.B1o = e >= this.w1o), (t.useChangeColor = !this.B1o);
  }
  GetIsMoneyEnough() {
    return this.B1o;
  }
  GetDataList() {
    return this.ypt;
  }
  SetMaxItemActive(t) {
    this.GetItem(12).SetUIActive(t);
  }
  SetLockItemActive(t) {
    this.GetItem(13).SetUIActive(t);
  }
  SetButtonItemActive(t) {
    this.p4e.SetActive(t);
  }
  SetLockLocalText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), t, e);
  }
  SetButtonItemLocalText(t) {
    this.p4e.SetLocalText(t);
  }
}
exports.CostItemGridComponent = CostItemGridComponent;
//# sourceMappingURL=CostItemGridComponent.js.map
