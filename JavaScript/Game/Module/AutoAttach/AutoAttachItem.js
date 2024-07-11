"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoAttachItem = void 0);
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class AutoAttachItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.CurrentShowItemIndex = 0),
      (this.DKe = 0),
      (this.RKe = 0),
      (this.SelectState = !1),
      (this.UKe = !1),
      (this.AKe = !1),
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
    this.AKe = t;
  }
  SetSourceView(t) {
    (this.SourceView = t),
      (this.CurrentMoveDirection = this.SourceView.GetCurrentMoveDirection());
  }
  SetItemIndex(t) {
    this.DKe = t;
  }
  GetItemIndex() {
    return this.DKe;
  }
  InitItem() {
    (this.RKe = this.SourceView.GetDataLength()),
      this.DKe < this.RKe
        ? (this.CurrentShowItemIndex = this.DKe)
        : (this.CurrentShowItemIndex =
            this.DKe - this.SourceView.GetShowItemNum()),
      this.PKe();
  }
  PKe() {
    if ((this.xKe(), this.SourceView)) {
      var i = Math.floor(this.SourceView.GetShowItemNum() / 2),
        s = this.SourceView.GetItemSize(),
        h = this.SourceView.GetGap();
      let t = 0;
      (t =
        this.SourceView.GetIfCircle() || 0 === this.CurrentMoveDirection
          ? (this.DKe - i) * (s + h)
          : (i - this.DKe) * (s + h)),
        this.MoveItem(t);
    }
  }
  xKe() {
    this.RootItem.SetAnchorOffsetX(0), this.RootItem.SetAnchorOffsetY(0);
  }
  MoveItem(t) {
    var i = this.CurrentShowItemIndex,
      t = this.wKe(t);
    (this.CurrentShowItemIndex = t[1]),
      0 === this.CurrentMoveDirection
        ? this.RootItem.SetAnchorOffsetX(t[0])
        : this.RootItem.SetAnchorOffsetY(t[0]),
      this.SourceView.GetIfCircle() ||
        this.UKe ||
        ((t =
          (0 <= this.CurrentShowItemIndex &&
            this.CurrentShowItemIndex < this.RKe) ||
          this.AKe),
        this.RootItem.SetUIActive(t)),
      i !== this.CurrentShowItemIndex && this.RefreshItem(),
      this.OnMoveItem();
  }
  GetCurrentMovePercentage() {
    var t = this.SourceView.GetViewSize();
    return (this.GetCurrentPosition() + t / 2) / t;
  }
  wKe(t) {
    t = this.GetCurrentPosition() + t;
    return this.SourceView.GetIfCircle() ? this.BKe(t) : this.bKe(t);
  }
  BKe(t) {
    let i = t,
      s = this.CurrentShowItemIndex;
    var h = this.SourceView.GetItemSize(),
      e = this.SourceView.GetGap(),
      r = this.SourceView.GetShowItemNum();
    if (this.qKe(i)) {
      if (!this.GKe(i)) {
        for (; !this.GKe(i); ) (i += (h + e) * Math.ceil(r + 1)), (s += r + 1);
        for (; s >= this.RKe; ) s -= this.RKe;
      }
    } else {
      for (; !this.qKe(i); ) (i -= (h + e) * Math.ceil(r + 1)), (s -= r + 1);
      for (; s < 0; ) s = this.RKe + s;
    }
    return [i, s];
  }
  bKe(t) {
    let i = t,
      s = this.CurrentShowItemIndex;
    var h = this.SourceView.GetItemSize(),
      e = this.SourceView.GetGap(),
      r = this.SourceView.GetShowItemNum();
    if (this.qKe(i)) {
      if (!this.GKe(i))
        for (; !this.GKe(i); )
          (i += (h + e) * Math.ceil(r + 1)),
            0 === this.CurrentMoveDirection ? (s += r + 1) : (s -= r + 1);
    } else
      for (; !this.qKe(i); )
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
    this.UKe || void 0 !== t
      ? this.OnRefreshItem(t)
      : this.AKe && this.OnRefreshItem(void 0);
  }
  qKe(t) {
    var i = this.SourceView.GetItemSize(),
      s = this.SourceView.GetGap(),
      h = this.SourceView.GetShowItemNum();
    return !((i + s) * Math.ceil((h + 1) / 2) < t);
  }
  GKe(t) {
    var i = this.SourceView.GetItemSize(),
      s = this.SourceView.GetGap(),
      h = this.SourceView.GetShowItemNum();
    return !(t < -(i + s) * Math.ceil(h / 2));
  }
}
exports.AutoAttachItem = AutoAttachItem;
//# sourceMappingURL=AutoAttachItem.js.map
