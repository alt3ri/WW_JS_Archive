"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGridBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LongPressButtonItem_1 = require("../Button/LongPressButtonItem");
class ItemGridBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.mPt = new Map()),
      (this.dPt = new Set()),
      (this.CPt = new Set()),
      (this.gPt = []),
      (this.fPt = []),
      (this.pPt = void 0),
      (this.vPt = void 0),
      (this.LongPressButton = new LongPressButtonItem_1.LongPressButtonItem()),
      (this.IsHover = !1),
      (this.IsSelected = !1),
      (this.IsForceSelected = !1),
      (this.MPt = !0),
      (this.EPt = !1),
      (this.SPt = void 0),
      (this.yPt = void 0),
      (this.IPt = void 0),
      (this.TPt = void 0),
      (this.LPt = void 0),
      (this.DPt = void 0),
      (this.RPt = void 0),
      (this.UPt = () => {
        var t;
        this.OnExtendTogglePress(),
          this.yPt &&
            ((t = {
              MediumItemGrid: this,
              State: this.GetItemGridExtendToggle().GetToggleState(),
              Data: this.Data,
            }),
            this.yPt(t));
      }),
      (this.APt = () => {
        var t;
        this.OnExtendToggleRelease(),
          this.IPt &&
            ((t = {
              MediumItemGrid: this,
              State: this.GetItemGridExtendToggle().GetToggleState(),
              Data: this.Data,
            }),
            this.IPt(t)),
          this.OnExtendToggleClicked(),
          this.TPt &&
            ((t = {
              MediumItemGrid: this,
              State: this.GetItemGridExtendToggle().GetToggleState(),
              Data: this.Data,
            }),
            this.TPt(t));
      }),
      (this.PPt = (t) => {
        this.OnExtendToggleStateChanged(t),
          this.SPt &&
            ((t = { MediumItemGrid: this, State: t, Data: this.Data }),
            this.SPt(t));
      }),
      (this.Lke = () =>
        this.LPt
          ? this.LPt(
              this.Data,
              this.IsForceSelected,
              this.GetItemGridExtendToggle().GetToggleState(),
            )
          : this.OnCanExecuteChange()),
      (this.xPt = () => {
        this.IsHover = !0;
      }),
      (this.wPt = () => {
        this.IsHover = !1;
      }),
      (this.OnLongPressActivate = (t) => {
        this.DPt && this.DPt(t, this, this.Data);
      }),
      (this.CanItemLongPressClick = () =>
        !this.RPt || this.RPt(this, this.Data)),
      (this.BPt = (t) => {
        this.bPt(t),
          this.dPt.delete(t),
          0 < this.dPt.size ||
            ((this.EPt = !1),
            this.RefreshComponentVisible(),
            this.RefreshComponentHierarchyIndex());
      });
  }
  Initialize(t) {
    t && this.CreateThenShowByActor(t);
  }
  OnStartImplement() {
    (this.pPt = this.OnSetTopAdditionItem()),
      (this.vPt = this.OnSetBottomAdditionItem()),
      this.LongPressButton.Initialize(
        this.GetItemGridExtendToggle(),
        this.OnLongPressActivate,
        this.UPt,
        this.APt,
      ),
      this.LongPressButton.SetTickConditionDelegate(this.CanItemLongPressClick),
      this.AddEvents();
  }
  OnBeforeDestroyImplement() {
    (this.pPt = void 0),
      (this.vPt = void 0),
      (this.gPt.length = 0),
      (this.fPt.length = 0),
      this.LongPressButton?.Clear(),
      (this.LongPressButton = void 0),
      (this.EPt = !1),
      this.UnBindOnExtendTogglePress(),
      this.UnBindOnExtendToggleRelease(),
      this.UnBindOnExtendToggleStateChanged(),
      this.UnBindOnExtendToggleClicked(),
      this.UnBindOnCanExecuteChange(),
      this.UnBindLongPress(),
      this.UnBindComponentEvents(),
      this.ClearVisibleComponent(),
      this.ClearItemGridComponents(),
      this.RemoveEvents();
  }
  OnSetBottomAdditionItem() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Inventory", 8, "没有实现OnSetBottomAdditionItem");
  }
  OnSetTopAdditionItem() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Inventory", 8, "没有实现OnSetBottomAdditionItem");
  }
  GetItemGridExtendToggle() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Inventory", 8, "没有实现GetItemGridExtendToggle");
  }
  AddEvents() {
    var t = this.GetItemGridExtendToggle();
    t.OnStateChange.Add(this.PPt),
      t.CanExecuteChange.Bind(this.Lke),
      t.OnHover.Add(this.xPt),
      t.OnUnHover.Add(this.wPt),
      this.OnAddEvents();
  }
  RemoveEvents() {
    var t = this.GetItemGridExtendToggle();
    t.OnStateChange.Remove(this.PPt),
      t.CanExecuteChange.Unbind(),
      t.OnHover.Remove(this.xPt),
      t.OnUnHover.Remove(this.wPt),
      this.OnRemoveEvents();
  }
  UnBindComponentEvents() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnExtendTogglePress() {}
  OnExtendToggleRelease() {}
  OnExtendToggleClicked() {}
  OnExtendToggleStateChanged(t) {}
  OnCanExecuteChange() {
    return !0;
  }
  SetSelected(t, i = !1) {
    var s = this.GetItemGridExtendToggle();
    t
      ? i
        ? s.SetToggleStateForce(1, !1)
        : s.SetToggleState(1, !1)
      : i
        ? s.SetToggleStateForce(0, !1)
        : s.SetToggleState(0, !1),
      (this.IsSelected = t),
      (this.IsForceSelected = i);
  }
  SetExtendToggleEnable(t, i = !1) {
    var s;
    (this.MPt === t && !i) ||
      ((this.MPt = t),
      (s = this.GetItemGridExtendToggle()),
      t ? this.SetSelected(this.IsSelected, i) : s.SetToggleState(2));
  }
  BindOnExtendTogglePress(t) {
    this.yPt = t;
  }
  UnBindOnExtendTogglePress() {
    this.yPt = void 0;
  }
  BindOnExtendToggleRelease(t) {
    this.IPt = t;
  }
  UnBindOnExtendToggleRelease() {
    this.IPt = void 0;
  }
  BindOnExtendToggleStateChanged(t) {
    this.SPt = t;
  }
  UnBindOnExtendToggleStateChanged() {
    this.SPt = void 0;
  }
  BindOnExtendToggleClicked(t) {
    this.TPt = t;
  }
  UnBindOnExtendToggleClicked() {
    this.TPt = void 0;
  }
  BindOnCanExecuteChange(t) {
    this.LPt = t;
  }
  UnBindOnCanExecuteChange() {
    this.LPt = void 0;
  }
  BindLongPress(t, i, s) {
    this.LongPressButton.Deactivate(),
      this.LongPressButton.Activate(t),
      (this.DPt = i),
      (this.RPt = s);
  }
  UnBindLongPress() {
    (this.DPt = void 0), (this.RPt = void 0);
  }
  RefreshComponent(t, i, s) {
    let e = this.GetItemGridComponent(t);
    return (
      void 0 === s
        ? (e?.SetActive(!1), this.CPt.delete(e))
        : (e = !e && i ? this.qPt(t) : e) &&
          (e.Refresh(s), this.GPt(e), e.IsCreating || this.bPt(e)),
      e
    );
  }
  bPt(t) {
    t.IsShowOrShowing ? this.CPt.add(t) : this.CPt.delete(t);
  }
  SetComponentVisible(t, i) {
    t && (i ? this.CPt.add(t) : this.CPt.delete(t), t.SetActive(i));
  }
  qPt(t) {
    var i = this.mPt.get(t);
    if (!i) {
      switch ((i = new t()).GetLayoutLevel()) {
        case 0:
          i.Initialize(this.pPt);
          break;
        case 1:
          i.Initialize(this.vPt);
      }
      this.mPt.set(t, i),
        this.dPt.add(i),
        (this.EPt = !0),
        i.Load().then(this.BPt, () => {});
    }
    return i;
  }
  RefreshComponentVisible() {
    for (const t of this.mPt.values()) this.CPt.has(t) || t.SetActive(!1);
  }
  ClearVisibleComponent() {
    this.CPt.clear();
  }
  GPt(t) {
    switch (t.GetLayoutLevel()) {
      case 0:
        this.fPt.push(t);
        break;
      case 1:
        this.gPt.push(t);
    }
  }
  ClearComponentList() {
    (this.gPt.length = 0), (this.fPt.length = 0);
  }
  RefreshComponentHierarchyIndex() {
    if (!this.EPt) {
      for (let t = 0; t < this.fPt.length; t++)
        this.fPt[t].SetHierarchyIndex(t);
      for (let t = 0; t < this.gPt.length; t++)
        this.gPt[t].SetHierarchyIndex(t);
    }
  }
  GetItemGridComponent(t) {
    t = this.mPt.get(t);
    if (t) return t;
  }
  HiddenAllItemGridComponents() {
    for (const t of this.mPt.values()) t.SetActive(!1);
  }
  SetItemGridComponentVisible(t, i) {
    this.mPt.get(t)?.SetActive(i);
  }
  ClearItemGridComponents() {
    this.mPt.clear(), this.dPt.clear(), this.ClearComponentList();
  }
  SetToggleInteractive(t) {
    this.GetItemGridExtendToggle().SetSelfInteractive(t);
  }
}
exports.ItemGridBase = ItemGridBase;
//# sourceMappingURL=ItemGridBase.js.map
