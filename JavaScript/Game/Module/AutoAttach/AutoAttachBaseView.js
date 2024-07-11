"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoAttachBaseView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  AutoAttachDefine_1 = require("./AutoAttachDefine"),
  ENDMOVEFLOAT = 0.01,
  MOVEMULFACTOR = 5,
  VERYBIGDISTANCE = 99999,
  DISTANCETOMIDDLE = 0.5,
  DEFALTAUDIO = "ui_common_picker_tick";
class AutoAttachBaseView {
  constructor(t) {
    (this.SourceActor = void 0),
      (this.SourceItem = void 0),
      (this.SourceItemHeight = 0),
      (this.SourceItemWidth = 0),
      (this.ControllerActor = void 0),
      (this.ControllerItem = void 0),
      (this.ControllerHeight = 0),
      (this.ControllerWidth = 0),
      (this.Gap = 0),
      (this.ShowItemNum = 0),
      (this.DataLength = 0),
      (this.MoveBoundary = 0),
      (this.InertiaState = !1),
      (this.xje = !1),
      (this.DragState = !1),
      (this.VelocityMoveState = !1),
      (this.wje = void 0),
      (this.Bje = void 0),
      (this.bje = !0),
      (this.qje = 0),
      (this.CurrentVelocityRunningTime = 0),
      (this.Gje = void 0),
      (this.Nje = void 0),
      (this.BoundaryCurve = void 0),
      (this.Oje = 0),
      (this.kje = 0),
      (this.Fje = 0),
      (this.Vje = 0),
      (this.Hje = 0),
      (this.jje = new Map()),
      (this.Items = new Array()),
      (this.AttachDirection = void 0),
      (this.CurrentSelectState = !1),
      (this.Wje = 0),
      (this.Kje = 0),
      (this.Qje = 1),
      (this.Xje = TickSystem_1.TickSystem.InvalidId),
      (this.$je = MOVEMULFACTOR),
      (this.Yje = DEFALTAUDIO),
      (this.Jje = void 0),
      (this.CreateItemFunction = (t, i, s) => {}),
      (this.zje = !1),
      (this.Zje = void 0),
      (this.r6 = (t) => {
        if (
          (this.eWe &&
            ((this.tWe += 1), 1 <= this.tWe) &&
            ((this.eWe = !1), this.iWe(this.oWe)),
          this.DragState || (!this.InertiaState && !this.VelocityMoveState))
        ) {
          if (
            this.xje &&
            ((this.xje = !1), (this.Kje = 0), !this.CurrentSelectState) &&
            1 === this.Qje
          ) {
            var i = this.Items.length;
            for (let t = 0; t < i; t++) {
              var s = this.Items[t];
              s.GetCurrentShowItemIndex() !== this.Wje ||
                s.GetSelectedState() ||
                (s.Select(), (this.CurrentSelectState = !0));
            }
          }
          this.VelocityMoveState = !1;
        } else
          this.VelocityMoveState
            ? this.rWe(t)
            : this.Kje < this.kje
              ? this.nWe(t)
              : ((this.xje = !0), (this.InertiaState = !1));
        this.zje !== this.MovingState() &&
          ((this.zje = this.MovingState()), this.zje) &&
          this.Zje?.();
      }),
      (this.sWe = (t) => {
        (this.DragState = !0),
          (this.InertiaState = !1),
          (this.xje = !1),
          (this.VelocityMoveState = !1),
          (this.wje = t.GetWorldPointInPlane()),
          (this.Bje = t.GetWorldPointInPlane());
        var i = this.Items.length;
        for (let t = 0; t < i; t++) this.Items[t].OnControllerDragStart();
        this.Zje?.();
      }),
      (this.tWe = 0),
      (this.eWe = !1),
      (this.oWe = void 0),
      (this.aWe = (t) => {
        (this.tWe = 0), (this.eWe = !0);
        var t = (this.oWe = t).GetWorldPointInPlane(),
          i = this.hWe(t) - this.hWe(this.wje);
        0 != i &&
          (this.SetMoveTypeOffset(1, i),
          (i = this.RecalculateMoveOffset(i)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCommon", 28, "OnpointerDrag", ["result", i]),
          this.lWe(i),
          (this.wje = t));
      }),
      (this._We = (i) => {
        var s = this.Items.length;
        for (let t = 0; t < s; t++) this.Items[t].OnControllerDragEnd();
        if (
          ((this.DragState = !1),
          (this.Kje = 0),
          (this.Vje = 0),
          (this.Fje = 0),
          this.bje)
        ) {
          var i = i.GetWorldPointInPlane();
          let t = 0;
          this.Bje && (t = (this.hWe(i) - this.hWe(this.Bje)) * this.$je),
            Math.abs(t) < this.Hje
              ? ((i = this.FindAutoAttachItem()),
                this.AttachToIndex(i.GetCurrentShowItemIndex()))
              : ((this.VelocityMoveState = !0),
                this.SetMoveTypeOffset(0, t),
                (this.qje = 0 < t ? 1 : -1),
                (this.CurrentVelocityRunningTime = 0));
        } else {
          i = this.FindAutoAttachItem();
          this.AttachToIndex(i.GetCurrentShowItemIndex());
        }
      }),
      (this.ControllerActor = t),
      (this.ControllerItem = t.GetComponentByClass(UE.UIItem.StaticClass())),
      (this.ControllerHeight = this.ControllerItem.Height),
      (this.ControllerWidth = this.ControllerItem.Width),
      this.jje.set(0, 0),
      this.jje.set(1, 0),
      (this.Xje = TickSystem_1.TickSystem.Add(
        this.r6,
        "AutoAttachBaseView",
        0,
        !0,
      ).Id),
      (this.Gje = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        AutoAttachDefine_1.VELOCITY_CURVE_PATH,
        UE.CurveFloat,
      )),
      (this.Nje = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        AutoAttachDefine_1.INERTIA_CURVE_PATH,
        UE.CurveFloat,
      )),
      (this.BoundaryCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        AutoAttachDefine_1.BOUNDARY_CURVE_PATH,
        UE.CurveFloat,
      )),
      (this.Oje =
        ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachVelocityTime()),
      (this.kje =
        ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachInertiaTime()),
      (this.zje = !1);
  }
  SetItemSelectMode(t) {
    this.Qje = t;
  }
  SetMoveMultiFactor(t) {
    this.$je = t;
  }
  SetDragBeginCallback(t) {
    this.Zje = t;
  }
  SetAudioEvent(t) {
    this.Yje = t;
  }
  IsVelocityMoveState() {
    return this.VelocityMoveState;
  }
  CreateItems(t, i, s, h = 0) {
    this.EnableDragEvent(),
      (this.CreateItemFunction = s),
      (this.SourceActor = t),
      (this.SourceItem = this.SourceActor.GetComponentByClass(
        UE.UIItem.StaticClass(),
      )),
      (this.Gap = i),
      (this.AttachDirection = h),
      (this.SourceItemHeight = this.SourceItem.Height),
      (this.SourceItemWidth = this.SourceItem.Width),
      (this.ShowItemNum = this.uWe()),
      (this.Hje = (this.GetItemSize() + this.Gap) / 2),
      this.cWe();
  }
  SetMoveBoundary(t) {
    this.MoveBoundary = t;
  }
  GetCurrentMoveDirection() {
    return this.AttachDirection;
  }
  cWe() {
    this.MoveBoundary = this.GetItemSize();
  }
  SetBoundDistance(t) {
    this.MoveBoundary = t;
  }
  uWe() {
    let t = 0;
    t =
      0 === this.AttachDirection ? this.ControllerWidth : this.ControllerHeight;
    var i = this.GetItemSize() + this.Gap,
      i = Math.ceil(t / i);
    return i % 2 == 0 ? i - 1 : i;
  }
  EnableDragEvent() {
    var t;
    this.ControllerActor &&
      (t = this.ControllerActor.GetComponentByClass(
        UE.UIDraggableComponent.StaticClass(),
      )) &&
      (t.OnPointerBeginDragCallBack.Bind((t) => {
        this.sWe(t);
      }),
      t.OnPointerDragCallBack.Bind((t) => {
        this.aWe(t);
      }),
      t.OnPointerEndDragCallBack.Bind((t) => {
        this._We(t);
      }),
      t.NavigateToPrevDelegate.Bind(() => {
        this.AttachToNextItem(-1);
      }),
      t.NavigateToNextDelegate.Bind(() => {
        this.AttachToNextItem(1);
      }));
  }
  DisableDragEvent() {
    var t;
    this.ControllerActor &&
      (t = this.ControllerActor.GetComponentByClass(
        UE.UIDraggableComponent.StaticClass(),
      )) &&
      (t.OnPointerBeginDragCallBack.Unbind(),
      t.OnPointerDragCallBack.Unbind(),
      t.OnPointerEndDragCallBack.Unbind(),
      t.NavigateToPrevDelegate.Unbind(),
      t.NavigateToNextDelegate.Unbind());
  }
  GetGap() {
    return this.Gap;
  }
  GetItemSize() {
    let t = 0;
    return (t =
      0 === this.AttachDirection
        ? this.SourceItemWidth
        : this.SourceItemHeight);
  }
  GetViewSize() {
    let t = 0;
    return (t =
      0 === this.AttachDirection
        ? this.ControllerWidth
        : this.ControllerHeight);
  }
  rWe(t) {
    var i = this.GetMoveTypeOffset(0),
      s = i / this.Oje,
      h =
        ((this.CurrentVelocityRunningTime =
          this.CurrentVelocityRunningTime + t),
        this.CurrentVelocityRunningTime / this.Oje),
      s = s * this.GetCurveValue(this.Gje, (h = 1 < h ? 1 : h)) * t;
    let e = this.RecalculateMoveOffset(s);
    Math.abs(e) < ENDMOVEFLOAT && (e = 0);
    s = this.Vje + e;
    Math.abs(s) > Math.abs(i) && (e = i - this.Vje),
      this.lWe(e),
      (this.Vje += e),
      0 < this.qje
        ? e <= 0 && this.mWe()
        : this.qje < 0 && 0 <= e && this.mWe(),
      1 <= h &&
        (Math.abs(this.Vje) < Math.abs(i)
          ? (this.CurrentVelocityRunningTime -= t)
          : this.mWe());
  }
  nWe(t) {
    var i = this.GetMoveTypeOffset(1),
      s = i / this.kje,
      h = ((this.Kje = this.Kje + t), this.Kje / this.kje);
    let e = s * this.GetCurveValue(this.Nje, (h = 1 < h ? 1 : h)) * t;
    s = this.Fje + e;
    Math.abs(s) > Math.abs(i) && (e = i - this.Fje),
      this.lWe(e),
      (this.Fje += e),
      1 <= h && Math.abs(this.Fje) < Math.abs(i) && (this.Kje -= t);
  }
  GetCurveValue(t, i) {
    return t.GetFloatValue(i);
  }
  mWe() {
    (this.VelocityMoveState = !1), (this.InertiaState = !1);
    var t = this.FindAutoAttachItem();
    this.ScrollToItem(t);
  }
  ReloadView(t, i) {
    (this.DataLength = t), this.ReloadItems(t, i);
  }
  GetShowItemNum() {
    return this.ShowItemNum;
  }
  GetDataLength() {
    return this.DataLength;
  }
  RefreshItems() {
    var i = this.Items.length;
    for (let t = 0; t < i; t++) this.Items[t].RefreshItem();
  }
  FindNearestMiddleItem() {
    let s = this.Items[0];
    if (s) {
      let i = 0;
      i = Math.abs(this.Items[0].GetCurrentPosition());
      var h = this.Items.length;
      for (let t = 0; t < h; t++) {
        var e;
        (e = Math.abs(this.Items[t].GetCurrentPosition())) < i &&
          ((s = this.Items[t]), (i = e));
      }
      return s;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiCommon", 28, "列表没有数据，找不到中间物体");
  }
  GetItems() {
    return this.Items;
  }
  GetShowIndexItem(i) {
    let s = void 0;
    var h = this.Items.length;
    for (let t = 0; t < h; t++)
      if (this.Items[t].GetCurrentShowItemIndex() === i) {
        s = this.Items[t];
        break;
      }
    return s;
  }
  GetItemByShowIndex(t) {
    for (const i of this.Items) if (i.GetCurrentShowItemIndex() === t) return i;
  }
  ForceUnSelectItems() {
    var i = this.Items.length;
    for (let t = 0; t < i; t++) this.Items[t].ForceUnSelectItem();
    this.CurrentSelectState = !1;
  }
  ScrollToItem(t, i = !1) {
    var s;
    this.InertiaState ||
      ((s = t.GetCurrentPosition()),
      this.SetMoveTypeOffset(1, -s),
      this.ForceUnSelectItems(),
      (this.Wje = t.GetCurrentShowItemIndex()),
      i
        ? (this.SetMoveTypeOffset(1, -s),
          (t = this.RecalculateMoveOffset(-s)),
          this.lWe(t, i))
        : ((this.Kje = 0), (this.InertiaState = !0)));
  }
  AttachToNextItem(t) {
    t = this.FindNextDirectionItem(t);
    t && this.AttachToIndex(t.GetCurrentShowItemIndex());
  }
  AttachToIndex(t, i = !1) {
    var s;
    this.InertiaState ||
      ((s = this.GetShowIndexItem(t))
        ? this.ScrollToItem(s, i)
        : (this.ForceUnSelectItems(),
          (this.Wje = t),
          (s = this.FindNearestMiddleItem()) &&
            ((t = t - s.GetCurrentShowItemIndex()),
            (t =
              this.dWe() * (this.GetItemSize() + this.Gap) * t -
              s.GetCurrentPosition()),
            this.SetMoveTypeOffset(1, -t),
            i
              ? (this.SetMoveTypeOffset(1, -t),
                (s = this.RecalculateMoveOffset(-t)),
                this.lWe(s, i))
              : ((this.Kje = 0), (this.InertiaState = !0)))));
  }
  dWe() {
    return 0 === this.AttachDirection ? 1 : -1;
  }
  GetCurrentSelectIndex() {
    return this.Wje;
  }
  MovingState() {
    return this.DragState || this.InertiaState;
  }
  iWe(t) {
    this.Bje = t.GetWorldPointInPlane();
  }
  hWe(t) {
    return 0 === this.AttachDirection ? t.X : t.Z;
  }
  GetMoveTypeOffset(t) {
    return this.jje.get(t);
  }
  SetMoveTypeOffset(t, i) {
    this.jje.set(t, i), 1 === t && (this.Fje = 0);
  }
  lWe(i, s = !1) {
    let h = VERYBIGDISTANCE,
      e = void 0;
    var r = this.Items.length;
    for (let t = 0; t < r; t++) {
      var o = this.Items[t],
        a =
          (o.MoveItem(i),
          ((this.CurrentSelectState || 0 !== this.Qje) && !s) ||
            o.GetCurrentShowItemIndex() !== this.Wje ||
            o.GetSelectedState() ||
            (o.Select(), (this.CurrentSelectState = !0)),
          o.GetCurrentMovePercentage()),
        a = Math.abs(a - DISTANCETOMIDDLE);
      a < h && ((h = a), (e = o.GetItemIndex()));
    }
    this.Jje !== e &&
      ((this.Jje = e), s || AudioSystem_1.AudioSystem.PostEvent(this.Yje));
  }
  Clear() {
    this.Items.forEach((t) => {
      t.Destroy();
    }),
      (this.Items = []),
      this.Xje !== TickSystem_1.TickSystem.InvalidId &&
        TickSystem_1.TickSystem.Remove(this.Xje);
  }
}
exports.AutoAttachBaseView = AutoAttachBaseView;
//# sourceMappingURL=AutoAttachBaseView.js.map
