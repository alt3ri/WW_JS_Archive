"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGridBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LongPressButtonItem_1 = require("../Button/LongPressButtonItem");
class ItemGridBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this._At = new Map()),
      (this.uAt = new Set()),
      (this.cAt = new Set()),
      (this.mAt = []),
      (this.dAt = []),
      (this.CAt = void 0),
      (this.gAt = void 0),
      (this.LongPressButton = new LongPressButtonItem_1.LongPressButtonItem()),
      (this.IsHover = !1),
      (this.IsSelected = !1),
      (this.IsForceSelected = !1),
      (this.fAt = !0),
      (this.pAt = !1),
      (this.vAt = void 0),
      (this.MAt = void 0),
      (this.SAt = void 0),
      (this.EAt = void 0),
      (this.yAt = void 0),
      (this.IAt = void 0),
      (this.TAt = void 0),
      (this.LAt = () => {
        let t;
        this.OnExtendTogglePress(),
          this.MAt &&
            ((t = {
              MediumItemGrid: this,
              State: this.GetItemGridExtendToggle().GetToggleState(),
              Data: this.Data,
            }),
            this.MAt(t));
      }),
      (this.DAt = () => {
        let t;
        this.OnExtendToggleRelease(),
          this.SAt &&
            ((t = {
              MediumItemGrid: this,
              State: this.GetItemGridExtendToggle().GetToggleState(),
              Data: this.Data,
            }),
            this.SAt(t)),
          this.OnExtendToggleClicked(),
          this.EAt &&
            ((t = {
              MediumItemGrid: this,
              State: this.GetItemGridExtendToggle().GetToggleState(),
              Data: this.Data,
            }),
            this.EAt(t));
      }),
      (this.RAt = (t) => {
        this.OnExtendToggleStateChanged(t),
          this.vAt &&
            ((t = { MediumItemGrid: this, State: t, Data: this.Data }),
            this.vAt(t));
      }),
      (this.T7e = () =>
        this.yAt
          ? this.yAt(
              this.Data,
              this.IsForceSelected,
              this.GetItemGridExtendToggle().GetToggleState(),
            )
          : this.OnCanExecuteChange()),
      (this.UAt = () => {
        this.IsHover = !0;
      }),
      (this.AAt = () => {
        this.IsHover = !1;
      }),
      (this.OnLongPressActivate = (t) => {
        this.IAt && this.IAt(t, this, this.Data);
      }),
      (this.CanItemLongPressClick = () =>
        !this.TAt || this.TAt(this, this.Data)),
      (this.PAt = (t) => {
        this.xAt(t),
          this.uAt.delete(t),
          this.uAt.size > 0 ||
            ((this.pAt = !1),
            this.RefreshComponentVisible(),
            this.RefreshComponentHierarchyIndex());
      });
  }
  Initialize(t) {
    t && this.CreateThenShowByActor(t);
  }
  OnStartImplement() {
    (this.CAt = this.OnSetTopAdditionItem()),
      (this.gAt = this.OnSetBottomAdditionItem()),
      this.LongPressButton.Initialize(
        this.GetItemGridExtendToggle(),
        this.OnLongPressActivate,
        this.LAt,
        this.DAt,
      ),
      this.LongPressButton.SetTickConditionDelegate(this.CanItemLongPressClick),
      this.AddEvents();
  }
  OnBeforeDestroyImplement() {
    (this.CAt = void 0),
      (this.gAt = void 0),
      (this.mAt.length = 0),
      (this.dAt.length = 0),
      this.LongPressButton?.Clear(),
      (this.LongPressButton = void 0),
      (this.pAt = !1),
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
    const t = this.GetItemGridExtendToggle();
    t.OnStateChange.Add(this.RAt),
      t.CanExecuteChange.Bind(this.T7e),
      t.OnHover.Add(this.UAt),
      t.OnUnHover.Add(this.AAt),
      this.OnAddEvents();
  }
  RemoveEvents() {
    const t = this.GetItemGridExtendToggle();
    t.OnStateChange.Remove(this.RAt),
      t.CanExecuteChange.Unbind(),
      t.OnHover.Remove(this.UAt),
      t.OnUnHover.Remove(this.AAt),
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
    const s = this.GetItemGridExtendToggle();
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
    let s;
    (this.fAt === t && !i) ||
      ((this.fAt = t),
      (s = this.GetItemGridExtendToggle()),
      t ? this.SetSelected(this.IsSelected, i) : s.SetToggleState(2));
  }
  BindOnExtendTogglePress(t) {
    this.MAt = t;
  }
  UnBindOnExtendTogglePress() {
    this.MAt = void 0;
  }
  BindOnExtendToggleRelease(t) {
    this.SAt = t;
  }
  UnBindOnExtendToggleRelease() {
    this.SAt = void 0;
  }
  BindOnExtendToggleStateChanged(t) {
    this.vAt = t;
  }
  UnBindOnExtendToggleStateChanged() {
    this.vAt = void 0;
  }
  BindOnExtendToggleClicked(t) {
    this.EAt = t;
  }
  UnBindOnExtendToggleClicked() {
    this.EAt = void 0;
  }
  BindOnCanExecuteChange(t) {
    this.yAt = t;
  }
  UnBindOnCanExecuteChange() {
    this.yAt = void 0;
  }
  BindLongPress(t, i, s) {
    this.LongPressButton.Deactivate(),
      this.LongPressButton.Activate(t),
      (this.IAt = i),
      (this.TAt = s);
  }
  UnBindLongPress() {
    (this.IAt = void 0), (this.TAt = void 0);
  }
  RefreshComponent(t, i, s) {
    let e = this.GetItemGridComponent(t);
    return (
      void 0 === s
        ? (e?.SetActive(!1), this.cAt.delete(e))
        : (e = !e && i ? this.wAt(t) : e) &&
          (e.Refresh(s), this.BAt(e), e.IsCreating || this.xAt(e)),
      e
    );
  }
  xAt(t) {
    t.IsShowOrShowing ? this.cAt.add(t) : this.cAt.delete(t);
  }
  SetComponentVisible(t, i) {
    t && (i ? this.cAt.add(t) : this.cAt.delete(t), t.SetActive(i));
  }
  wAt(t) {
    let i = this._At.get(t);
    if (!i) {
      switch ((i = new t()).GetLayoutLevel()) {
        case 0:
          i.Initialize(this.CAt);
          break;
        case 1:
          i.Initialize(this.gAt);
      }
      this._At.set(t, i),
        this.uAt.add(i),
        (this.pAt = !0),
        i.Load().then(this.PAt, () => {});
    }
    return i;
  }
  RefreshComponentVisible() {
    for (const t of this._At.values()) this.cAt.has(t) || t.SetActive(!1);
  }
  ClearVisibleComponent() {
    this.cAt.clear();
  }
  BAt(t) {
    switch (t.GetLayoutLevel()) {
      case 0:
        this.dAt.push(t);
        break;
      case 1:
        this.mAt.push(t);
    }
  }
  ClearComponentList() {
    (this.mAt.length = 0), (this.dAt.length = 0);
  }
  RefreshComponentHierarchyIndex() {
    if (!this.pAt) {
      for (let t = 0; t < this.dAt.length; t++)
        this.dAt[t].SetHierarchyIndex(t);
      for (let t = 0; t < this.mAt.length; t++)
        this.mAt[t].SetHierarchyIndex(t);
    }
  }
  GetItemGridComponent(t) {
    t = this._At.get(t);
    if (t) return t;
  }
  HiddenAllItemGridComponents() {
    for (const t of this._At.values()) t.SetActive(!1);
  }
  SetItemGridComponentVisible(t, i) {
    this._At.get(t)?.SetActive(i);
  }
  ClearItemGridComponents() {
    this._At.clear(), this.uAt.clear(), this.ClearComponentList();
  }
  SetToggleInteractive(t) {
    this.GetItemGridExtendToggle().SetSelfInteractive(t);
  }
}
exports.ItemGridBase = ItemGridBase;
// # sourceMappingURL=ItemGridBase.js.map
