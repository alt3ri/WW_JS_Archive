"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapInteractComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const WorldMapUtil_1 = require("../WorldMapUtil");
const WorldMapComponentBase_1 = require("./WorldMapComponentBase");
const MULTI_TOUCH_DELAY_TIME = 0.5;
const SCALE_STEP = 0.05;
class WorldMapInteractComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
  constructor(t, e) {
    super(t),
      (this.T2o = !1),
      (this.L2o = !1),
      (this.D2o = -0),
      (this.R2o = !1),
      (this.U2o = !1),
      (this.A2o = !1),
      (this.P2o = ""),
      (this.x2o = Vector2D_1.Vector2D.Create()),
      (this.w2o = void 0),
      (this.B2o = void 0),
      (this.b2o = -0),
      (this.q2o = void 0),
      (this.G2o = void 0),
      (this.FCo = (t) => {
        (this.T2o = !1),
          t &&
            !this.IsMultiFingerControl &&
            this.N2o(t.pointerPosition) &&
            ((t = this.O2o(t.pointerPosition.X, t.pointerPosition.Y)),
            this.w2o.DeepCopy(t),
            (this.b2o = Time_1.Time.NowSeconds),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapPointerDown,
            ));
      }),
      (this.aWe = (t) => {
        let e;
        !t || this.IsMultiFingerControl || this.q2o.size > 1
          ? ((this.T2o = !1), this.B2o.Reset())
          : ((this.T2o = !0),
            (t = this.O2o(t.pointerPosition.X, t.pointerPosition.Y)),
            ((e = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(
              this.w2o,
            )).X === 0 &&
              e.Y === 0) ||
              (this.B2o.DeepCopy(e),
              this.w2o.DeepCopy(t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapPointerDrag,
                this.B2o,
              )));
      }),
      (this.k2o = (t) => {
        const e = Time_1.Time.NowSeconds;
        this.IsMultiFingerControl || e - this.D2o < MULTI_TOUCH_DELAY_TIME
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Map", 19, "正在进行双指缩放")
          : this.N2o(t.pointerPosition)
            ? this.T2o
              ? ((this.T2o = !1), this.F2o())
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.WorldMapPointerUp,
                  t,
                )
            : (this.T2o = !1);
      }),
      (this.pbt = (t, e) => {
        const i = e.TouchType;
        const s = Number(t);
        switch (i) {
          case 0:
            this.hCt(!0, s, e);
            break;
          case 1:
            this.hCt(!1, s);
        }
      }),
      (this.V2o = (t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapWheelAxisInput,
          t.scrollAxisValue * SCALE_STEP,
          5,
        );
      }),
      (this.H2o = (t) => {
        t
          ? ((this.U2o = !0),
            (this.A2o = !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapJoystickMoveForward,
              -this.G2o.GamePadMoveSpeed * t,
            ))
          : (this.U2o = !1);
      }),
      (this.j2o = (t) => {
        t
          ? ((this.R2o = !0),
            (this.A2o = !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapJoystickMoveRight,
              -this.G2o.GamePadMoveSpeed * t,
            ))
          : (this.R2o = !1);
      }),
      (this.W2o = (t, e) => {
        e === 0
          ? this.P2o === t && (this.P2o = "")
          : ((this.P2o = t),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
              SCALE_STEP * e,
              2,
            ));
      });
    t = t
      .GetRootActor()
      .GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    ObjectUtils_1.ObjectUtils.IsValid(t) &&
      ((this.q2o = new Map()),
      t.OnPointerDownCallBack.Bind(this.FCo),
      t.OnPointerDragCallBack.Bind(this.aWe),
      t.OnPointerUpCallBack.Bind(this.k2o),
      t.OnPointerScrollCallBack.Bind(this.V2o),
      (this.B2o = Vector2D_1.Vector2D.Create()),
      (this.w2o = Vector2D_1.Vector2D.Create()),
      (this.G2o = e));
  }
  get IsJoystickMoving() {
    return this.R2o || this.U2o;
  }
  get IsJoystickFocus() {
    return this.A2o;
  }
  SetJoystickFocus(t) {
    this.A2o = t;
  }
  get IsJoystickZoom() {
    return this.P2o !== "";
  }
  get MultiTouchOriginCenter() {
    return this.x2o;
  }
  get IsDragging() {
    return this.T2o;
  }
  get IsMultiFingerControl() {
    return this.L2o;
  }
  set IsMultiFingerControl(t) {
    t === this.L2o ||
      (!t && this.q2o.size > 0) ||
      ((this.L2o = t), this.L2o) ||
      (this.D2o = Time_1.Time.NowSeconds);
  }
  AddEventListener() {
    InputDistributeController_1.InputDistributeController.BindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.pbt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerMapForward,
        this.H2o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerMapRight,
        this.j2o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerMapZoom,
        this.W2o,
      );
  }
  RemoveEventListener() {
    InputDistributeController_1.InputDistributeController.UnBindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.pbt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerMapForward,
        this.H2o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerMapRight,
        this.j2o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerMapZoom,
        this.W2o,
      );
  }
  OnDestroy() {
    super.OnDestroy(), (this.w2o = void 0), (this.B2o = void 0);
  }
  CheckTouch() {
    var t = this.q2o.get(TouchFingerDefine_1.EFingerIndex.One);
    const e = this.q2o.get(TouchFingerDefine_1.EFingerIndex.Two);
    if (
      ((this.IsMultiFingerControl = void 0 !== t && void 0 !== e),
      this.IsMultiFingerControl)
    ) {
      var { State: t, ChangeRate: i } =
        TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(
          TouchFingerDefine_1.EFingerIndex.One,
          TouchFingerDefine_1.EFingerIndex.Two,
        );
      switch (t) {
        case TouchFingerDefine_1.EFingerExpandCloseType.Expand:
        case TouchFingerDefine_1.EFingerExpandCloseType.Close:
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapFingerExpandClose,
            i,
            4,
          );
      }
    }
  }
  F2o() {
    if (this.B2o.X !== 0 || this.B2o.Y !== 0) {
      var e = Time_1.Time.NowSeconds - this.b2o;
      let t = ((2 * this.B2o.Size()) / (e * e)) * e;
      var e = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
      var e =
        (e.IsNearlyZero() ||
          (t = MathCommon_1.MathCommon.Clamp(t, 0, e.Size())),
        this.B2o.Normalize(0));
      e &&
        ((e = Vector2D_1.Vector2D.Create()),
        this.B2o.Multiply(t, e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapDragInertia,
          e,
        )),
        this.B2o.Reset();
    }
  }
  hCt(t, e, i) {
    t
      ? LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
          e,
        ) && this.q2o.set(e, i)
      : this.q2o.delete(e),
      this.x2o.Reset(),
      this.q2o.forEach((t) => {
        t = Vector2D_1.Vector2D.Create(t.TouchPosition.X, t.TouchPosition.Y);
        this.x2o.AdditionEqual(t);
      }),
      this.q2o.size > 0 && this.x2o.DivisionEqual(this.q2o.size);
  }
  N2o(t) {
    t = this.O2o(t.X, t.Y);
    return !(
      t.X < 0 ||
      t.X > this.ViewportSize.X ||
      t.Y < 0 ||
      t.Y > this.ViewportSize.Y
    );
  }
  O2o(t, e) {
    t = Vector2D_1.Vector2D.Create(t, e);
    return (
      t.FromUeVector2D(
        UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
          t.ToUeVector2D(!0),
        ),
      ),
      (t.X = MathCommon_1.MathCommon.Clamp(t.X, 0, this.ViewportSize.X)),
      (t.Y = MathCommon_1.MathCommon.Clamp(t.Y, 0, this.ViewportSize.Y)),
      t
    );
  }
}
exports.WorldMapInteractComponent = WorldMapInteractComponent;
// # sourceMappingURL=WorldMapInteractComponent.js.map
