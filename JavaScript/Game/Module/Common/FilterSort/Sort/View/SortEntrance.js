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
      (this.BUt = void 0),
      (this.he = ""),
      (this.j5e = void 0),
      (this.MUt = void 0),
      (this.gDt = (t) => {
        1 === t && this.j5e?.(this.BUt.RuleId, this.he);
      }),
      (this.Lke = () => !this.MUt || this.MUt(this.BUt.RuleId));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[1, this.gDt]]);
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  qWe() {
    (this.he = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
      this.BUt.RuleId,
      this.BUt.DataType,
    )),
      this.GetText(0).SetText(this.he);
  }
  bUt(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0, !1);
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteChange(t) {
    this.MUt = t;
  }
  SetToggleStateForce(t) {
    this.GetExtendToggle(1).SetToggleStateForce(t ? 1 : 0, !1);
  }
  Refresh(t, i, s) {
    (this.BUt = t),
      this.qWe(),
      this.bUt(this.BUt.SelectedRule === this.BUt.RuleId);
  }
  GetKey(t, i) {
    return t.RuleId;
  }
}
class SortEntrance extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.UpdateDataListFunction = i),
      (this.hDt = void 0),
      (this.bfa = !1),
      (this._Dt = 1),
      (this.Mne = 0),
      (this.Wka = void 0),
      (this.vUt = 1),
      (this.ypt = []),
      (this.lDt = []),
      (this.qUt = void 0),
      (this.GUt = !1),
      (this.lLt = void 0),
      (this.NUt = () => {
        var t;
        this.GUt
          ? (this.GetExtendToggle(0).SetToggleState(0),
            (t = new SortViewData_1.SortViewData(this.Mne, this.vTt)),
            FilterSortController_1.FilterSortController.OpenSortView(t))
          : ((t = this.GetScrollViewWithScrollbar(3).RootUIComp.bIsUIActive),
            this.OUt(!t));
      }),
      (this.vTt = () => {
        this.kUt(), this.qpt(!1);
      }),
      (this.BUt = (t) => {
        this.hDt.SetIsAscending(1 === t), this.qpt(!1);
      }),
      (this.FUt = () => {
        this.GetExtendToggle(0).SetToggleState(0, !0);
      }),
      (this.IUt = () => {
        var t = new SortItem();
        return (
          t.SetToggleFunction(this.TUt), t.SetCanExecuteChange(this.Lke), t
        );
      }),
      (this.TUt = (t, i) => {
        this.xUt(),
          this.hDt.SetSelectBaseSort([t, i]),
          this.kUt(),
          this.qpt(!1),
          this.GetExtendToggle(0).SetToggleState(0, !0);
      }),
      (this.Lke = (t) => {
        return this.hDt.GetSelectBaseSort()[0] !== t;
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
        [0, this.NUt],
        [2, this.BUt],
      ]);
  }
  OnStart() {
    (this.hDt = new SortViewData_1.SortResultData()),
      (this.qUt = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(3),
        this.IUt,
        this.GetItem(4).GetOwner(),
      )),
      this.GetExtendToggle(0).SetToggleStateForce(0, !1);
  }
  OnBeforeDestroy() {
    this.lLt?.Destroy(),
      this.Qka(),
      ModelManager_1.ModelManager.SortModel.DeleteSortResultData(this.Mne);
  }
  Qka() {
    var t;
    this.Wka &&
      0 !== this._Dt &&
      ((t = this.hDt.ConvertToStorageData()),
      ModelManager_1.ModelManager.SortModel.SetSortConfigData(
        this.Wka,
        this._Dt,
        t,
      ));
  }
  mDt(t, i) {
    (this._Dt = t),
      (this.Mne = ConfigManager_1.ConfigManager.SortConfig.GetSortId(t)),
      (this.Wka = i ?? void 0);
  }
  VUt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.GUt = 0 < t.AttributeSortList.length;
  }
  HUt() {
    var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne);
    this.vUt = t.DataId;
  }
  dDt(t) {
    if (
      ((this.hDt = ModelManager_1.ModelManager.SortModel.GetSortResultData(
        this.Mne,
      )),
      !this.hDt || this.bfa)
    ) {
      var i = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne),
        i = t?.SelectBaseSort ?? i.BaseSortList[0];
      if (void 0 === this.hDt) {
        var s = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
            i,
            this.vUt,
          ),
          i =
            ((this.hDt = new SortViewData_1.SortResultData()),
            this.hDt.SetConfigId(this.Mne),
            this.hDt.SetSelectBaseSort([i, s]),
            this.GetExtendToggle(2));
        if (
          (void 0 !== t?.IsAscending
            ? this.hDt.SetIsAscending(t?.IsAscending)
            : this.hDt.SetIsAscending(1 === i.GetToggleState()),
          t?.SelectAttributeSort && 0 < t.SelectAttributeSort.length)
        ) {
          var e = new Map();
          for (const a of t.SelectAttributeSort) {
            var h = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
              a,
              this.vUt,
            );
            e.set(a, h);
          }
          this.hDt.SetSelectAttributeSort(e);
        }
        ModelManager_1.ModelManager.SortModel.SetSortResultData(
          this.Mne,
          this.hDt,
        );
      }
      this.bfa &&
        ((s = this.hDt.GetSelectBaseSort()) &&
          ((i = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(
            s[0],
            this.vUt,
          )),
          (s[1] = i)),
        (this.bfa = !1));
    }
  }
  OUt(t) {
    this.qUt.SetActive(t), t ? this.MLt() : this.TLt();
  }
  AUt() {
    if ((this.OUt(!1), !this.GUt)) {
      var t = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(this.Mne),
        i = [],
        s = this.hDt.GetSelectBaseSort()[0];
      for (const e of t.BaseSortList)
        i.push({ RuleId: e, DataType: this.vUt, SelectedRule: s });
      this.qUt.RefreshByData(i);
    }
  }
  jUt() {
    var t = this.GetExtendToggle(2),
      i = this.hDt.GetIsAscending() ? 1 : 0;
    t.SetToggleState(i, !1);
  }
  xUt() {
    var t = this.hDt.GetSelectBaseSort();
    this.qUt.GetScrollItemByKey(t[0]).SetToggleStateForce(!1);
  }
  kUt() {
    var t = this.hDt.ShowAllSortContent();
    this.GetText(1).SetText(t);
  }
  qpt(t) {
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(this._Dt);
    let s = this.ypt;
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
        this.hDt,
        ...this.lDt,
      ),
      this.UpdateDataListFunction?.(s, t, 1);
  }
  async MLt() {
    this.lLt ||
      ((this.lLt = new DynamicMaskButton_1.DynamicMaskButton()),
      this.lLt.SetButtonFunction(this.FUt),
      await this.lLt.Init()),
      this.lLt.SetAttachChildItem(this.RootItem),
      this.lLt.SetActive(!0);
  }
  TLt() {
    this.lLt && (this.lLt.ResetItemParent(), this.lLt.SetActive(!1));
  }
  WUt() {
    this.SetActive(0 < this.Mne);
  }
  UpdateData(t, i, ...s) {
    this.mDt(t),
      this.WUt(),
      this.Mne <= 0 ||
        ((this.ypt = i),
        (this.lDt = s),
        this.VUt(),
        this.HUt(),
        this.dDt(),
        this.AUt(),
        this.jUt(),
        this.kUt(),
        this.qpt(!0));
  }
  UpdateDataWithConfig(t, i, s, ...e) {
    this.Qka(),
      this.mDt(t, i),
      this.WUt(),
      this.Mne <= 0 ||
        ((this.ypt = s),
        (this.lDt = e),
        (t = ModelManager_1.ModelManager.SortModel.GetSortConfigData(
          i,
          this._Dt,
        )),
        this.VUt(),
        this.HUt(),
        this.dDt(t),
        this.AUt(),
        this.jUt(),
        this.kUt(),
        this.qpt(!0));
  }
  SetResultDataDirty() {
    this.bfa = !0;
  }
  SetSortToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(2).SetToggleStateForce(t);
  }
}
exports.SortEntrance = SortEntrance;
//# sourceMappingURL=SortEntrance.js.map
