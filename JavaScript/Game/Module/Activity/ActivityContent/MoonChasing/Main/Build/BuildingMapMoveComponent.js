"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingMapMoveComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../../Core/Common/Time"),
  MathCommon_1 = require("../../../../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../../../Global"),
  GlobalData_1 = require("../../../../../../GlobalData"),
  InputDistributeController_1 = require("../../../../../../Ui/InputDistribute/InputDistributeController"),
  LguiEventSystemManager_1 = require("../../../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  TouchFingerDefine_1 = require("../../../../../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../../../../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../../../../../Ui/UiLayer"),
  TWEEN_TIME = 2,
  DRAG_TWEEN_TIME = 0.8;
class BuildingMapMoveComponent {
  constructor(t, i = !0, s = !0, h = !1) {
    (this.xFo = 0),
      (this.IsDragging = !1),
      (this.IsTweening = !1),
      (this.TCa = void 0),
      (this.uGo = void 0),
      (this.LCa = Vector2D_1.Vector2D.Create()),
      (this.DCa = Vector2D_1.Vector2D.Create()),
      (this.ScaleStep = 0.05),
      (this.MapScaleSafeArea = { Min: 0, Max: 0 }),
      (this.HCa = 1),
      (this.PYe = Vector2D_1.Vector2D.Create()),
      (this.ACa = Vector2D_1.Vector2D.Create()),
      (this.RCa = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.UCa = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.Yjs = Vector2D_1.Vector2D.Create()),
      (this.Jjs = void 0),
      (this.Q_t = Vector2D_1.Vector2D.Create()),
      (this.cz = Vector_1.Vector.Create()),
      (this.jCa = 1),
      (this.zjs = void 0),
      (this.PointerBeginDragExtraCallBack = void 0),
      (this.PointerUpExtraCallBack = void 0),
      (this.w8i = (t) => {
        var i;
        this.IsInMultiTouch ||
          (this.xCa(),
          (i = t.pointerPosition),
          (i = this.PCa(i.X, i.Y)),
          this.LCa.DeepCopy(i),
          this.PointerBeginDragExtraCallBack?.(t));
      }),
      (this.B8i = (t) => {
        var i, s, h;
        this.IsInMultiTouch
          ? ((this.IsDragging = !1), this.DCa.Reset())
          : ((this.IsDragging = !0),
            (t = t.pointerPosition),
            (t = this.PCa(t.X, t.Y)),
            (0 ===
              (i = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(
                this.LCa,
              )).X &&
              0 === i.Y) ||
              ((s = t.X - this.LCa.X),
              (h = t.Y - this.LCa.Y),
              this.DCa.DeepCopy(i),
              this.LCa.DeepCopy(t),
              this.Q_t.FromUeVector2D(this.Jjs.GetAnchorOffset()),
              (this.Q_t.X = this.Q_t.X + s),
              (this.Q_t.Y = this.Q_t.Y + h),
              this.wCa(this.Q_t, 1)));
      }),
      (this.Ngo = (t) => {
        t &&
          !this.IsInMultiTouch &&
          this.bFo(t.pointerPosition) &&
          ((this.IsDragging = !0), (this.xFo = Time_1.Time.NowSeconds));
      }),
      (this.GFo = (t) => {
        this.IsInMultiTouch ||
          ((this.IsDragging = !1), 0 === this.DCa.X && 0 === this.DCa.Y) ||
          (this.bFo(t.pointerPosition) &&
            (this.BCa(), this.PointerUpExtraCallBack?.(t)));
      }),
      (this.jDn = (t) => {
        var t = t.scrollAxisValue;
        0 !== t &&
          (this.Yjs.Reset(),
          this.Yjs.AdditionEqual(this.Zjs()),
          (t = t * this.ScaleStep),
          this.SetScale(this.HCa + t, 0));
      }),
      (this.YFo = (t) => {
        this.Jjs.SetAnchorOffset(t);
      }),
      (this.dUa = (t, i) => {
        this.Q_t.FromUeVector2D(this.Jjs.GetAnchorOffset()),
          (this.Q_t.X = this.Q_t.X - t),
          (this.Q_t.Y = this.Q_t.Y - i),
          this.wCa(this.Q_t, 1);
      }),
      (this.eWs = Vector2D_1.Vector2D.Create()),
      (this.wFo = new Map()),
      (this.Eqt = (t, i) => {
        var s = i.TouchType;
        2 === s ? this.tWs() : 0 === s ? this.Mgt(!0, i) : this.Mgt(!1, i);
      }),
      (this.MoveSpeed = 1),
      (this.QFo = new Vector2D_1.Vector2D()),
      (this.XFo = new Vector2D_1.Vector2D()),
      (this.sS1 = Vector2D_1.Vector2D.Create()),
      (this.e3o = !1),
      (this.t3o = !1),
      (this.pp1 = !1),
      (this.i3o = (t) => {
        this.pp1 &&
          ((this.QFo.Y = t * this.MapScale * -this.MoveSpeed), (this.e3o = !0));
      }),
      (this.o3o = (t) => {
        this.pp1 &&
          ((this.XFo.X = t * this.MapScale * -this.MoveSpeed), (this.t3o = !0));
      }),
      (this.Jjs = t.GetRootComponent()),
      i &&
        (t.OnPointerBeginDragCallBack.Bind(this.w8i),
        (h ? t.OnPointerEndDragCallBack : t.OnPointerUpCallBack).Bind(this.GFo),
        t.OnPointerDragCallBack.Bind(this.B8i),
        t.OnPointerDownCallBack.Bind(this.Ngo),
        t.OnPointerCancelCallBack.Bind(this.GFo)),
      s && t.OnPointerScrollCallBack.Bind(this.jDn),
      this.Fq();
  }
  get MapScale() {
    return this.HCa;
  }
  set MapScale(t) {
    this.HCa = t;
  }
  get IsInDrag() {
    return this.IsDragging;
  }
  Fq() {
    this.bCa(), this.oRn(), this.nRn(), this.qCa(), this.rRn();
  }
  bCa() {
    this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
  }
  oRn() {
    (this.PYe.X = UiLayer_1.UiLayer.UiRootItem.GetWidth()),
      (this.PYe.Y = UiLayer_1.UiLayer.UiRootItem.GetHeight());
    var t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler(),
      i = t.ReferenceResolution.X / t.ReferenceResolution.Y,
      s = this.PYe.X / this.PYe.Y,
      h = s / i;
    (this.jCa = 1 < h ? h : i / s),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MoonChasing",
          10,
          "[MapMoveComponent]初始化Viewport",
          ["Viewport大小", this.PYe.Tuple],
          ["ReferenceResolution大小", t.ReferenceResolution],
          ["Viewport与ReferenceResolution比值", h],
          ["实际应用的比值", this.jCa],
        );
  }
  qCa() {
    var t = this.Jjs.GetWidth() * this.HCa,
      i = this.Jjs.GetHeight() * this.HCa,
      t = t < this.PYe.X ? this.PYe.X : t,
      i = i < this.PYe.Y ? this.PYe.Y : i,
      t = Math.abs(t - this.PYe.X) / 2,
      i = Math.abs(i - this.PYe.Y) / 2;
    (this.UCa.MinX = -t),
      (this.UCa.MaxX = t),
      (this.UCa.MinY = -i),
      (this.UCa.MaxY = i);
  }
  rRn() {
    var t = (this.Jjs.GetWidth() - 2 * this.ACa.X) * this.HCa,
      i = (this.Jjs.GetHeight() - 2 * this.ACa.Y) * this.HCa,
      t = t < this.PYe.X ? this.PYe.X : t,
      i = i < this.PYe.Y ? this.PYe.Y : i,
      t = Math.abs(t - this.PYe.X) / 2,
      i = Math.abs(i - this.PYe.Y) / 2;
    (this.RCa.MinX = -t),
      (this.RCa.MaxX = t),
      (this.RCa.MinY = -i),
      (this.RCa.MaxY = i);
  }
  nRn() {
    this.SetScaleSafeArea(0.5, 2), (this.ACa.X = 400), (this.ACa.Y = 300);
  }
  sRn(t) {
    (t.X = MathUtils_1.MathUtils.Clamp(t.X, this.RCa.MinX, this.RCa.MaxX)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.RCa.MinY, this.RCa.MaxY));
  }
  GCa(t) {
    (t.X = MathUtils_1.MathUtils.Clamp(t.X, this.UCa.MinX, this.UCa.MaxX)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.UCa.MinY, this.UCa.MaxY));
  }
  SetScale(t, i) {
    var s,
      t = MathUtils_1.MathUtils.Clamp(
        t,
        this.MapScaleSafeArea.Min,
        this.MapScaleSafeArea.Max,
      );
    t !== this.HCa &&
      (this.xCa(),
      (s = this.HCa),
      (this.HCa = t),
      this.qCa(),
      this.rRn(),
      this.cz.Set(t, t, t),
      this.Jjs.SetUIRelativeScale3D(this.cz.ToUeVectorOld()),
      (t = this.iWs(t, s, i)),
      this.Q_t.Reset(),
      this.Q_t.AdditionEqual(t),
      this.wCa(this.Q_t),
      this.zjs?.(i));
  }
  iWs(t, i, s) {
    var h = Vector2D_1.Vector2D.Create(this.Jjs.GetAnchorOffset());
    return 0 === s || 1 === s
      ? ((s = this.PCa(this.Yjs.X, this.Yjs.Y)).Set(
          s.X - this.PYe.X / 2,
          s.Y - this.PYe.Y / 2,
        ),
        h
          .SubtractionEqual(s)
          .MultiplyEqual(t / i)
          .AdditionEqual(s))
      : h.MultiplyEqual(t / i);
  }
  PCa(t, i) {
    var s = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    return s
      ? ((t = Vector2D_1.Vector2D.Create(t, i)),
        (i = s.ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D())),
        t.FromUeVector2D(i),
        (t.X = MathCommon_1.MathCommon.Clamp(t.X, 0, this.PYe.X)),
        (t.Y = MathCommon_1.MathCommon.Clamp(t.Y, 0, this.PYe.Y)),
        t)
      : Vector2D_1.Vector2D.Create();
  }
  EmitPointerDown() {
    this.xFo = Time_1.Time.NowSeconds;
  }
  bFo(t) {
    t = this.PCa(t.X, t.Y);
    return !(t.X < 0 || t.X > this.PYe.X || t.Y < 0 || t.Y > this.PYe.Y);
  }
  BCa() {
    var t,
      i = Time_1.Time.NowSeconds - this.xFo;
    let s = this.DCa.Size() / i;
    this.PYe.IsNearlyZero() ||
      (s = MathCommon_1.MathCommon.Clamp(s, 0, this.PYe.Size())),
      this.DCa.Normalize(0)
        ? ((i = Vector2D_1.Vector2D.Create()),
          this.DCa.Multiply(s, i),
          (t = Vector2D_1.Vector2D.Create()),
          i.Multiply(TWEEN_TIME, t),
          (i = Vector2D_1.Vector2D.Create(
            this.Jjs.GetAnchorOffset(),
          ).AdditionEqual(t)),
          this.OCa(i, 2, DRAG_TWEEN_TIME))
        : this.DCa.Reset();
  }
  xCa() {
    this.TCa && (this.TCa.Kill(), (this.TCa = void 0));
  }
  OCa(t, i = 0, s = TWEEN_TIME, h) {
    this.sRn(t),
      (this.IsTweening = !0),
      this.xCa(),
      (this.TCa = UE.LTweenBPLibrary.Vector2To(
        GlobalData_1.GlobalData.World,
        this.uGo,
        this.Jjs.GetAnchorOffset(),
        t.ToUeVector2D(!0),
        s,
        0,
        i,
      )),
      this.TCa.OnCompleteCallBack.Bind(() => {
        (this.IsTweening = !1), h?.();
      });
  }
  wCa(t, i = 0) {
    0 === i ? this.sRn(t) : 1 === i && this.GCa(t),
      this.Jjs.SetAnchorOffset(t.ToUeVector2D());
  }
  MoveToTarget(t, i = 0, s = TWEEN_TIME, h) {
    var e = t.GetAnchorOffsetX(),
      t = t.GetAnchorOffsetY();
    this.Q_t.Reset(),
      (this.Q_t.X = -e * this.MapScale),
      (this.Q_t.Y = -t * this.MapScale),
      0 !== s ? this.OCa(this.Q_t, i, s, h) : (this.wCa(this.Q_t), h?.());
  }
  Zjs() {
    var t = Global_1.Global.CharacterController;
    return t
      ? (this.Q_t.Reset(), this.Q_t.AdditionEqual(t.GetCursorPosition()))
      : (this.Q_t.Reset(), this.Q_t);
  }
  LongPressScroll(t) {
    this.Yjs.Reset(), this.SetScale(this.HCa + t, 2);
  }
  SliderScroll(t) {
    this.SetScale(t, 3);
  }
  SetChangeScaleCallback(t) {
    this.zjs = t;
  }
  SetScaleSafeArea(t, i) {
    i < t
      ? ((this.MapScaleSafeArea.Min = i * this.jCa),
        (this.MapScaleSafeArea.Max = t * this.jCa),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MoonChasing",
            10,
            "[MapMoveComponent]按照分辨率比例设置真实大小",
            ["设置最小", i],
            ["设置最大", t],
            ["真实最小", this.MapScaleSafeArea.Min],
            ["真实最大", this.MapScaleSafeArea.Max],
          ))
      : ((this.MapScaleSafeArea.Min = t * this.jCa),
        (this.MapScaleSafeArea.Max = i * this.jCa),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MoonChasing",
            10,
            "[MapMoveComponent]按照分辨率比例设置真实大小",
            ["设置最小", t],
            ["设置最大", i],
            ["真实最小", this.MapScaleSafeArea.Min],
            ["真实最大", this.MapScaleSafeArea.Max],
          ));
  }
  SetMapMoveRebound(t, i) {
    (this.ACa.X = t), (this.ACa.Y = i);
  }
  Destroy() {
    this.xCa(), (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
  }
  AddGamepadEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GamepadMoveOverScreen,
      this.dUa,
    );
  }
  RemoveGamepadEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GamepadMoveOverScreen,
      this.dUa,
    );
  }
  get IsInTouch() {
    return 0 < this.wFo.size;
  }
  get IsInMultiTouch() {
    return 1 < this.wFo.size;
  }
  Mgt(t, i) {
    var s = i.TouchId;
    t
      ? LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
          s,
        ) && this.wFo.set(s, i)
      : this.wFo.delete(s),
      this.Yjs.Reset(),
      this.wFo.forEach((t) => {
        this.eWs.Set(t.TouchPosition.X, t.TouchPosition.Y),
          this.Yjs.AdditionEqual(this.eWs);
      }),
      0 < this.wFo.size && this.Yjs.DivisionEqual(this.wFo.size);
  }
  tWs() {
    var t, i;
    this.IsInMultiTouch &&
      (({ State: t, ChangeRate: i } =
        TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(
          TouchFingerDefine_1.EFingerIndex.One,
          TouchFingerDefine_1.EFingerIndex.Two,
        )),
      t !== TouchFingerDefine_1.EFingerExpandCloseType.None) &&
      this.SetScale(this.HCa + i, 1);
  }
  BindTouch() {
    InputDistributeController_1.InputDistributeController.BindTouches(
      [
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      ],
      this.Eqt,
    );
  }
  UnbindTouch() {
    InputDistributeController_1.InputDistributeController.UnBindTouches(
      [
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      ],
      this.Eqt,
    );
  }
  GetMapItem() {
    return this.Jjs;
  }
  SwitchOnMove(t) {
    this.pp1 = t;
  }
  AddMoveListener(t = !0) {
    this.SwitchOnMove(t),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapDragMoveForward,
        this.i3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapDragMoveRight,
        this.o3o,
      );
  }
  RemoveMoveListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapDragMoveForward,
      this.i3o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MapDragMoveRight,
        this.o3o,
      );
  }
  TickMove() {
    (this.e3o || this.t3o) &&
      (this.sS1.FromUeVector2D(this.Jjs.GetAnchorOffset()),
      this.e3o && (this.sS1.AdditionEqual(this.QFo), (this.e3o = !1)),
      this.t3o && (this.sS1.AdditionEqual(this.XFo), (this.t3o = !1)),
      this.wCa(this.sS1, 0));
  }
}
exports.BuildingMapMoveComponent = BuildingMapMoveComponent;
//# sourceMappingURL=BuildingMapMoveComponent.js.map
