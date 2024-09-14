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
  constructor(t, i = !0, s = !0) {
    (this.xFo = 0),
      (this.IsDragging = !1),
      (this.IsTweening = !1),
      (this.ICa = void 0),
      (this.uGo = void 0),
      (this.TCa = Vector2D_1.Vector2D.Create()),
      (this.LCa = Vector2D_1.Vector2D.Create()),
      (this.ScaleStep = 0.05),
      (this.MapScaleSafeArea = { Min: 0, Max: 0 }),
      (this.VCa = 1),
      (this.PYe = Vector2D_1.Vector2D.Create()),
      (this.DCa = Vector2D_1.Vector2D.Create()),
      (this.ACa = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.RCa = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.Yjs = Vector2D_1.Vector2D.Create()),
      (this.Jjs = void 0),
      (this.Q_t = Vector2D_1.Vector2D.Create()),
      (this.cz = Vector_1.Vector.Create()),
      (this.HCa = 1),
      (this.zjs = void 0),
      (this.w8i = (t) => {
        this.IsInMultiTouch ||
          (this.UCa(),
          (t = t.pointerPosition),
          (t = this.xCa(t.X, t.Y)),
          this.TCa.DeepCopy(t));
      }),
      (this.B8i = (t) => {
        var i, s, h;
        this.IsInMultiTouch
          ? ((this.IsDragging = !1), this.LCa.Reset())
          : ((this.IsDragging = !0),
            (t = t.pointerPosition),
            (t = this.xCa(t.X, t.Y)),
            (0 ===
              (i = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(
                this.TCa,
              )).X &&
              0 === i.Y) ||
              ((s = t.X - this.TCa.X),
              (h = t.Y - this.TCa.Y),
              this.LCa.DeepCopy(i),
              this.TCa.DeepCopy(t),
              this.Q_t.FromUeVector2D(this.Jjs.GetAnchorOffset()),
              (this.Q_t.X = this.Q_t.X + s),
              (this.Q_t.Y = this.Q_t.Y + h),
              this.PCa(this.Q_t, 1)));
      }),
      (this.Ngo = (t) => {
        t &&
          !this.IsInMultiTouch &&
          this.bFo(t.pointerPosition) &&
          ((this.IsDragging = !0), (this.xFo = Time_1.Time.NowSeconds));
      }),
      (this.GFo = (t) => {
        this.IsInMultiTouch ||
          ((this.IsDragging = !1), 0 === this.LCa.X && 0 === this.LCa.Y) ||
          (this.bFo(t.pointerPosition) && this.wCa());
      }),
      (this.jDn = (t) => {
        var t = t.scrollAxisValue;
        0 !== t &&
          (this.Yjs.Reset(),
          this.Yjs.AdditionEqual(this.Zjs()),
          (t = t * this.ScaleStep),
          this.SetScale(this.VCa + t, 0));
      }),
      (this.YFo = (t) => {
        this.Jjs.SetAnchorOffset(t);
      }),
      (this._Ua = (t, i) => {
        this.Q_t.FromUeVector2D(this.Jjs.GetAnchorOffset()),
          (this.Q_t.X = this.Q_t.X - t),
          (this.Q_t.Y = this.Q_t.Y - i),
          this.PCa(this.Q_t, 1);
      }),
      (this.eWs = Vector2D_1.Vector2D.Create()),
      (this.wFo = new Map()),
      (this.Eqt = (t, i) => {
        var s = i.TouchType;
        2 === s ? this.tWs() : 0 === s ? this.Mgt(!0, i) : this.Mgt(!1, i);
      }),
      (this.Jjs = t.GetRootComponent()),
      i &&
        (t.OnPointerBeginDragCallBack.Bind(this.w8i),
        t.OnPointerDragCallBack.Bind(this.B8i),
        t.OnPointerDownCallBack.Bind(this.Ngo),
        t.OnPointerCancelCallBack.Bind(this.GFo),
        t.OnPointerUpCallBack.Bind(this.GFo)),
      s && t.OnPointerScrollCallBack.Bind(this.jDn),
      this.Fq();
  }
  get MapScale() {
    return this.VCa;
  }
  set MapScale(t) {
    this.VCa = t;
  }
  Fq() {
    this.BCa(), this.oRn(), this.nRn(), this.bCa(), this.rRn();
  }
  BCa() {
    this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
  }
  oRn() {
    (this.PYe.X = UiLayer_1.UiLayer.UiRootItem.GetWidth()),
      (this.PYe.Y = UiLayer_1.UiLayer.UiRootItem.GetHeight());
    var t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler(),
      i = t.ReferenceResolution.X / t.ReferenceResolution.Y,
      s = this.PYe.X / this.PYe.Y,
      h = s / i;
    (this.HCa = 1 < h ? h : i / s),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MoonChasing",
          11,
          "[MapMoveComponent]初始化Viewport",
          ["Viewport大小", this.PYe.Tuple],
          ["ReferenceResolution大小", t.ReferenceResolution],
          ["Viewport与ReferenceResolution比值", h],
          ["实际应用的比值", this.HCa],
        );
  }
  bCa() {
    var t = this.Jjs.GetWidth() * this.VCa,
      i = this.Jjs.GetHeight() * this.VCa,
      t = t < this.PYe.X ? this.PYe.X : t,
      i = i < this.PYe.Y ? this.PYe.Y : i,
      t = Math.abs(t - this.PYe.X) / 2,
      i = Math.abs(i - this.PYe.Y) / 2;
    (this.RCa.MinX = -t),
      (this.RCa.MaxX = t),
      (this.RCa.MinY = -i),
      (this.RCa.MaxY = i);
  }
  rRn() {
    var t = (this.Jjs.GetWidth() - 2 * this.DCa.X) * this.VCa,
      i = (this.Jjs.GetHeight() - 2 * this.DCa.Y) * this.VCa,
      t = t < this.PYe.X ? this.PYe.X : t,
      i = i < this.PYe.Y ? this.PYe.Y : i,
      t = Math.abs(t - this.PYe.X) / 2,
      i = Math.abs(i - this.PYe.Y) / 2;
    (this.ACa.MinX = -t),
      (this.ACa.MaxX = t),
      (this.ACa.MinY = -i),
      (this.ACa.MaxY = i);
  }
  nRn() {
    this.SetScaleSafeArea(0.5, 2), (this.DCa.X = 400), (this.DCa.Y = 300);
  }
  sRn(t) {
    (t.X = MathUtils_1.MathUtils.Clamp(t.X, this.ACa.MinX, this.ACa.MaxX)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.ACa.MinY, this.ACa.MaxY));
  }
  qCa(t) {
    (t.X = MathUtils_1.MathUtils.Clamp(t.X, this.RCa.MinX, this.RCa.MaxX)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.RCa.MinY, this.RCa.MaxY));
  }
  SetScale(t, i) {
    var s,
      t = MathUtils_1.MathUtils.Clamp(
        t,
        this.MapScaleSafeArea.Min,
        this.MapScaleSafeArea.Max,
      );
    t !== this.VCa &&
      (this.UCa(),
      (s = this.VCa),
      (this.VCa = t),
      this.bCa(),
      this.rRn(),
      this.cz.Set(t, t, t),
      this.Jjs.SetUIRelativeScale3D(this.cz.ToUeVector()),
      (t = this.iWs(t, s, i)),
      this.Q_t.Reset(),
      this.Q_t.AdditionEqual(t),
      this.PCa(this.Q_t),
      this.zjs?.(i));
  }
  iWs(t, i, s) {
    var h = Vector2D_1.Vector2D.Create(this.Jjs.GetAnchorOffset());
    return 0 === s || 1 === s
      ? ((s = this.xCa(this.Yjs.X, this.Yjs.Y)).Set(
          s.X - this.PYe.X / 2,
          s.Y - this.PYe.Y / 2,
        ),
        h
          .SubtractionEqual(s)
          .MultiplyEqual(t / i)
          .AdditionEqual(s))
      : h.MultiplyEqual(t / i);
  }
  xCa(t, i) {
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
  bFo(t) {
    t = this.xCa(t.X, t.Y);
    return !(t.X < 0 || t.X > this.PYe.X || t.Y < 0 || t.Y > this.PYe.Y);
  }
  wCa() {
    var t,
      i = Time_1.Time.NowSeconds - this.xFo;
    let s = this.LCa.Size() / i;
    this.PYe.IsNearlyZero() ||
      (s = MathCommon_1.MathCommon.Clamp(s, 0, this.PYe.Size())),
      this.LCa.Normalize(0)
        ? ((i = Vector2D_1.Vector2D.Create()),
          this.LCa.Multiply(s, i),
          (t = Vector2D_1.Vector2D.Create()),
          i.Multiply(TWEEN_TIME, t),
          (i = Vector2D_1.Vector2D.Create(
            this.Jjs.GetAnchorOffset(),
          ).AdditionEqual(t)),
          this.GCa(i, 2, DRAG_TWEEN_TIME))
        : this.LCa.Reset();
  }
  UCa() {
    this.ICa && (this.ICa.Kill(), (this.ICa = void 0));
  }
  GCa(t, i = 0, s = TWEEN_TIME) {
    this.sRn(t),
      (this.IsTweening = !0),
      this.UCa(),
      (this.ICa = UE.LTweenBPLibrary.Vector2To(
        GlobalData_1.GlobalData.World,
        this.uGo,
        this.Jjs.GetAnchorOffset(),
        t.ToUeVector2D(!0),
        s,
        0,
        i,
      )),
      this.ICa.OnCompleteCallBack.Bind(() => {
        this.IsTweening = !1;
      });
  }
  PCa(t, i = 0) {
    0 === i ? this.sRn(t) : 1 === i && this.qCa(t),
      this.Jjs.SetAnchorOffset(t.ToUeVector2D());
  }
  Zjs() {
    var t = Global_1.Global.CharacterController;
    return t
      ? (this.Q_t.Reset(), this.Q_t.AdditionEqual(t.GetCursorPosition()))
      : (this.Q_t.Reset(), this.Q_t);
  }
  LongPressScroll(t) {
    this.Yjs.Reset(), this.SetScale(this.VCa + t, 2);
  }
  SliderScroll(t) {
    this.SetScale(t, 3);
  }
  SetChangeScaleCallback(t) {
    this.zjs = t;
  }
  SetScaleSafeArea(t, i) {
    i < t
      ? ((this.MapScaleSafeArea.Min = i * this.HCa),
        (this.MapScaleSafeArea.Max = t * this.HCa),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MoonChasing",
            11,
            "[MapMoveComponent]按照分辨率比例设置真实大小",
            ["设置最小", i],
            ["设置最大", t],
            ["真实最小", this.MapScaleSafeArea.Min],
            ["真实最大", this.MapScaleSafeArea.Max],
          ))
      : ((this.MapScaleSafeArea.Min = t * this.HCa),
        (this.MapScaleSafeArea.Max = i * this.HCa),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MoonChasing",
            11,
            "[MapMoveComponent]按照分辨率比例设置真实大小",
            ["设置最小", t],
            ["设置最大", i],
            ["真实最小", this.MapScaleSafeArea.Min],
            ["真实最大", this.MapScaleSafeArea.Max],
          ));
  }
  SetMapMoveRebound(t, i) {
    (this.DCa.X = t), (this.DCa.Y = i);
  }
  Destroy() {
    this.UCa(), (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
  }
  AddGamepadEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GamepadMoveOverScreen,
      this._Ua,
    );
  }
  RemoveGamepadEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GamepadMoveOverScreen,
      this._Ua,
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
      this.SetScale(this.VCa + i, 1);
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
}
exports.BuildingMapMoveComponent = BuildingMapMoveComponent;
//# sourceMappingURL=BuildingMapMoveComponent.js.map
