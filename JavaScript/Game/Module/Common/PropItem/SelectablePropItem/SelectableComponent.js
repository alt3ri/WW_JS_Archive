"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectableComponent = exports.SelectableComponentData = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  SelectableExpData_1 = require("./SelectableExpData"),
  SelectablePropDataUtil_1 = require("./SelectablePropDataUtil"),
  SelectablePropMediumItemGrid_1 = require("./SelectablePropMediumItemGrid"),
  DEFAULT_MAX_SIZE = 20;
class SelectableComponentData {
  constructor() {
    (this.IsSingleSelected = !1),
      (this.IsNumSelectable = !0),
      (this.MaxSelectedGridNum = DEFAULT_MAX_SIZE),
      (this.SuitActive = !1),
      (this.IsNeedSort = !0),
      (this.FirstOpenOperationData = void 0),
      (this.OtherFunction = void 0),
      (this.OnPropItemFunction = void 0),
      (this.OnChangeSelectedFunction = void 0),
      (this.CheckIfCanAddFunction = void 0);
  }
}
exports.SelectableComponentData = SelectableComponentData;
class SelectableComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LoopScrollView = void 0),
      (this.Data = void 0),
      (this.SelectedDataList = []),
      (this.ItemDataList = void 0),
      (this.LastAddData = void 0),
      (this.LastSelectedPropData = void 0),
      (this.MaxSize = 20),
      (this.SelectableExpData = void 0),
      (this.FirstOperationData = void 0),
      (this.ExpData = void 0),
      (this.LastSelectedIndex = 0),
      (this.hwt = (t) => {
        var t = this.ItemDataList[t],
          t =
            SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
              t,
            ),
          e = this.lwt(t);
        return (t.SelectedCount = e), t;
      }),
      (this.InitItem = () => {
        var t =
          new SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid();
        return (
          t.BindLongPress(1, this.AddFunction, this.CanItemLongPress),
          t.BindReduceLongPress(this.ReduceFunction),
          t.BindAfterApply(this.OnAfterApplyMediumItemGrid),
          t.BindOnCanExecuteChange(this.OnCanExecuteChange),
          t
        );
      }),
      (this.OnAfterApplyMediumItemGrid = (t) => {}),
      (this.OnCanExecuteChange = (t, e, i) => {
        return this.CanAddMaterial(t);
      }),
      (this.CanItemLongPress = (t, e) => {
        return this.CanAddMaterial(e, !1);
      }),
      (this.AddFunction = (t, e, i) => {
        if (
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectItemAdd,
            i.ItemId,
            i.IncId,
          ),
          this.SetPrevPropItemSelectedState(i),
          !this.CanAddMaterial(i, !0))
        )
          return !1;
        this.Data.IsSingleSelected &&
          (this.DeleteLastData(i), this.CancelPropItemSelected(i)),
          this._wt(i),
          this.AddData(i),
          this.UpdateExp(),
          this.uwt();
        var s = this.GetSelectedData(i),
          s =
            ((i.SelectedCount = s.SelectedCount),
            e.RefreshCostCount(),
            { IsVisible: 0 < i.SelectedCount, LongPressConfigId: 1 });
        return e.SetReduceButton(s), e.SetSelected(0 < i.SelectedCount), !0;
      }),
      (this.ReduceFunction = (t, e, i) => {
        this.SetPrevPropItemSelectedState(i);
        var s = this.GetSelectedData(i);
        if (!s) return !1;
        var r = s.SelectedCount;
        if (!r) return !1;
        --r <= 0 ? this.cwt(i) : (s.SelectedCount = r),
          (i.SelectedCount = r),
          this.Data.OtherFunction && this.Data.OtherFunction(),
          this.UpdateExp(),
          this.uwt();
        (s = e),
          s.RefreshCostCount(),
          s.SetSelected(0 < r),
          (e = { IsVisible: 0 < i.SelectedCount, LongPressConfigId: 1 });
        return s.SetReduceButton(e), !0;
      });
  }
  InitLoopScroller(t, e, i) {
    (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      t,
      e.GetOwner(),
      this.InitItem,
    )),
      this.SetData(i);
  }
  SetData(t) {
    this.Data = t;
  }
  SetExpData(t) {
    this.SelectableExpData =
      SelectableExpData_1.SelectableExpData.PhraseData(t);
  }
  SetMaxSize(t) {
    this.MaxSize = t;
  }
  UpdateComponent(t, e, i = void 0) {
    this.mwt(e),
      i && ((this.ExpData = i), this.SetExpData(i), this.UpdateExp());
  }
  mwt(t) {
    (this.SelectedDataList = t || []),
      this.Data.IsSingleSelected && 0 < t.length && this._wt(t[0]);
  }
  GetCurrentSelectedData() {
    return this.SelectedDataList;
  }
  UpdateDataList(t) {
    (this.ItemDataList = t),
      this.LoopScrollView.ReloadProxyData(
        this.hwt,
        this.ItemDataList.length,
        !1,
      ),
      0 < this.ItemDataList.length &&
        this.LoopScrollView.ScrollToGridIndex(this.LastSelectedIndex);
  }
  GetFirstOperationItem() {
    return this.FirstOperationData;
  }
  SetFirstOperationData(t) {
    this.FirstOperationData = t;
  }
  OnBeforeDestroy() {}
  SetPrevPropItemSelectedState(t) {
    void 0 === this.LastSelectedPropData ||
      this.dwt(t) ||
      !this.LastAddData ||
      (t = this.Cwt(this.LastAddData)) < 0 ||
      (this.LoopScrollView.IsGridDisplaying(t) &&
        this.LoopScrollView.UnsafeGetGridProxy(t).OnDeselected(!1));
  }
  CanAddMaterial(t, e = !1) {
    var i;
    return t.GetIsLock()
      ? (e &&
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponLockTipsText",
          ),
        !1)
      : this.SelectableExpData?.IsInMax()
        ? (e &&
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WeaponAddExpTipsText",
            ),
          !1)
        : !(
            ((i = this.GetSelectedData(t))?.SelectedCount &&
              i.SelectedCount === t.Count) ||
            (!i && this.SelectedDataList.length >= this.MaxSize
              ? (e &&
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "WeaponFullMaterialText",
                  ),
                1)
              : this.Data.CheckIfCanAddFunction &&
                !this.Data.CheckIfCanAddFunction(
                  this.SelectedDataList,
                  t.IncId,
                  t.ItemId,
                  1,
                ))
          );
  }
  dwt(t) {
    var e;
    return (
      !!this.LastAddData &&
      (0 < (e = t.IncId)
        ? this.LastAddData.IncId === e
        : this.LastAddData.ItemId === t.ItemId)
    );
  }
  Cwt(t) {
    var i = t.IncId,
      s = t.ItemId;
    if (0 < i || 0 < s)
      for (let t = 0, e = this.ItemDataList.length; t < e; ++t) {
        var r = this.ItemDataList[t];
        if (0 < i) {
          if (r.GetUniqueId() === i) return t;
        } else if (r.GetConfigId() === s) return t;
      }
    return -1;
  }
  DeleteLastData(t) {
    this.dwt(t) || this.cwt(this.LastAddData);
  }
  cwt(t) {
    var e;
    t && (0 < (e = t.IncId) ? this.gwt(e) : this.fwt(t.ItemId));
  }
  gwt(e) {
    for (let t = 0; t < this.SelectedDataList.length; t++) {
      var i = this.SelectedDataList[t];
      if (i.IncId === e)
        return (i.SelectedCount = 0), void this.SelectedDataList.splice(t, 1);
    }
  }
  fwt(e) {
    for (let t = 0; t < this.SelectedDataList.length; t++) {
      var i = this.SelectedDataList[t];
      if (i.ItemId === e)
        return (i.SelectedCount = 0), void this.SelectedDataList.splice(t, 1);
    }
  }
  CancelPropItemSelected(t) {
    void 0 === this.LastAddData ||
      this.dwt(t) ||
      (t = this.Cwt(this.LastAddData)) < 0 ||
      (this.LoopScrollView.IsGridDisplaying(t) &&
        ((t = this.LoopScrollView.UnsafeGetGridProxy(t)).Clear(),
        t.SetSelected(!1, !0),
        t.SetReduceButton(void 0)));
  }
  _wt(t) {
    this.LastAddData = t;
  }
  AddData(t) {
    var e = this.GetSelectedData(t);
    e ? this.pwt(e) : (this.SelectedDataList.push(t), t.SelectedCount++),
      this.Data.OtherFunction && this.Data.OtherFunction();
  }
  pwt(e) {
    var i = this.SelectedDataList.length;
    for (let t = 0; t < i; t++) {
      var s = this.SelectedDataList[t];
      if (0 === s.IncId && s.ItemId === e.ItemId)
        return void (s.SelectedCount = s.SelectedCount + 1);
    }
    this.SelectedDataList.push(e);
  }
  GetSelectedData(t) {
    if (t) {
      var e = t.IncId;
      if (0 < e) {
        for (const t of this.SelectedDataList) if (t.IncId === e) return t;
      } else {
        var i = t.ItemId;
        if (0 < i)
          for (const t of this.SelectedDataList) if (t.ItemId === i) return t;
      }
    }
  }
  lwt(t) {
    t = this.GetSelectedData(t);
    return t ? t.SelectedCount : 0;
  }
  UpdateExp() {
    if (this.ExpData?.GetItemExpFunction) {
      let t = 0;
      for (const e of this.SelectedDataList)
        t += this.ExpData.GetItemExpFunction(e) * e.SelectedCount;
      this.SelectableExpData.UpdateExp(t);
    }
  }
  uwt() {
    this.Data.OnChangeSelectedFunction?.(
      this.SelectedDataList,
      this.SelectableExpData,
    );
  }
}
exports.SelectableComponent = SelectableComponent;
//# sourceMappingURL=SelectableComponent.js.map
