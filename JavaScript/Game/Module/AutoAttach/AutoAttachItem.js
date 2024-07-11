"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoAttachItem = void 0);
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class AutoAttachItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.CurrentShowItemIndex = 0),
      (this.CWe = 0),
      (this.gWe = 0),
      (this.SelectState = !1),
      (this.fWe = !1),
      (this.pWe = !1),
      (this.SourceView = void 0),
      (this.CurrentMoveDirection = void 0),
      (this.AllData = void 0),
      (this.DragState = !1),
      t && this.CreateThenShowByActor(t);
  }
  SetData(t) {
    this.AllData = t;
  }
  SetIfNeedShowFakeItem(t) {
    this.pWe = t;
  }
  SetSourceView(t) {
    (this.SourceView = t),
      (this.CurrentMoveDirection = this.SourceView.GetCurrentMoveDirection());
  }
  SetItemIndex(t) {
    this.CWe = t;
  }
  GetItemIndex() {
    return this.CWe;
  }
  InitItem() {
    (this.gWe = this.SourceView.GetDataLength()),
      this.CWe < this.gWe
        ? (this.CurrentShowItemIndex = this.CWe)
        : (this.CurrentShowItemIndex =
            this.CWe - this.SourceView.GetShowItemNum()),
      this.vWe();
  }
  vWe() {
    if ((this.MWe(), this.SourceView)) {
      var i = Math.floor(this.SourceView.GetShowItemNum() / 2),
        s = this.SourceView.GetItemSize(),
        h = this.SourceView.GetGap();
      let t = 0;
      (t =
        this.SourceView.GetIfCircle() || 0 === this.CurrentMoveDirection
          ? (this.CWe - i) * (s + h)
          : (i - this.CWe) * (s + h)),
        this.MoveItem(t);
    }
  }
  MWe() {
    this.RootItem.SetAnchorOffsetX(0), this.RootItem.SetAnchorOffsetY(0);
  }
  MoveItem(t) {
    var i = this.CurrentShowItemIndex,
      t = this.SWe(t);
    (this.CurrentShowItemIndex = t[1]),
      0 === this.CurrentMoveDirection
        ? this.RootItem.SetAnchorOffsetX(t[0])
        : this.RootItem.SetAnchorOffsetY(t[0]),
      this.SourceView.GetIfCircle() ||
        this.fWe ||
        ((t =
          (0 <= this.CurrentShowItemIndex &&
            this.CurrentShowItemIndex < this.gWe) ||
          this.pWe),
        this.RootItem.SetUIActive(t)),
      i !== this.CurrentShowItemIndex && this.RefreshItem(),
      this.OnMoveItem();
  }
  GetCurrentMovePercentage() {
    var t = this.SourceView.GetViewSize();
    return (this.GetCurrentPosition() + t / 2) / t;
  }
  SWe(t) {
    t = this.GetCurrentPosition() + t;
    return this.SourceView.GetIfCircle() ? this.EWe(t) : this.yWe(t);
  }
  EWe(t) {
    let i = t,
      s = this.CurrentShowItemIndex;
    var h = this.SourceView.GetItemSize(),
      e = this.SourceView.GetGap(),
      r = this.SourceView.GetShowItemNum();
    if (this.IWe(i)) {
      if (!this.TWe(i)) {
        for (; !this.TWe(i); ) (i += (h + e) * Math.ceil(r + 1)), (s += r + 1);
        for (; s >= this.gWe; ) s -= this.gWe;
      }
    } else {
      for (; !this.IWe(i); ) (i -= (h + e) * Math.ceil(r + 1)), (s -= r + 1);
      for (; s < 0; ) s = this.gWe + s;
    }
    return [i, s];
  }
  yWe(t) {
    let i = t,
      s = this.CurrentShowItemIndex;
    var h = this.SourceView.GetItemSize(),
      e = this.SourceView.GetGap(),
      r = this.SourceView.GetShowItemNum();
    if (this.IWe(i)) {
      if (!this.TWe(i))
        for (; !this.TWe(i); )
          (i += (h + e) * Math.ceil(r + 1)),
            0 === this.CurrentMoveDirection ? (s += r + 1) : (s -= r + 1);
    } else
      for (; !this.IWe(i); )
        (i -= (h + e) * Math.ceil(r + 1)),
          0 === this.CurrentMoveDirection ? (s -= r + 1) : (s += r + 1);
    return [i, s];
  }
  GetCurrentShowItemIndex() {
    return this.CurrentShowItemIndex;
  }
  GetCurrentSelectedState() {
    return (
      this.SourceView.GetCurrentSelectIndex() === this.GetCurrentShowItemIndex()
    );
  }
  GetSelectedState() {
    return this.SelectState;
  }
  Select() {
    this.SelectState || ((this.SelectState = !0), this.OnSelect());
  }
  OnControllerDragStart() {
    this.DragState = !0;
  }
  OnControllerDragEnd() {
    this.DragState = !1;
  }
  ForceUnSelectItem() {
    (this.SelectState = !1), this.OnUnSelect();
  }
  GetCurrentPosition() {
    return 0 === this.CurrentMoveDirection
      ? this.RootItem.GetAnchorOffsetX()
      : this.RootItem.GetAnchorOffsetY();
  }
  RefreshItem() {
    var t = this.AllData[this.CurrentShowItemIndex];
    this.fWe || void 0 !== t
      ? this.OnRefreshItem(t)
      : this.pWe && this.OnRefreshItem(void 0);
  }
  IWe(t) {
    var i = this.SourceView.GetItemSize(),
      s = this.SourceView.GetGap(),
      h = this.SourceView.GetShowItemNum();
    return !((i + s) * Math.ceil((h + 1) / 2) < t);
  }
  TWe(t) {
    var i = this.SourceView.GetItemSize(),
      s = this.SourceView.GetGap(),
      h = this.SourceView.GetShowItemNum();
    return !(t < -(i + s) * Math.ceil(h / 2));
  }
}
exports.AutoAttachItem = AutoAttachItem;
//# sourceMappingURL=AutoAttachItem.js.map
