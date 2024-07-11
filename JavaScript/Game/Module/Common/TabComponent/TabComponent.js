"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TabComponent = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  CommonTabItemBase_1 = require("./TabItem/CommonTabItemBase");
class TabComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s) {
    super(),
      (this.ProxyCreate = t),
      (this.ToggleCallBack = i),
      (this.eGe = void 0),
      (this.NOe = CommonDefine_1.INVALID_VALUE),
      (this.qbt = void 0),
      (this.MUt = void 0),
      (this.C5e = () => {
        var e = this.ProxyCreate(void 0, void 0);
        return (
          e.InitTabItem(),
          e.SetSelectedCallBack(this.gDt),
          e.SetCanExecuteChange(this.Lke),
          e
        );
      }),
      (this.gDt = (e) => {
        this.bbt(), (this.NOe = e), this.ToggleCallBack(e);
      }),
      (this.Lke = (e, t) =>
        !(this.NOe === e && !t) && (!this.MUt || this.MUt(e))),
      this.CreateThenShowByActor(e.GetOwner()),
      (this.qbt = s);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase]];
  }
  OnStart() {
    var e = this.qbt ? this.qbt.GetOwner() : void 0;
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(0),
      this.C5e,
      e,
    );
  }
  OnBeforeDestroy() {
    this.qbt = void 0;
  }
  bbt() {
    var e;
    this.NOe !== CommonDefine_1.INVALID_VALUE &&
      (e = this.eGe.GetLayoutItemByKey(this.NOe)) &&
      e.SetForceSwitch(0);
  }
  RefreshTabItem(e, t) {
    this.NOe !== CommonDefine_1.INVALID_VALUE &&
      this.eGe.GetLayoutItemByIndex(this.NOe)?.SetForceSwitch(0),
      (this.NOe = CommonDefine_1.INVALID_VALUE),
      this.eGe.RefreshByData(e, t);
  }
  async RefreshTabItemAsync(e, t = !0) {
    t &&
      (this.NOe !== CommonDefine_1.INVALID_VALUE &&
        this.eGe.GetLayoutItemByIndex(this.NOe)?.SetForceSwitch(0),
      (this.NOe = CommonDefine_1.INVALID_VALUE)),
      await this.eGe.RefreshByDataAsync(e);
  }
  RefreshTabItemByLength(t, e) {
    var i = new Array();
    for (let e = 0; e < t; e++) {
      var s = new CommonTabItemBase_1.CommonTabItemData();
      (s.Index = e), i.push(s);
    }
    this.RefreshTabItem(i, e);
  }
  async RefreshTabItemByLengthAsync(t) {
    var i = new Array();
    for (let e = 0; e < t; e++) {
      var s = new CommonTabItemBase_1.CommonTabItemData();
      (s.Index = e), i.push(s);
    }
    await this.RefreshTabItemAsync(i);
  }
  ResetLastSelectTab() {
    var e = this.eGe.GetLayoutItemByKey(this.NOe);
    e && e.SetForceSwitch(0);
  }
  SelectToggleByIndex(e, t = !1, i = !0) {
    t && (this.ResetLastSelectTab(), (this.NOe = CommonDefine_1.INVALID_VALUE)),
      e !== this.NOe &&
        (t = this.eGe.GetLayoutItemByKey(e)) &&
        t.SetForceSwitch(1, i);
  }
  GetSelectedIndex() {
    return this.NOe;
  }
  GetTabItemByIndex(e) {
    return this.eGe.GetLayoutItemByKey(e);
  }
  GetTabItemMap() {
    return this.eGe.GetLayoutItemMap();
  }
  GetLayout() {
    return this.eGe;
  }
  SetCanChange(e) {
    this.MUt = e;
  }
}
exports.TabComponent = TabComponent;
//# sourceMappingURL=TabComponent.js.map
