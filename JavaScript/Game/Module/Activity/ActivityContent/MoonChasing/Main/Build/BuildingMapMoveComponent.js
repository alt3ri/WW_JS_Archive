"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingMapMoveComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
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
  constructor(t) {
    (this.xFo = 0),
      (this.IsDragging = !1),
      (this.IsTweening = !1),
      (this.yca = void 0),
      (this.uGo = void 0),
      (this.Ica = Vector2D_1.Vector2D.Create()),
      (this.Tca = Vector2D_1.Vector2D.Create()),
      (this.ScaleStep = 0.05),
      (this.MapScaleSafeArea = { Min: 0, Max: 0 }),
      (this.Fca = 1),
      (this.PYe = Vector2D_1.Vector2D.Create()),
      (this.Lca = Vector2D_1.Vector2D.Create()),
      (this.Dca = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.Aca = { MinX: 0, MaxX: 0, MinY: 0, MaxY: 0 }),
      (this.Ajs = Vector2D_1.Vector2D.Create()),
      (this.w9s = 1),
      (this.Ujs = void 0),
      (this.Q_t = Vector2D_1.Vector2D.Create()),
      (this.cz = Vector_1.Vector.Create()),
      (this.Vca = 1),
      (this.Rjs = void 0),
      (this.w8i = (t) => {
        this.IsInMultiTouch ||
          (this.Rca(),
          (t = t.pointerPosition),
          (t = this.Uca(t.X, t.Y)),
          this.Ica.DeepCopy(t));
      }),
      (this.B8i = (t) => {
        var i, s, e;
        this.IsInMultiTouch
          ? ((this.IsDragging = !1), this.Tca.Reset())
          : ((this.IsDragging = !0),
            (t = t.pointerPosition),
            (t = this.Uca(t.X, t.Y)),
            (0 ===
              (i = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(
                this.Ica,
              )).X &&
              0 === i.Y) ||
              ((s = t.X - this.Ica.X),
              (e = t.Y - this.Ica.Y),
              this.Tca.DeepCopy(i),
              this.Ica.DeepCopy(t),
              this.Q_t.FromUeVector2D(this.Ujs.GetAnchorOffset()),
              (this.Q_t.X = this.Q_t.X + s),
              (this.Q_t.Y = this.Q_t.Y + e),
              this.xca(this.Q_t, 1)));
      }),
      (this.Ngo = (t) => {
        t &&
          !this.IsInMultiTouch &&
          this.bFo(t.pointerPosition) &&
          ((this.IsDragging = !0), (this.xFo = Time_1.Time.NowSeconds));
      }),
      (this.GFo = (t) => {
        this.IsInMultiTouch ||
          ((this.IsDragging = !1), 0 === this.Tca.X && 0 === this.Tca.Y) ||
          (this.bFo(t.pointerPosition) && this.Pca());
      }),
      (this.jDn = (t) => {
        var t = t.scrollAxisValue;
        0 !== t &&
          (this.Ajs.Reset(),
          this.Ajs.AdditionEqual(this.xjs()),
          (t = t * this.ScaleStep),
          this.Gd(this.Fca + t, 0));
      }),
      (this.YFo = (t) => {
        this.Ujs.SetAnchorOffset(t);
      }),
      (this.TIa = (t, i) => {
        this.Q_t.FromUeVector2D(this.Ujs.GetAnchorOffset()),
          (this.Q_t.X = this.Q_t.X - t),
          (this.Q_t.Y = this.Q_t.Y - i),
          this.xca(this.Q_t, 1);
      }),
      (this.Pjs = Vector2D_1.Vector2D.Create()),
      (this.wFo = new Map()),
      (this.Eqt = (t, i) => {
        var s = i.TouchType;
        2 === s ? this.Bjs() : 0 === s ? this.Mgt(!0, i) : this.Mgt(!1, i);
      }),
      (this.Ujs = t.GetRootComponent()),
      t.OnPointerBeginDragCallBack.Bind(this.w8i),
      t.OnPointerDragCallBack.Bind(this.B8i),
      t.OnPointerDownCallBack.Bind(this.Ngo),
      t.OnPointerCancelCallBack.Bind(this.GFo),
      t.OnPointerUpCallBack.Bind(this.GFo),
      t.OnPointerScrollCallBack.Bind(this.jDn),
      this.Fq();
  }
  get MapScale() {
    return this.Fca;
  }
  set MapScale(t) {
    this.Fca = t;
  }
  Fq() {
    this.wca(), this.oRn(), this.nRn(), this.b9s(), this.Bca(), this.rRn();
  }
  wca() {
    this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
  }
  oRn() {
    (this.PYe.X = UiLayer_1.UiLayer.UiRootItem.GetWidth()),
      (this.PYe.Y = UiLayer_1.UiLayer.UiRootItem.GetHeight());
    var t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler(),
      i = t.ReferenceResolution.X / t.ReferenceResolution.Y,
      s = this.PYe.X / this.PYe.Y,
      e = s / i;
    (this.Vca = 1 < e ? e : i / s),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MoonChasing",
          11,
          "[MapMoveComponent]初始化Viewport",
          ["Viewport大小", this.PYe.Tuple],
          ["ReferenceResolution大小", t.ReferenceResolution],
          ["Viewport与ReferenceResolution比值", e],
          ["实际应用的比值", this.Vca],
        );
  }
  Bca() {
    var t = this.Ujs.GetWidth() * this.Fca,
      i = this.Ujs.GetHeight() * this.Fca,
      t = t < this.PYe.X ? this.PYe.X : t,
      i = i < this.PYe.Y ? this.PYe.Y : i,
      t = Math.abs(t - this.PYe.X) / 2,
      i = Math.abs(i - this.PYe.Y) / 2;
    (this.Aca.MinX = -t),
      (this.Aca.MaxX = t),
      (this.Aca.MinY = -i),
      (this.Aca.MaxY = i);
  }
  rRn() {
    var t = (this.Ujs.GetWidth() - 2 * this.Lca.X) * this.Fca,
      i = (this.Ujs.GetHeight() - 2 * this.Lca.Y) * this.Fca,
      t = t < this.PYe.X ? this.PYe.X : t,
      i = i < this.PYe.Y ? this.PYe.Y : i,
      t = Math.abs(t - this.PYe.X) / 2,
      i = Math.abs(i - this.PYe.Y) / 2;
    (this.Dca.MinX = -t),
      (this.Dca.MaxX = t),
      (this.Dca.MinY = -i),
      (this.Dca.MaxY = i);
  }
  nRn() {
    this.SetScaleSafeArea(0.5, 2), (this.Lca.X = 400), (this.Lca.Y = 300);
  }
  b9s() {
    this.w9s = CommonParamById_1.configCommonParamById.GetFloatConfig(
      "MoonFiestaMapSizeParam",
    );
  }
  sRn(t) {
    (t.X = MathUtils_1.MathUtils.Clamp(t.X, this.Dca.MinX, this.Dca.MaxX)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.Dca.MinY, this.Dca.MaxY));
  }
  bca(t) {
    (t.X = MathUtils_1.MathUtils.Clamp(t.X, this.Aca.MinX, this.Aca.MaxX)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.Aca.MinY, this.Aca.MaxY));
  }
  Gd(t, i) {
    var s,
      t = MathUtils_1.MathUtils.Clamp(
        t,
        this.MapScaleSafeArea.Min,
        this.MapScaleSafeArea.Max,
      );
    t !== this.Fca &&
      (this.Rca(),
      (s = this.Fca),
      (this.Fca = t),
      this.Bca(),
      this.rRn(),
      this.cz.Set(t, t, t),
      this.Ujs.SetUIRelativeScale3D(this.cz.ToUeVector()),
      (t = this.wjs(t, s, i)),
      this.Q_t.Reset(),
      this.Q_t.AdditionEqual(t),
      this.xca(this.Q_t),
      this.Rjs?.(i));
  }
  wjs(t, i, s) {
    var e = Vector2D_1.Vector2D.Create(this.Ujs.GetAnchorOffset());
    return 0 === s || 1 === s
      ? ((s = this.Uca(this.Ajs.X, this.Ajs.Y)).Set(
          s.X - this.PYe.X / 2,
          s.Y - this.PYe.Y / 2,
        ),
        e
          .SubtractionEqual(s)
          .MultiplyEqual(t / i)
          .AdditionEqual(s))
      : e.MultiplyEqual(t / i);
  }
  Uca(t, i) {
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
    t = this.Uca(t.X, t.Y);
    return !(t.X < 0 || t.X > this.PYe.X || t.Y < 0 || t.Y > this.PYe.Y);
  }
  Pca() {
    var t,
      i = Time_1.Time.NowSeconds - this.xFo;
    let s = this.Tca.Size() / i;
    this.PYe.IsNearlyZero() ||
      (s = MathCommon_1.MathCommon.Clamp(s, 0, this.PYe.Size())),
      this.Tca.Normalize(0)
        ? ((i = Vector2D_1.Vector2D.Create()),
          this.Tca.Multiply(s, i),
          (t = Vector2D_1.Vector2D.Create()),
          i.Multiply(TWEEN_TIME, t),
          (i = Vector2D_1.Vector2D.Create(
            this.Ujs.GetAnchorOffset(),
          ).AdditionEqual(t)),
          this.qca(i, 2, DRAG_TWEEN_TIME))
        : this.Tca.Reset();
  }
  Rca() {
    this.yca && (this.yca.Kill(), (this.yca = void 0));
  }
  qca(t, i = 0, s = TWEEN_TIME) {
    this.sRn(t),
      (this.IsTweening = !0),
      this.Rca(),
      (this.yca = UE.LTweenBPLibrary.Vector2To(
        GlobalData_1.GlobalData.World,
        this.uGo,
        this.Ujs.GetAnchorOffset(),
        t.ToUeVector2D(!0),
        s,
        0,
        i,
      )),
      this.yca.OnCompleteCallBack.Bind(() => {
        this.IsTweening = !1;
      });
  }
  xca(t, i = 0) {
    0 === i ? this.sRn(t) : 1 === i && this.bca(t),
      this.Ujs.SetAnchorOffset(t.ToUeVector2D());
  }
  xjs() {
    var t = Global_1.Global.CharacterController;
    return t
      ? (this.Q_t.Reset(), this.Q_t.AdditionEqual(t.GetCursorPosition()))
      : (this.Q_t.Reset(), this.Q_t);
  }
  LongPressScroll(t) {
    this.Ajs.Reset(), this.Gd(this.Fca + t, 2);
  }
  SliderScroll(t) {
    this.Gd(t, 3);
  }
  SetScaleAdaptHeight() {
    var t = (this.PYe.Y / this.Ujs.GetHeight()) * this.w9s;
    this.Gd(t, 4);
  }
  SetChangeScaleCallback(t) {
    this.Rjs = t;
  }
  SetScaleSafeArea(t, i) {
    i < t
      ? ((this.MapScaleSafeArea.Min = i * this.Vca),
        (this.MapScaleSafeArea.Max = t * this.Vca),
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
      : ((this.MapScaleSafeArea.Min = t * this.Vca),
        (this.MapScaleSafeArea.Max = i * this.Vca),
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
    (this.Lca.X = t), (this.Lca.Y = i);
  }
  Destroy() {
    this.Rca(), (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
  }
  AddGamepadEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GamepadMoveOverScreen,
      this.TIa,
    );
  }
  RemoveGamepadEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GamepadMoveOverScreen,
      this.TIa,
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
      this.Ajs.Reset(),
      this.wFo.forEach((t) => {
        this.Pjs.Set(t.TouchPosition.X, t.TouchPosition.Y),
          this.Ajs.AdditionEqual(this.Pjs);
      }),
      0 < this.wFo.size && this.Ajs.DivisionEqual(this.wFo.size);
  }
  Bjs() {
    var t, i;
    this.IsInMultiTouch &&
      (({ State: t, ChangeRate: i } =
        TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(
          TouchFingerDefine_1.EFingerIndex.One,
          TouchFingerDefine_1.EFingerIndex.Two,
        )),
      t !== TouchFingerDefine_1.EFingerExpandCloseType.None) &&
      this.Gd(this.Fca + i, 1);
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
    InputDistributeController_1.InputDistributeController.BindTouches(
      [
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      ],
      this.Eqt,
    );
  }
  GetMapItem() {
    return this.Ujs;
  }
}
exports.BuildingMapMoveComponent = BuildingMapMoveComponent;
//# sourceMappingURL=BuildingMapMoveComponent.js.map
