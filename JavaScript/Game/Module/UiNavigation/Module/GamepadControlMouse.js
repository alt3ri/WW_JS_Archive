"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadControlMouse = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  UiNavigationGlobalData_1 = require("../New/UiNavigationGlobalData"),
  MOVE_SPEED_INTERVAL = 20,
  TWEEN_TIME = 0.3,
  BASE_FPS = 60;
class GamepadControlMouse {
  constructor(t, i) {
    (this.fIa = void 0),
      (this.pIa = void 0),
      (this.fLt = void 0),
      (this.vIa = void 0),
      (this.MIa = 0),
      (this.SIa = 0),
      (this.EIa = 0),
      (this.yIa = 0),
      (this.IIa = !1),
      (this.u3i = !1),
      (this.TIa = void 0),
      (this.$pt = void 0),
      (this.U9_ = 1),
      (this.LIa = Vector2D_1.Vector2D.Create()),
      (this.TCa = void 0),
      (this.uGo = void 0),
      (this.DIa = Vector2D_1.Vector2D.Create()),
      (this.YFo = (t) => {
        this.DIa.Set(t.X, t.Y);
        t = this.fLt.ConvertPositionFromLGUICanvasToViewport(
          this.DIa.ToUeVector2D(),
        );
        this.Q_t.Set(t.X, t.Y), this.RIa();
      }),
      (this.lqt = () => {
        var t = Info_1.Info.IsInGamepad();
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SetIsOverrideMousePosition(
          t,
        ),
          this.vIa.SetAlpha(t ? 1 : 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiNavigation",
              10,
              "UiNavigation:GamepadControlMouse 输入类型方式变化",
              ["是否开启", t],
              ["当前操作类型", Info_1.Info.InputControllerType],
            );
      }),
      (this.vIa = t),
      this.vIa.SetAlpha(Info_1.Info.IsInGamepad() ? 1 : 0),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      (this.TIa = i),
      (this.pIa =
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)),
      (this.fLt = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler()),
      (this.U9_ = this.fLt.Canvas.GetCanvasScale()),
      (this.MIa = UiLayer_1.UiLayer.UiRootItem.GetWidth() / 2),
      (this.SIa = UiLayer_1.UiLayer.UiRootItem.GetHeight() / 2),
      (this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo));
  }
  get Q_t() {
    var t;
    return (
      this.fIa ||
        ((t = this.pIa.pointerPosition),
        (this.fIa = Vector2D_1.Vector2D.Create(t.X, t.Y))),
      this.fIa
    );
  }
  get AIa() {
    return 0 !== this.EIa || 0 !== this.yIa;
  }
  UIa() {
    var t;
    return this.fLt
      ? ((t = this.fLt.ConvertPositionFromViewportToLGUICanvas(
          this.Q_t.ToUeVector2D(),
        )),
        Vector2D_1.Vector2D.Create(t.X - this.MIa, t.Y - this.SIa))
      : this.Q_t;
  }
  RIa() {
    var t = this.UIa();
    let i = 0,
      e = 0;
    t.X > this.MIa
      ? ((i = t.X - this.MIa), (t.X = this.MIa), (this.Q_t.X -= this.yIa))
      : t.X < -this.MIa &&
        ((i = t.X + this.MIa), (t.X = -this.MIa), (this.Q_t.X -= this.yIa)),
      t.Y > this.SIa
        ? ((e = t.Y - this.SIa), (t.Y = this.SIa), (this.Q_t.Y += this.EIa))
        : t.Y < -this.SIa &&
          ((e = t.Y + this.SIa), (t.Y = -this.SIa), (this.Q_t.Y += this.EIa)),
      this.vIa.SetAnchorOffset(t.ToUeVector2D()),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.OverrideMousePosition(
        this.Q_t.ToUeVector2D(),
      ),
      (0 === i && 0 === e) ||
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GamepadMoveOverScreen,
          i,
          e,
        );
  }
  bKl() {
    var t = this.vIa.GetLGUISpaceAbsolutePosition(),
      t = this.fLt.ConvertPositionFromLGUICanvasToViewport(
        new UE.Vector2D(t.X, t.Y),
      );
    this.pIa.pointerPosition = new UE.Vector(t.X, t.Y, 0);
  }
  D9_(t) {
    this.AIa &&
      ((t = TimeUtil_1.TimeUtil.InverseMillisecond / t),
      (t = BASE_FPS / t),
      (this.EIa *= t),
      (this.yIa *= t),
      ((t = this.pIa?.pointerPosition ?? Vector2D_1.Vector2D.Create()).Y -=
        this.EIa),
      (t.X += this.yIa),
      this.Q_t.Set(t.X, t.Y));
  }
  xIa() {
    this.AIa &&
      (this.xCa(),
      (this.IIa = !1),
      this.RIa(),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SwitchToNavigationInputType());
  }
  xCa() {
    this.TCa && (this.TCa.Kill(), (this.TCa = void 0));
  }
  PIa(t, i) {
    var e = i.RootUIComp.GetLGUISpaceAbsolutePositionByPivot(i.AdsorbedPivot);
    return (
      this.LIa.Set(e.X, e.Y),
      !(
        Math.abs(this.LIa.X - t.X) > i.AdsorbedDistance ||
        Math.abs(this.LIa.Y - t.Y) > i.AdsorbedDistance ||
        Vector2D_1.Vector2D.Distance(this.LIa, t) > i.AdsorbedDistance
      )
    );
  }
  wIa(t) {
    var i = Vector2D_1.Vector2D.Create(t);
    for (const e of this.TIa.GetPanelConfigMap().values())
      for (const s of e.GetPanelHandle().GetListenerSet().values())
        if (
          s.OpenAdsorbed &&
          s.IsCanFocus() &&
          s.IsInLoopScrollDisplayByGridActor() &&
          s.IsInDynScrollDisplay() &&
          this.PIa(i, s)
        )
          return s;
  }
  BIa() {
    var t;
    this.AIa ||
      this.IIa ||
      ((this.IIa = !0),
      (t = this.fLt.ConvertPositionFromViewportToLGUICanvas(
        this.Q_t.ToUeVector2D(),
      )),
      this.wIa(t) &&
        (this.xCa(),
        (this.TCa = UE.LTweenBPLibrary.Vector2To(
          GlobalData_1.GlobalData.World,
          this.uGo,
          t,
          this.LIa.ToUeVector2D(!0),
          TWEEN_TIME,
        ))));
  }
  MoveForwardByGamepad(t) {
    this.EIa = t * MOVE_SPEED_INTERVAL * this.U9_;
  }
  MoveRightByGamepad(t) {
    this.yIa = t * MOVE_SPEED_INTERVAL * this.U9_;
  }
  TriggerByGamepad(t) {
    t
      ? (this.$pt.StopSequenceByKey("Release"),
        this.$pt.PlaySequencePurely("Press"))
      : (this.$pt.StopSequenceByKey("Press"),
        this.$pt.PlaySequencePurely("Release"));
  }
  CanOverridePosition(t) {
    var i = t && Info_1.Info.IsInGamepad();
    LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SetIsOverrideMousePosition(
      i,
    ),
      this.vIa.SetAlpha(i ? 1 : 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiNavigation",
          10,
          "UiNavigation:GamepadControlMouse 手柄控制鼠标功能",
          ["是否开启", i],
          ["当前操作类型", Info_1.Info.InputControllerType],
        ),
      this.u3i !== t &&
        ((this.u3i = t)
          ? (this.bKl(),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.InputControllerChange,
              this.lqt,
            ))
          : EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.InputControllerChange,
              this.lqt,
            ));
  }
  UpdateMousePositionByItem(t) {
    (t = t.GetLGUISpaceAbsolutePosition()),
      (t = this.fLt.ConvertPositionFromLGUICanvasToViewport(
        new UE.Vector2D(t.X, t.Y),
      ));
    this.Q_t.Set(t.X, t.Y),
      this.xCa(),
      this.RIa(),
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor?.SwitchToNavigationInputType();
  }
  Clear() {
    this.CanOverridePosition(!1),
      this.xCa(),
      this.$pt.Clear(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
  }
  Tick(t) {
    !Info_1.Info.IsInGamepad() ||
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation ||
      (this.D9_(t), this.xIa(), this.BIa());
  }
}
exports.GamepadControlMouse = GamepadControlMouse;
//# sourceMappingURL=GamepadControlMouse.js.map
