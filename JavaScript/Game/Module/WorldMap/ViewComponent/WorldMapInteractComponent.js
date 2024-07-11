"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapInteractComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  WorldMapUtil_1 = require("../WorldMapUtil"),
  WorldMapComponentBase_1 = require("./WorldMapComponentBase"),
  MULTI_TOUCH_DELAY_TIME = 0.5,
  SCALE_STEP = 0.05;
class WorldMapInteractComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
  constructor(t, e) {
    super(t),
      (this.SFo = !1),
      (this.yFo = !1),
      (this.IFo = -0),
      (this.TFo = !1),
      (this.LFo = !1),
      (this.DFo = !1),
      (this.RFo = ""),
      (this.UFo = Vector2D_1.Vector2D.Create()),
      (this.AFo = void 0),
      (this.PFo = void 0),
      (this.xFo = -0),
      (this.wFo = void 0),
      (this.BFo = void 0),
      (this.Ngo = (t) => {
        (this.SFo = !1),
          t &&
            !this.IsMultiFingerControl &&
            this.bFo(t.pointerPosition) &&
            ((t = this.qFo(t.pointerPosition.X, t.pointerPosition.Y)),
            this.AFo.DeepCopy(t),
            (this.xFo = Time_1.Time.NowSeconds),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapPointerDown,
            ));
      }),
      (this.vKe = (t) => {
        var e;
        !t || this.IsMultiFingerControl || 1 < this.wFo.size
          ? ((this.SFo = !1), this.PFo.Reset())
          : ((this.SFo = !0),
            (t = this.qFo(t.pointerPosition.X, t.pointerPosition.Y)),
            (0 ===
              (e = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(
                this.AFo,
              )).X &&
              0 === e.Y) ||
              (this.PFo.DeepCopy(e),
              this.AFo.DeepCopy(t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapPointerDrag,
                this.PFo,
              )));
      }),
      (this.GFo = (t) => {
        var e = Time_1.Time.NowSeconds;
        this.IsMultiFingerControl || e - this.IFo < MULTI_TOUCH_DELAY_TIME
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Map", 19, "正在进行双指缩放")
          : this.bFo(t.pointerPosition)
            ? this.SFo
              ? ((this.SFo = !1), this.NFo())
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.WorldMapPointerUp,
                  t,
                )
            : (this.SFo = !1);
      }),
      (this.Eqt = (t, e) => {
        var i = e.TouchType,
          s = Number(t);
        switch (i) {
          case 0:
            this.Mgt(!0, s, e);
            break;
          case 1:
            this.Mgt(!1, s);
        }
      }),
      (this.OFo = (t) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapWheelAxisInput,
          t.scrollAxisValue * SCALE_STEP,
          5,
        );
      }),
      (this.kFo = (t) => {
        t
          ? ((this.LFo = !0),
            (this.DFo = !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapJoystickMoveForward,
              -this.BFo.GamePadMoveSpeed * t,
            ))
          : (this.LFo = !1);
      }),
      (this.FFo = (t) => {
        t
          ? ((this.TFo = !0),
            (this.DFo = !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapJoystickMoveRight,
              -this.BFo.GamePadMoveSpeed * t,
            ))
          : (this.TFo = !1);
      }),
      (this.VFo = (t, e) => {
        0 === e
          ? this.RFo === t && (this.RFo = "")
          : ((this.RFo = t),
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
      ((this.wFo = new Map()),
      t.OnPointerDownCallBack.Bind(this.Ngo),
      t.OnPointerDragCallBack.Bind(this.vKe),
      t.OnPointerUpCallBack.Bind(this.GFo),
      t.OnPointerScrollCallBack.Bind(this.OFo),
      (this.PFo = Vector2D_1.Vector2D.Create()),
      (this.AFo = Vector2D_1.Vector2D.Create()),
      (this.BFo = e));
  }
  get IsJoystickMoving() {
    return this.TFo || this.LFo;
  }
  get IsJoystickFocus() {
    return this.DFo;
  }
  SetJoystickFocus(t) {
    this.DFo = t;
  }
  get IsJoystickZoom() {
    return "" !== this.RFo;
  }
  get MultiTouchOriginCenter() {
    return this.UFo;
  }
  get IsDragging() {
    return this.SFo;
  }
  get IsMultiFingerControl() {
    return this.yFo;
  }
  set IsMultiFingerControl(t) {
    t === this.yFo ||
      (!t && 0 < this.wFo.size) ||
      ((this.yFo = t), this.yFo) ||
      (this.IFo = Time_1.Time.NowSeconds);
  }
  AddEventListener() {
    InputDistributeController_1.InputDistributeController.BindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.Eqt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerMapForward,
        this.kFo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerMapRight,
        this.FFo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerMapZoom,
        this.VFo,
      );
  }
  RemoveEventListener() {
    InputDistributeController_1.InputDistributeController.UnBindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.Eqt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerMapForward,
        this.kFo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerMapRight,
        this.FFo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerMapZoom,
        this.VFo,
      );
  }
  OnDestroy() {
    super.OnDestroy(), (this.AFo = void 0), (this.PFo = void 0);
  }
  CheckTouch() {
    var t = this.wFo.get(TouchFingerDefine_1.EFingerIndex.One),
      e = this.wFo.get(TouchFingerDefine_1.EFingerIndex.Two);
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
  NFo() {
    if (0 !== this.PFo.X || 0 !== this.PFo.Y) {
      var e = Time_1.Time.NowSeconds - this.xFo;
      let t = ((2 * this.PFo.Size()) / (e * e)) * e;
      var e = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool(),
        e =
          (e.IsNearlyZero() ||
            (t = MathCommon_1.MathCommon.Clamp(t, 0, e.Size())),
          this.PFo.Normalize(0));
      e &&
        ((e = Vector2D_1.Vector2D.Create()),
        this.PFo.Multiply(t, e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapDragInertia,
          e,
        )),
        this.PFo.Reset();
    }
  }
  Mgt(t, e, i) {
    t
      ? LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
          e,
        ) && this.wFo.set(e, i)
      : this.wFo.delete(e),
      this.UFo.Reset(),
      this.wFo.forEach((t) => {
        t = Vector2D_1.Vector2D.Create(t.TouchPosition.X, t.TouchPosition.Y);
        this.UFo.AdditionEqual(t);
      }),
      0 < this.wFo.size && this.UFo.DivisionEqual(this.wFo.size);
  }
  bFo(t) {
    t = this.qFo(t.X, t.Y);
    return !(
      t.X < 0 ||
      t.X > this.ViewportSize.X ||
      t.Y < 0 ||
      t.Y > this.ViewportSize.Y
    );
  }
  qFo(t, e) {
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
//# sourceMappingURL=WorldMapInteractComponent.js.map
