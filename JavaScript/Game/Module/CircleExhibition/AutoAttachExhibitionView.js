"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoAttachExhibitionView = exports.DEFAULT_ATTACH_TIME = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
exports.DEFAULT_ATTACH_TIME = 8;
class AutoAttachExhibitionView {
  constructor(t) {
    (this.wje = void 0),
      (this.Bje = void 0),
      (this.CurrentDirection = void 0),
      (this.CreateSourceActor = void 0),
      (this.CreateSourceUiActor = void 0),
      (this.Items = new Array()),
      (this.SelectedIndex = 0),
      (this.CreateItemFunction = (t, i, s) => {}),
      (this.DragState = !1),
      (this.InertiaState = !1),
      (this.Distance = 0),
      (this.AttachTime = exports.DEFAULT_ATTACH_TIME),
      (this.ItemSizeX = 0),
      (this.ItemSizeY = 0),
      (this.Gap = 0),
      (this.ShowItemNum = 0),
      (this.DataLength = 0),
      (this.CurrentShowItemIndex = 0),
      (this.Width = 0),
      (this.Height = 0),
      (this.IEt = 0),
      (this.SupportVelocity = !0),
      (this.CurrentVelocity = 0),
      (this.VelocityDirection = 0),
      (this.VelocityMoveState = !1),
      (this.CurrentVelocityTime = 0),
      (this.VelocityFactor = 30),
      (this.BoundDistance = 0),
      (this.DebugMode = !1),
      (this.CurrentSelectState = !1),
      (this.TEt = 0),
      (this.LEt = 0),
      (this.OnPointerBeginDrag = (t) => {
        (this.DragState = !0),
          (this.InertiaState = !1),
          (this.VelocityMoveState = !1),
          (this.wje = t.GetWorldPointInPlane()),
          (this.Bje = t.GetWorldPointInPlane());
        for (let t = 0; t < this.Items.length; t++)
          this.Items[t].OnControllerDragStart();
      }),
      (this.OnPointerDrag = (t) => {
        const i = t.GetWorldPointInPlane();
        this.Bje = t.GetWorldPointInPlane();
        let s = 0;
        (s =
          this.CurrentDirection === 0 ? i.X - this.wje.X : i.Z - this.wje.Z) !==
          0 && (this.MoveItems(s), (this.wje = i));
      }),
      (this.OnPointerEndDrag = (i) => {
        for (let t = 0; t < this.Items.length; t++)
          this.Items[t].OnControllerDragEnd();
        if (((this.DragState = !1), (this.LEt = 0), this.SupportVelocity)) {
          var i = i.GetWorldPointInPlane();
          let t = 0;
          (t =
            this.CurrentDirection === 0 ? i.X - this.Bje.X : i.Z - this.Bje.Z),
            Math.abs(t) < this.VelocityFactor
              ? ((i = this.FindAutoAttachItem()),
                this.ScrollToIndex(this.AttachTime, i.ShowItemIndex))
              : ((this.VelocityMoveState = !0),
                (this.CurrentVelocity = t),
                (this.VelocityDirection = this.CurrentVelocity > 0 ? 1 : -1),
                (this.CurrentVelocityTime = 0));
        } else {
          i = this.FindAutoAttachItem();
          this.ScrollToIndex(this.AttachTime, i.ShowItemIndex);
        }
      }),
      (this.Actor = t),
      (this.ItemActor = t.GetComponentByClass(UE.UIItem.StaticClass()));
  }
  get Direction() {
    return this.CurrentDirection;
  }
  SetVelocitySupport(t) {
    this.SupportVelocity = t;
  }
  SetVelocityFactor(t) {
    this.VelocityFactor = t;
  }
  SetItemOnSelectTime(t) {
    this.IEt = t;
  }
  SetBoundDistance(t) {
    this.BoundDistance = t;
  }
  GetDataLength() {
    return this.DataLength;
  }
  Destroy() {
    this.Actor && ActorSystem_1.ActorSystem.Put(this.Actor),
      (this.Actor = void 0);
  }
  CreateItems(t, i, s, h, e) {
    this.AddDragEvent(),
      (this.CreateItemFunction = h),
      (this.CreateSourceActor = t),
      (this.CreateSourceUiActor = this.CreateSourceActor.GetComponentByClass(
        UE.UIItem.StaticClass(),
      )),
      (this.ShowItemNum = i),
      this.DEt(),
      (this.Gap = s);
  }
  DEt() {
    (this.ItemSizeX = this.CreateSourceUiActor.GetWidth()),
      (this.ItemSizeY = this.CreateSourceUiActor.GetHeight()),
      (this.Width = this.ItemActor.GetWidth()),
      (this.Height = this.ItemActor.GetHeight()),
      this.CurrentDirection === 0
        ? (this.BoundDistance = this.ItemSizeX)
        : (this.BoundDistance = this.ItemSizeY);
  }
  ReloadView(t, i) {}
  DisableDragEvent() {
    let t;
    this.Actor &&
      (t = this.Actor.GetComponentByClass(
        UE.UIDraggableComponent.StaticClass(),
      )) &&
      (t.OnPointerBeginDragCallBack.Unbind(),
      t.OnPointerDragCallBack.Unbind(),
      t.OnPointerEndDragCallBack.Unbind());
  }
  AddDragEvent() {
    let t;
    this.Actor &&
      (t = this.Actor.GetComponentByClass(
        UE.UIDraggableComponent.StaticClass(),
      )) &&
      (t.OnPointerBeginDragCallBack.Bind((t) => {
        this.OnPointerBeginDrag(t);
      }),
      t.OnPointerDragCallBack.Bind((t) => {
        this.OnPointerDrag(t);
      }),
      t.OnPointerEndDragCallBack.Bind((t) => {
        this.OnPointerEndDrag(t);
      }));
  }
  SetData(i) {
    for (let t = 0; t < this.Items.length; t++) this.Items[t].SetData(i);
  }
  InitItems() {
    for (let t = 0; t < this.Items.length; t++) this.Items[t].Init(this);
    this.RefreshItemsView();
  }
  ForceUnSelectItems() {
    for (let t = 0; t < this.Items.length; t++)
      this.Items[t].ForceUnSelectItem();
    this.CurrentSelectState = !1;
  }
  SetAttachTime(t) {
    this.AttachTime = t;
  }
  RefreshItemsView() {
    for (let t = 0; t < this.Items.length; t++) this.Items[t].RefreshItem();
  }
  FindNearestMiddleItem() {
    let h = this.Items[0];
    if (h) {
      let s = 0;
      s =
        this.CurrentDirection === 0
          ? Math.abs(this.Items[0].GetItemPositionX())
          : Math.abs(this.Items[0].GetItemPositionY());
      for (let i = 0; i < this.Items.length; i++) {
        let t = 0;
        (t =
          this.CurrentDirection === 0
            ? Math.abs(this.Items[i].GetItemPositionX())
            : Math.abs(this.Items[i].GetItemPositionY())) < s &&
          ((h = this.Items[i]), (s = t));
      }
      return h;
    }
  }
  GetItems() {
    return this.Items;
  }
  GetItemByShowIndex(t) {
    for (const i of this.Items) if (i.ShowItemIndex === t) return i;
  }
  ScrollToItem(i, s) {
    if (!this.InertiaState) {
      const h = s;
      let t = 0;
      (t =
        this.CurrentDirection === 0
          ? h.GetItemPositionX()
          : h.GetItemPositionY()),
        (this.Distance = -t);
      for (let t = 0; t < this.Items.length; t++) this.Items[t].UnSelect();
      (this.CurrentSelectState = !1),
        (this.CurrentShowItemIndex = s.ShowItemIndex),
        i === 0
          ? this.MoveItems(-t)
          : ((this.LEt = 0), (this.TEt = i), (this.InertiaState = !0));
    }
  }
  ScrollToIndex(t, i) {
    this.AttachToIndex(t, i);
  }
  AttachToIndex(t, i) {
    this.REt(t, i);
  }
  REt(i, s) {
    if (!this.InertiaState) {
      let h = this.GetShowIndexItem(s);
      if (h) this.ScrollToItem(i, h);
      else {
        for (let t = 0; t < this.Items.length; t++) this.Items[t].UnSelect();
        (this.CurrentSelectState = !1), (this.CurrentShowItemIndex = s);
        h = this.FindNearestMiddleItem();
        if (h) {
          s = s - h.ShowItemIndex;
          let t = 0;
          (t =
            this.CurrentDirection === 0
              ? (this.ItemSizeX + this.Gap) * s - h.GetItemPositionX()
              : -1 * ((this.ItemSizeY + this.Gap) * s - h.GetItemPositionY())),
            (this.Distance = -t),
            i === 0
              ? this.MoveItems(-t)
              : ((this.LEt = 0), (this.TEt = i), (this.InertiaState = !0));
        }
      }
    }
  }
  Tick(t) {
    if (this.DragState || (!this.InertiaState && !this.VelocityMoveState)) {
      if (
        this.InertiaState &&
        ((this.InertiaState = !1), (this.LEt = 0), !this.CurrentSelectState) &&
        this.IEt === 1
      )
        for (let t = 0; t < this.Items.length; t++) {
          const i = this.Items[t];
          i.ShowItemIndex !== this.CurrentShowItemIndex ||
            i.GetSelectState() ||
            (i.Select(), (this.CurrentSelectState = !0));
        }
      this.VelocityMoveState = !1;
    } else
      this.VelocityMoveState
        ? ((this.CurrentVelocity = this.ReCalculateOffset(
            this.CurrentVelocity,
          )),
          this.rWe(t))
        : this.LEt < this.TEt
          ? this.nWe()
          : (this.InertiaState = !1);
  }
  rWe(t) {
    (this.CurrentVelocityTime = this.CurrentVelocityTime + t / 100),
      this.VelocityDirection > 0
        ? (this.MoveItems(this.CurrentVelocity),
          (this.CurrentVelocity -=
            this.VelocityFactor * this.CurrentVelocityTime),
          this.CurrentVelocity <= 0 && this.EndVelocityMove())
        : this.VelocityDirection < 0 &&
          (this.MoveItems(this.CurrentVelocity),
          (this.CurrentVelocity +=
            this.VelocityFactor * this.CurrentVelocityTime),
          this.CurrentVelocity >= 0) &&
          this.EndVelocityMove();
  }
  ReCalculateOffset(t) {
    return t;
  }
  EndVelocityMove() {
    (this.VelocityMoveState = !1), (this.InertiaState = !1);
    const t = this.FindAutoAttachItem();
    this.ScrollToIndex(this.AttachTime, t.ShowItemIndex);
  }
  nWe() {
    this.MoveItems(this.Distance / this.TEt), this.LEt++;
  }
  MoveItems(i) {
    for (let t = 0; t < this.Items.length; t++) {
      const s = this.Items[t];
      s.MoveItem(i),
        this.DebugMode &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("UiCommon", 28, "Test"),
        this.CurrentSelectState ||
          this.IEt !== 0 ||
          s.ShowItemIndex !== this.CurrentShowItemIndex ||
          s.GetSelectState() ||
          (s.Select(), (this.CurrentSelectState = !0));
    }
  }
  MovingState() {
    return this.DragState || this.InertiaState;
  }
  GetShowIndexItem(i) {
    let s = void 0;
    for (let t = 0; t < this.Items.length; t++)
      if (this.Items[t].ShowItemIndex === i) {
        s = this.Items[t];
        break;
      }
    return s;
  }
  AttachItem(t) {}
  FindAutoAttachItem() {
    return this.FindNearestMiddleItem();
  }
  GetWidth() {
    return this.Width;
  }
  GetHeight() {
    return this.Height;
  }
  Clear() {
    for (let t = 0; t < this.Items.length; t++) this.Items[t].Clear();
  }
}
exports.AutoAttachExhibitionView = AutoAttachExhibitionView;
// # sourceMappingURL=AutoAttachExhibitionView.js.map
