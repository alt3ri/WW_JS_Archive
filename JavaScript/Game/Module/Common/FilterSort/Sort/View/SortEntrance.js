"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SortEntrance = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  DynamicMaskButton_1 = require("../../../../DynamicMask/DynamicMaskButton"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  FilterSortController_1 = require("../../FilterSortController"),
  SortViewData_1 = require("../Model/SortViewData");
class SortItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ARt = void 0),
      (this.he = ""),
      (this.U4e = void 0),
      (this.gRt = void 0),
      (this.cLt = (t) => {
        1 === t && this.U4e?.(this.ARt.RuleId, this.he);
      }),
      (this.T7e = () => !this.gRt || this.gRt(this.ARt.RuleId));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[1, this.cLt]]);
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.T7e);
  }
  Ije() {
    (this.he = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
      this.ARt.RuleId,
      this.ARt.DataType,
    )),
      this.GetText(0).SetText(this.he);
  }
  PRt(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0, !1);
  }
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetCanExecuteChange(t) {
    this.gRt = t;
  }
  SetToggleStateForce(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0, !1);
  }
  Refresh(t, i, s) {
    (this.ARt = t),
      this.Ije(),
      this.PRt(this.ARt.SelectedRule === this.ARt.RuleId);
  }
  GetKey(t, i) {
    return t.RuleId;
  }
}
class SortEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.UpdateDataListFunction = i),
      (this.rLt = void 0),
      (this.sLt = 1),
      (this.Mne = 0),
      (this.CRt = 1),
      (this.uft = []),
      (this.nLt = []),
      (this.xRt = void 0),
      (this.wRt = !1),
      (this.rTt = void 0),
      (this.BRt = () => {
        var t;
        this.wRt
          ? (this.GetExtendToggle(0).SetToggleState(0),
            (t = new SortViewData_1.SortViewData(this.Mne, this.cIt)),
            FilterSortController_1.FilterSortController.OpenSortView(t))
          : ((t = this.GetScrollViewWithScrollbar(3).RootUIComp.bIsUIActive),
            this.bRt(!t));
      }),
      (this.cIt = () => {
        this.qRt(), this.Ift(!1);
      }),
      (this.ARt = (t) => {
        this.rLt.SetIsAscending(1 === t), this.Ift(!1);
      }),
      (this.GRt = () => {
        this.GetExtendToggle(0).SetToggleState(0, !0);
      }),
      (this.MRt = () => {
        var t = new SortItem();
        return (
          t.SetToggleFunction(this.SRt), t.SetCanExecuteChange(this.T7e), t
        );
      }),
      (this.SRt = (t, i) => {
        this.RRt(),
          this.rLt.SetSelectBaseSort([t, i]),
          this.qRt(),
          this.Ift(!1),
          this.GetExtendToggle(0).SetToggleState(0, !0);
      }),
      (this.T7e = (t) => {
        return this.rLt.GetSelectBaseSort()[0] !== t;
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIExtendToggle],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.BRt],
        [2, this.ARt],
      ]);
  }
  OnStart() {
    (this.rLt = new SortViewData_1.SortResultData()),
      (this.xRt = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(3),
        this.MRt,
        this.GetItem(4).GetOwner(),
      )),
      this.GetExtendToggle(0).SetToggleStateForce(0, !1);
  }
  OnBeforeDestroy() {
    this.rTt?.Destroy(),
      ModelManager_1.ModelManager.SortModel.DeleteSortResultData(this.Mne);
  }
  lLt(t) {
    (this.sLt = t),
      (this.Mne = ConfigManager_1.ConfigManager.SortConfig.GetSortId(t));
  }
  NRt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.wRt = 0 < t.AttributeSortList.length;
  }
  ORt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.CRt = t.DataId;
  }
  _Lt() {
    var t, i;
    (this.rLt = ModelManager_1.ModelManager.SortModel.GetSortResultData(
      this.Mne,
    )),
      this.rLt ||
        ((this.rLt = new SortViewData_1.SortResultData()),
        (i = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne)
          .BaseSortList[0]),
        (t = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
          i,
          this.CRt,
        )),
        this.rLt.SetConfigId(this.Mne),
        this.rLt.SetSelectBaseSort([i, t]),
        (i = this.GetExtendToggle(2)),
        this.rLt.SetIsAscending(1 === i.GetToggleState()),
        ModelManager_1.ModelManager.SortModel.SetSortResultData(
          this.Mne,
          this.rLt,
        ));
  }
  bRt(t) {
    this.xRt.SetActive(t), t ? this.CTt().finally(void 0) : this.MTt();
  }
  LRt() {
    if ((this.bRt(!1), !this.wRt)) {
      var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne),
        i = [],
        s = this.rLt.GetSelectBaseSort()[0];
      for (const e of t.BaseSortList)
        i.push({ RuleId: e, DataType: this.CRt, SelectedRule: s });
      this.xRt.RefreshByData(i);
    }
  }
  kRt() {
    var t = this.GetExtendToggle(2),
      i = this.rLt.GetIsAscending() ? 1 : 0;
    t.SetToggleState(i, !1);
  }
  RRt() {
    var t = this.rLt.GetSelectBaseSort();
    this.xRt.GetScrollItemByKey(t[0]).SetToggleStateForce(!1);
  }
  qRt() {
    var t = this.rLt.ShowAllSortContent();
    this.GetText(1).SetText(t);
  }
  Ift(t) {
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(this.sLt);
    let s = this.uft;
    var e,
      h = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(i);
    h &&
      ((e = (i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(i))
        .DataType),
      (h = h.GetSelectRuleData()),
      (s = ModelManager_1.ModelManager.FilterModel.GetFilterList(
        s,
        e,
        i.IsSupportSelectAll,
        h,
      ))),
      ModelManager_1.ModelManager.SortModel.SortDataList(
        s,
        this.Mne,
        this.rLt,
        ...this.nLt,
      ),
      this.UpdateDataListFunction?.(s, t, 1);
  }
  async CTt() {
    this.rTt ||
      ((this.rTt = new DynamicMaskButton_1.DynamicMaskButton()),
      this.rTt.SetButtonFunction(this.GRt),
      await this.rTt.Init()),
      this.rTt.SetAttachChildItem(this.RootItem),
      this.rTt.SetActive(!0);
  }
  MTt() {
    this.rTt && (this.rTt.ResetItemParent(), this.rTt.SetActive(!1));
  }
  FRt() {
    this.SetActive(0 < this.Mne);
  }
  UpdateData(t, i, ...s) {
    this.lLt(t),
      this.FRt(),
      this.Mne <= 0 ||
        ((this.uft = i),
        (this.nLt = s),
        this.NRt(),
        this.ORt(),
        this._Lt(),
        this.LRt(),
        this.kRt(),
        this.qRt(),
        this.Ift(!0));
  }
  SetSortToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(2).SetToggleStateForce(t);
  }
}
exports.SortEntrance = SortEntrance;
//# sourceMappingURL=SortEntrance.js.map
