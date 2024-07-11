"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleExpItemGridComponent = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RoleLevelUpCostMediumItemGrid_1 = require("./RoleLevelUpCostMediumItemGrid");
class RoleExpItemGridComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i, s, h, o, r = void 0) {
    super(),
      (this.A1o = t),
      (this.Tuo = e),
      (this.Luo = i),
      (this.Duo = s),
      (this.Ruo = h),
      (this.Uuo = o),
      (this.BelongView = r),
      (this.ScrollView = void 0),
      (this.ypt = void 0),
      (this.x1o = 0),
      (this.w1o = 0),
      (this.p4e = void 0),
      (this.Auo = 0),
      (this.B1o = !1),
      (this.sGe = () => {
        var t =
          new RoleLevelUpCostMediumItemGrid_1.RoleLevelUpCostMediumItemGrid();
        return (
          t.BindLongPress(1, this.Jgt),
          t.BindOnCanExecuteChange(() => !1),
          t.BindReduceLongPress(this.Puo),
          t
        );
      }),
      (this.Jgt = (t, e, i) => {
        i = i.ItemId;
        (t || this.Ruo(i)) && this.Luo(i);
      }),
      (this.Puo = (t, e, i) => {
        i = i.ItemId;
        this.Uuo(i) && this.Duo(i);
      });
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
      [15, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.Tuo]]);
  }
  OnStart() {
    (this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(11))),
      this.p4e.SetFunction(this.A1o);
    var t = this.GetScrollViewWithScrollbar(5);
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
      t,
      this.sGe,
    );
  }
  Update(t, e, i) {
    this.UpdateByDataList(t), this.UpdateMoney(e, i);
  }
  UpdateByDataList(t) {
    (this.ypt = t),
      this.ScrollView.RefreshByData(this.ypt),
      this.UpdateAutoButtonState();
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
  UpdateAutoButtonState() {
    for (const t of this.ypt)
      if (0 < t.SelectedCount) return void (this.Auo = 1);
    this.Auo = 0;
  }
  GetAutoButtonState() {
    return this.Auo;
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
  SetMaxText(t) {}
  SetLockText(t) {}
  SetButtonItemText(t) {
    this.p4e.SetLocalText(t);
  }
  SetAutoButtonText(t) {
    this.GetText(15).ShowTextNew(t);
  }
  GetGenericScrollView() {
    return this.ScrollView;
  }
}
exports.RoleExpItemGridComponent = RoleExpItemGridComponent;
//# sourceMappingURL=RoleExpItemGridComponent.js.map
