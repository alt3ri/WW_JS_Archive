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
      (this.jWe = !1),
      (this.DragState = !1),
      (this.VelocityMoveState = !1),
      (this.WWe = void 0),
      (this.KWe = void 0),
      (this.QWe = !0),
      (this.XWe = 0),
      (this.CurrentVelocityRunningTime = 0),
      (this.$We = void 0),
      (this.YWe = void 0),
      (this.BoundaryCurve = void 0),
      (this.JWe = 0),
      (this.zWe = 0),
      (this.ZWe = 0),
      (this.eKe = 0),
      (this.tKe = 0),
      (this.iKe = new Map()),
      (this.Items = new Array()),
      (this.AttachDirection = void 0),
      (this.CurrentSelectState = !1),
      (this.oKe = 0),
      (this.rKe = 0),
      (this.nKe = 1),
      (this.sKe = TickSystem_1.TickSystem.InvalidId),
      (this.aKe = MOVEMULFACTOR),
      (this.hKe = DEFALTAUDIO),
      (this.lKe = void 0),
      (this.CreateItemFunction = (t, i, s) => {}),
      (this._Ke = !1),
      (this.uKe = void 0),
      (this.r6 = (t) => {
        if (
          (this.cKe &&
            ((this.mKe += 1), 1 <= this.mKe) &&
            ((this.cKe = !1), this.dKe(this.CKe)),
          this.DragState || (!this.InertiaState && !this.VelocityMoveState))
        ) {
          if (
            this.jWe &&
            ((this.jWe = !1), (this.rKe = 0), !this.CurrentSelectState) &&
            1 === this.nKe
          ) {
            var i = this.Items.length;
            for (let t = 0; t < i; t++) {
              var s = this.Items[t];
              s.GetCurrentShowItemIndex() !== this.oKe ||
                s.GetSelectedState() ||
                (s.Select(), (this.CurrentSelectState = !0));
            }
          }
          this.VelocityMoveState = !1;
        } else
          this.VelocityMoveState
            ? this.gKe(t)
            : this.rKe < this.zWe
              ? this.fKe(t)
              : ((this.jWe = !0), (this.InertiaState = !1));
        this._Ke !== this.MovingState() &&
          ((this._Ke = this.MovingState()), this._Ke) &&
          this.uKe?.();
      }),
      (this.pKe = (t) => {
        (this.DragState = !0),
          (this.InertiaState = !1),
          (this.jWe = !1),
          (this.VelocityMoveState = !1),
          (this.WWe = t.GetWorldPointInPlane()),
          (this.KWe = t.GetWorldPointInPlane());
        var i = this.Items.length;
        for (let t = 0; t < i; t++) this.Items[t].OnControllerDragStart();
        this.uKe?.();
      }),
      (this.mKe = 0),
      (this.cKe = !1),
      (this.CKe = void 0),
      (this.vKe = (t) => {
        (this.mKe = 0), (this.cKe = !0);
        var t = (this.CKe = t).GetWorldPointInPlane(),
          i = this.MKe(t) - this.MKe(this.WWe);
        0 != i &&
          (this.SetMoveTypeOffset(1, i),
          (i = this.RecalculateMoveOffset(i)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCommon", 28, "OnpointerDrag", ["result", i]),
          this.EKe(i),
          (this.WWe = t));
      }),
      (this.SKe = (i) => {
        var s = this.Items.length;
        for (let t = 0; t < s; t++) this.Items[t].OnControllerDragEnd();
        if (
          ((this.DragState = !1),
          (this.rKe = 0),
          (this.eKe = 0),
          (this.ZWe = 0),
          this.QWe)
        ) {
          var i = i.GetWorldPointInPlane();
          let t = 0;
          this.KWe && (t = (this.MKe(i) - this.MKe(this.KWe)) * this.aKe),
            Math.abs(t) < this.tKe
              ? ((i = this.FindAutoAttachItem()),
                this.AttachToIndex(i.GetCurrentShowItemIndex()))
              : ((this.VelocityMoveState = !0),
                this.SetMoveTypeOffset(0, t),
                (this.XWe = 0 < t ? 1 : -1),
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
      this.iKe.set(0, 0),
      this.iKe.set(1, 0),
      (this.sKe = TickSystem_1.TickSystem.Add(
        this.r6,
        "AutoAttachBaseView",
        0,
        !0,
      ).Id),
      (this.$We = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        AutoAttachDefine_1.VELOCITY_CURVE_PATH,
        UE.CurveFloat,
      )),
      (this.YWe = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        AutoAttachDefine_1.INERTIA_CURVE_PATH,
        UE.CurveFloat,
      )),
      (this.BoundaryCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        AutoAttachDefine_1.BOUNDARY_CURVE_PATH,
        UE.CurveFloat,
      )),
      (this.JWe =
        ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachVelocityTime()),
      (this.zWe =
        ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachInertiaTime()),
      (this._Ke = !1);
  }
  SetItemSelectMode(t) {
    this.nKe = t;
  }
  SetMoveMultiFactor(t) {
    this.aKe = t;
  }
  SetDragBeginCallback(t) {
    this.uKe = t;
  }
  SetAudioEvent(t) {
    this.hKe = t;
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
      (this.ShowItemNum = this.yKe()),
      (this.tKe = (this.GetItemSize() + this.Gap) / 2),
      this.IKe();
  }
  SetMoveBoundary(t) {
    this.MoveBoundary = t;
  }
  GetCurrentMoveDirection() {
    return this.AttachDirection;
  }
  IKe() {
    this.MoveBoundary = this.GetItemSize();
  }
  SetBoundDistance(t) {
    this.MoveBoundary = t;
  }
  yKe() {
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
        this.pKe(t);
      }),
      t.OnPointerDragCallBack.Bind((t) => {
        this.vKe(t);
      }),
      t.OnPointerEndDragCallBack.Bind((t) => {
        this.SKe(t);
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
  gKe(t) {
    var i = this.GetMoveTypeOffset(0),
      s = i / this.JWe,
      h =
        ((this.CurrentVelocityRunningTime =
          this.CurrentVelocityRunningTime + t),
        this.CurrentVelocityRunningTime / this.JWe),
      s = s * this.GetCurveValue(this.$We, (h = 1 < h ? 1 : h)) * t;
    let e = this.RecalculateMoveOffset(s);
    Math.abs(e) < ENDMOVEFLOAT && (e = 0);
    s = this.eKe + e;
    Math.abs(s) > Math.abs(i) && (e = i - this.eKe),
      this.EKe(e),
      (this.eKe += e),
      0 < this.XWe
        ? e <= 0 && this.TKe()
        : this.XWe < 0 && 0 <= e && this.TKe(),
      1 <= h &&
        (Math.abs(this.eKe) < Math.abs(i)
          ? (this.CurrentVelocityRunningTime -= t)
          : this.TKe());
  }
  fKe(t) {
    var i = this.GetMoveTypeOffset(1),
      s = i / this.zWe,
      h = ((this.rKe = this.rKe + t), this.rKe / this.zWe);
    let e = s * this.GetCurveValue(this.YWe, (h = 1 < h ? 1 : h)) * t;
    s = this.ZWe + e;
    Math.abs(s) > Math.abs(i) && (e = i - this.ZWe),
      this.EKe(e),
      (this.ZWe += e),
      1 <= h && Math.abs(this.ZWe) < Math.abs(i) && (this.rKe -= t);
  }
  GetCurveValue(t, i) {
    return t.GetFloatValue(i);
  }
  TKe() {
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
      (this.oKe = t.GetCurrentShowItemIndex()),
      i
        ? (this.SetMoveTypeOffset(1, -s),
          (t = this.RecalculateMoveOffset(-s)),
          this.EKe(t, i))
        : ((this.rKe = 0), (this.InertiaState = !0)));
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
          (this.oKe = t),
          (s = this.FindNearestMiddleItem()) &&
            ((t = t - s.GetCurrentShowItemIndex()),
            (t =
              this.LKe() * (this.GetItemSize() + this.Gap) * t -
              s.GetCurrentPosition()),
            this.SetMoveTypeOffset(1, -t),
            i
              ? (this.SetMoveTypeOffset(1, -t),
                (s = this.RecalculateMoveOffset(-t)),
                this.EKe(s, i))
              : ((this.rKe = 0), (this.InertiaState = !0)))));
  }
  LKe() {
    return 0 === this.AttachDirection ? 1 : -1;
  }
  GetCurrentSelectIndex() {
    return this.oKe;
  }
  MovingState() {
    return this.DragState || this.InertiaState;
  }
  dKe(t) {
    this.KWe = t.GetWorldPointInPlane();
  }
  MKe(t) {
    return 0 === this.AttachDirection ? t.X : t.Z;
  }
  GetMoveTypeOffset(t) {
    return this.iKe.get(t);
  }
  SetMoveTypeOffset(t, i) {
    this.iKe.set(t, i), 1 === t && (this.ZWe = 0);
  }
  EKe(i, s = !1) {
    let h = VERYBIGDISTANCE,
      e = void 0;
    var r = this.Items.length;
    for (let t = 0; t < r; t++) {
      var o = this.Items[t],
        a =
          (o.MoveItem(i),
          ((this.CurrentSelectState || 0 !== this.nKe) && !s) ||
            o.GetCurrentShowItemIndex() !== this.oKe ||
            o.GetSelectedState() ||
            (o.Select(), (this.CurrentSelectState = !0)),
          o.GetCurrentMovePercentage()),
        a = Math.abs(a - DISTANCETOMIDDLE);
      a < h && ((h = a), (e = o.GetItemIndex()));
    }
    this.lKe !== e &&
      ((this.lKe = e), s || AudioSystem_1.AudioSystem.PostEvent(this.hKe));
  }
  Clear() {
    this.Items.forEach((t) => {
      t.Destroy();
    }),
      (this.Items = []),
      this.sKe !== TickSystem_1.TickSystem.InvalidId &&
        TickSystem_1.TickSystem.Remove(this.sKe);
  }
}
exports.AutoAttachBaseView = AutoAttachBaseView;
//# sourceMappingURL=AutoAttachBaseView.js.map
